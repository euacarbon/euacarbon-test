import {Flags} from '@oclif/core'
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
      quantity: Flags.integer({char: 'q', name: 'quantity', description: 'Amount to issue', required: true, default: 888}),
      tokenSupply: Flags.integer({char: 's', name: 'token_supply', description: 'The total initial token supply', required: true, default: 8888}),
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

    // Set issuer account
    const accountSetTxOutput = await api.submitAndWait({
      TransactionType: 'AccountSet',
      Account: issuerWallet.address,
      Domain: domain,
      SetFlag: AccountSetAsfFlags.asfDefaultRipple,
      Flags: (AccountSetTfFlags.tfDisallowXRP | AccountSetTfFlags.tfRequireDestTag),
    }, {wallet: issuerWallet, autofill: true})
    console.log('Issuer set transaction submitted. Transaction output:', accountSetTxOutput)

    // Set hot wallet
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
    console.log('Hot set transaction submitted. Transaction output:', hotSetTxOutput)

    // Create the trustline
    const trustlineTxOutput = await api.submitAndWait({
      TransactionType: 'TrustSet',
      Account: hotWallet.address,
      LimitAmount: {
        currency: tokenSymbol,
        issuer: issuerWallet.address,
        value: tokenSupply.toString(),
      },
    }, {wallet: hotWallet, autofill: true})
    console.log('Trustline transaction submitted. Transaction output:', trustlineTxOutput)

    // Send token
    const issuranceTxOutput = await api.submitAndWait({
      TransactionType: 'Payment',
      Account: issuerWallet.address,
      Amount: {
        currency: tokenSymbol,
        value: flags.quantity,
        issuer: issuerWallet.address,
      },
      Destination: hotWallet.address,
      DestinationTag: 1, // Needed since we enabled Require Destination Tags on the hot account earlier.
    }, {wallet: issuerWallet, autofill: true})
    console.log('Issuance transaction submitted. Transaction output:', issuranceTxOutput)

    await api.disconnect()
  }
}
