// This file contains only the basic configuration you need to run Embark's node
// For additional configurations, see: https://framework.embarklabs.io/docs/blockchain_configuration.html
require('dotenv').config({})
module.exports = {
  // default applies to all environments
  default: {
    enabled: true,
    client: "geth" // Can be ganache-cli, geth or parity (default: geth)
  },

  development: {
    client: 'ganache-cli',
    clientConfig: {
      miningMode: 'dev' // Mode in which the node mines. Options: dev, auto, always, off
    }
  },

  privatenet_eth: {
    // Accounts to use as node accounts
    // The order here corresponds to the order of `web3.eth.getAccounts`, so the first one is the `defaultAccount`
    // For more account configurations, see: https://framework.embarklabs.io/docs/blockchain_accounts_configuration.html
    endpoint: "http://0.0.0.0:8546",
    accounts: [
      {
        privateKey: process.env.SIGNER_1
      },
      {
        privateKey: process.env.SIGNER_2
      }
    ],
  },
  oasis_testnet: {
    // Accounts to use as node accounts
    // The order here corresponds to the order of `web3.eth.getAccounts`, so the first one is the `defaultAccount`
    // For more account configurations, see: https://framework.embarklabs.io/docs/blockchain_accounts_configuration.html
    endpoint: process.env.OASIS_TESTNET_RPC,
    accounts: [
      {
        privateKey: process.env.SIGNER_1
      },
      {
        privateKey: process.env.SIGNER_2
      }
    ],
  },
  privateparitynet: {
    client: "parity",
    genesisBlock: "config/privatenet/genesis-parity.json",
    datadir: ".embark/privatenet/datadir",
    miningMode: 'off'
  },

  oasis_dev: {
    endpoint: "http://0.0.0.0:8546",
    accounts: [
      {
        nodeAccounts: true,
      }
    ]
  },

  testnet: {
    networkType: "testnet", // Can be: testnet(ropsten), rinkeby, livenet or custom, in which case, it will use the specified networkId
    syncMode: "light",
    accounts: [
      {
        nodeAccounts: true,
        password: "config/testnet/password"
      }
    ]
  },

  livenet: {
    networkType: "livenet",
    syncMode: "light",
    accounts: [
      {
        nodeAccounts: true,
        password: "config/livenet/password"
      }
    ]
  }

  // you can name an environment with specific settings and then specify with
  // "embark run custom_name" or "embark blockchain custom_name"
  //custom_name: {
  //}
};
