import {Args, ux} from '@oclif/core'
import {Client, Wallet} from 'xrpl'
import 'dotenv/config'
import AbstractXrplCommand from '../abstract-xrpl-command'

export default class SendToken extends AbstractXrplCommand {
  static description = 'Send some tokens from the hot wallet.'

  static examples = [
    '$ euacarbon send-to rsRbBw48v8JRoaDkLkm6VdDAG42eiLjebL',
  ]

  static args = {
    toAddress: Args.string({description: 'XRPL address to send to', required: true}),
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  constructor(argv: string[], config: any) {
    super(argv, config)
    SendToken.flags = {
      ...AbstractXrplCommand.sharedFlags,
    }
  }

  async run(): Promise<void> {
    const {flags, args} = await this.parse(SendToken)

    const quantityText = flags.quantity.toString()

    const api = new Client(flags.xrplNetwork)
    await api.connect()

    const wallet = Wallet.fromSeed(flags.hotWallet)

    ux.action.start(`Sending ${quantityText} tokens`)
    const issuranceTxOutput = await api.submitAndWait({
      TransactionType: 'Payment',
      Account: wallet.address,
      Amount: {
        currency: flags.tokenSymbol,
        value: quantityText,
        issuer: flags.issuerAddress,
      },
      Destination: args.toAddress,
      DestinationTag: 1, // Needed since we enabled Require Destination Tags on the hot account earlier.
    }, {wallet, autofill: true})

    if (issuranceTxOutput.result.validated) {
      ux.action.stop()
      console.log(`Transaction succeeded: https://testnet.xrpl.org/transactions/${issuranceTxOutput.result.hash}`)
    } else {
      throw new Error(`Error sending transaction!: ${JSON.stringify(issuranceTxOutput)}`)
    }

    await api.disconnect()
  }
}
