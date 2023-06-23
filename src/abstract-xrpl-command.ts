import {Command, Flags} from '@oclif/core'
import 'dotenv/config'

export default abstract class AbstractXrplCommand extends Command {
  static sharedFlags = {
    xrplNetwork: Flags.string({name: 'network_url', description: 'Gateway to the XRPL network', required: true, default: 'wss://testnet.xrpl-labs.com/'}),
    hotWallet: Flags.string({name: 'hot_wallet', env: 'HOT_WALLET', description: 'Secret for the hot wallet.', required: true}),
    tokenSymbol: Flags.string({char: 't', name: 'token_symbol', description: 'The token symbol', required: true, default: 'E2C'}),
    issuerAddress: Flags.string({name: 'issuer_address', env: 'ISSUER_ADDRESS', default: 'rhQDfVcAj1RfNo9qRVXpsyeQmqgYGAWUMX'}),
  }
}
