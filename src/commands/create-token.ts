import {Flags, ux} from '@oclif/core'
import {Client, Wallet, AccountSetAsfFlags, AccountSetTfFlags} from 'xrpl'
import 'dotenv/config'
import AbstractXrplCommand from '../abstract-xrpl-command'

export default class CreateToken extends AbstractXrplCommand {
  static description = 'Create the token.'

  static examples = [
    '$ euacarbon create-token',
  ]

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  constructor(argv: string[], config: any) {
    super(argv, config)
    CreateToken.flags = {
      ...AbstractXrplCommand.sharedFlags,
      tokenSupply: Flags.integer({char: 's', name: 'token_supply', description: 'The total initial token supply', required: true, default: 9999}),
      issuerDomain: Flags.string({char: 'd', name: 'issuer_domain', description: 'The token issuer domain', env: 'TOKEN_DOMAIN', required: true, default: '657561636172626F6E746F6B656E2E62697A' /* euacarbontoken.biz */}),
      issuerWallet: Flags.string({name: 'issuer_wallet', env: 'ISSUER_WALLET', description: 'Secret for the issuer wallet.', required: true}),
    }
  }

  async run(): Promise<void> {
    const {flags} = await this.parse(CreateToken)

    const api = new Client(flags.xrplNetwork)
    await api.connect()

    const issuerWallet = Wallet.fromSeed(flags.issuerWallet)
    const hotWallet = Wallet.fromSeed(flags.hotWallet)

    // Define the token metadata
    const tokenSymbol = flags.tokenSymbol
    const tokenSupply = flags.tokenSupply
    const domain = flags.issuerDomain

    ux.action.start('Setting up issuer account with domain and flags.')
    const accountSetTxOutput = await api.submitAndWait({
      TransactionType: 'AccountSet',
      Account: issuerWallet.address,
      Domain: domain,
      SetFlag: AccountSetAsfFlags.asfDefaultRipple,
      Flags: (AccountSetTfFlags.tfDisallowXRP | AccountSetTfFlags.tfRequireDestTag),
    }, {wallet: issuerWallet, autofill: true})
    if (accountSetTxOutput.result.validated) {
      ux.action.stop()
      console.log(`Issuer set transaction submitted: https://testnet.xrpl.org/transactions/${accountSetTxOutput.result.hash}`)
    } else {
      throw new Error(`Error sending transaction!: ${JSON.stringify(accountSetTxOutput)}`)
    }

    ux.action.start('Setting up hot wallet account with domain and flags.')
    const hotSetTxOutput = await api.submitAndWait({
      TransactionType: 'AccountSet',
      Account: hotWallet.address,
      Domain: domain,
      // enable Require Auth so we can't use trust lines that users
      // make to the hot address, even by accident:
      SetFlag: AccountSetAsfFlags.asfRequireAuth,
      Flags: (AccountSetTfFlags.tfDisallowXRP |
              AccountSetTfFlags.tfRequireDestTag),
    }, {wallet: hotWallet, autofill: true})
    if (hotSetTxOutput.result.validated) {
      ux.action.stop()
      console.log(`Hot wallet set-up transaction submitted: https://testnet.xrpl.org/transactions/${hotSetTxOutput.result.hash}`)
    } else {
      throw new Error(`Error sending transaction: ${JSON.stringify(hotSetTxOutput)}`)
    }

    ux.action.start('Creating the trustline.')
    const trustlineTxOutput = await api.submitAndWait({
      TransactionType: 'TrustSet',
      Account: hotWallet.address,
      LimitAmount: {
        currency: tokenSymbol,
        issuer: issuerWallet.address,
        value: tokenSupply.toString(),
      },
    }, {wallet: hotWallet, autofill: true})
    if (trustlineTxOutput.result.validated) {
      ux.action.stop()
      console.log(`Trustline set-up transaction submitted: https://testnet.xrpl.org/transactions/${trustlineTxOutput.result.hash}`)
    } else {
      throw new Error(`Error sending transaction: ${JSON.stringify(trustlineTxOutput)}`)
    }

    ux.action.start('Sending a few tokens.')
    const issuranceTxOutput = await api.submitAndWait({
      TransactionType: 'Payment',
      Account: issuerWallet.address,
      Amount: {
        currency: tokenSymbol,
        value: flags.quantity.toString(),
        issuer: issuerWallet.address,
      },
      Destination: hotWallet.address,
      DestinationTag: 1, // Needed since we enabled Require Destination Tags on the hot account earlier.
    }, {wallet: issuerWallet, autofill: true})
    if (issuranceTxOutput.result.validated) {
      ux.action.stop()
      console.log(`Tokens sent: https://testnet.xrpl.org/transactions/${issuranceTxOutput.result.hash}`)
    } else {
      throw new Error(`Error sending transaction!: ${JSON.stringify(issuranceTxOutput)}`)
    }

    await api.disconnect()
  }
}
