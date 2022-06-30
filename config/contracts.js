const bigNumber = require("bignumber.js");
module.exports = {
  // default applies to all environments
  default: {
    library: "embarkjs", // can be also be 'web3'

    // order of connections the dapp should connect to
    dappConnection: [
      "$EMBARK",
      "$WEB3", // uses pre existing web3 object if available (e.g in Mist)
      "ws://localhost:8546",
      "http://localhost:8546",
    ],
    dappAutoEnable: true,
    warnIfMetamask: true,
    // Automatically call `ethereum.enable` if true.
    // If false, the following code must run before sending any transaction: `await EmbarkJS.enableEthereum();`
    // Default value is true.
    // dappAutoEnable: true,

    gas: "auto",

    // Strategy for the deployment of the contracts:
    // - implicit will try to deploy all the contracts located inside the contracts directory
    //            or the directory configured for the location of the contracts. This is default one
    //            when not specified
    // - explicit will only attempt to deploy the contracts that are explicitly specified inside the
    //            contracts section.
    // strategy: 'implicit',

    // minimalContractSize, when set to true, tells Embark to generate contract files without the heavy bytecodes
    // Using filteredFields lets you customize which field you want to filter out of the contract file (requires minimalContractSize: true)
    // minimalContractSize: false,
    // filteredFields: [],

    deploy: {
      ERC20: {
        args: [],
      },
      ERC201:{
        instanceOf: 'ERC20',
      },
      CTokenManager: {
        args: [],
      },
      Sablier: {
        deps: ["ERC20"],
        args: ["$CTokenManager"],
      },
      BlockDotDifficulty: {
        args: [],
      },
      BlockDotDifficultyTournamentManager: {
        args: [],
      },
    },
    afterDeploy: async ({ contracts, web3, logger }) => {
      var accounts = await Promise.resolve(web3.eth.getAccounts());
      await contracts.ERC20.methods
        .initialize(
          "Block.Difficulty",
          "B.D",
          18,
          new bigNumber(1111119999990000000000)
            .multipliedBy(10)
            .pow(18)
            .toFixed()
        )
        .send();
        await contracts.ERC201.methods
        .initialize(
          "Block.Difficulty2",
          "B.D2",
          18,
          new bigNumber(1111119999990000000000)
            .multipliedBy(10)
            .pow(18)
            .toFixed()
        )
        .send();
      await contracts.ERC20.methods
        .approve(
          contracts.Sablier.options.address,
          new bigNumber(9999990000000000)
            .multipliedBy(10)
            .pow(18)
            .toFixed()
        )
        .send({});
      await contracts.BlockDotDifficulty.methods
        .init("Block.Difficulty", "B.D", web3.eth.defaultAccount)
        .send();
      await contracts.BlockDotDifficultyTournamentManager.methods.init().send({});
      /* for (var i = 0; i < 5; i++) {
        var endDate = new bigNumber(
          new Date(new Date().setDate(new Date().getFullYear() + 10)).getTime()
        ).toFixed(); //10 years from now
        endDate = Math.round(endDate / 1000);
        console.log("endDate: ", endDate);
        var nftType = Math.round(Math.random * 2) + 1;
        const assetMetaData = JSON.stringify({
          name: "TimeNFT",
          type: "NFT2",
          avatarURL: "https://source.unsplash.com/random",
          value: Math.random() * 9000,
          endDate: endDate,
        });
        await contracts.BlockDotDifficulty.methods
          .createNewNFT(assetMetaData)
          .send();
      }
      for (var i = 0; i < 5; i++) {
        const assetMetaData = JSON.stringify({
          name: "NFT",
          type: "NFT1",
          avatarURL: "https://source.unsplash.com/random",
          value: Math.random() * 4500,
        });
        await contracts.BlockDotDifficulty.methods
          .createNewNFT(assetMetaData)
          .send();
      }*/
      console.log("web3.eth.defaultAccount: ", web3.eth.defaultAccount);
      console.log("init Assets...");
      console.log("approved token...");
      console.log("init CollectorDistrubutor...");
      console.log("init BlockDotDifficultyTournamentManager...");
      
    },
  },

  // default environment, merges with the settings in default
  // assumed to be the intended environment by `embark run`
  oasis_dev: {  deploy: {
    ERC20: {
      args: [],
    },
    ERC201:{
      instanceOf: 'ERC20',
    },
    CTokenManager: {
      args: [],
    },
    Sablier: {
      deps: ["ERC20"],
      args: ["$CTokenManager"],
    },
    BlockDotDifficulty: {
      args: [],
    },
    BlockDotDifficultyTournamentManager: {
      args: [],
    },
  },
  afterDeploy: async ({ contracts, web3, logger }) => {
    var accounts = await Promise.resolve(web3.eth.getAccounts());
    await contracts.ERC20.methods
      .initialize(
        "Block.Difficulty",
        "B.D",
        18,
        new bigNumber(1111119999990000000000)
          .multipliedBy(10)
          .pow(18)
          .toFixed()
      )
      .send();
      await contracts.ERC201.methods
      .initialize(
        "Block.Difficulty2",
        "B.D2",
        18,
        new bigNumber(1111119999990000000000)
          .multipliedBy(10)
          .pow(18)
          .toFixed()
      )
      .send();
    await contracts.ERC20.methods
      .approve(
        contracts.Sablier.options.address,
        new bigNumber(9999990000000000)
          .multipliedBy(10)
          .pow(18)
          .toFixed()
      )
      .send({});
    await contracts.BlockDotDifficulty.methods
      .init("Block.Difficulty", "B.D", web3.eth.defaultAccount)
      .send();
    await contracts.BlockDotDifficultyTournamentManager.methods.init().send({});
    /* for (var i = 0; i < 5; i++) {
      var endDate = new bigNumber(
        new Date(new Date().setDate(new Date().getFullYear() + 10)).getTime()
      ).toFixed(); //10 years from now
      endDate = Math.round(endDate / 1000);
      console.log("endDate: ", endDate);
      var nftType = Math.round(Math.random * 2) + 1;
      const assetMetaData = JSON.stringify({
        name: "TimeNFT",
        type: "NFT2",
        avatarURL: "https://source.unsplash.com/random",
        value: Math.random() * 9000,
        endDate: endDate,
      });
      await contracts.BlockDotDifficulty.methods
        .createNewNFT(assetMetaData)
        .send();
    }
    for (var i = 0; i < 5; i++) {
      const assetMetaData = JSON.stringify({
        name: "NFT",
        type: "NFT1",
        avatarURL: "https://source.unsplash.com/random",
        value: Math.random() * 4500,
      });
      await contracts.BlockDotDifficulty.methods
        .createNewNFT(assetMetaData)
        .send();
    }*/
    console.log("web3.eth.defaultAccount: ", web3.eth.defaultAccount);
    console.log("init Assets...");
    console.log("approved token...");
    console.log("init CollectorDistrubutor...");
    console.log("init BlockDotDifficultyTournamentManager...");
    
  }},

  // merges with the settings in default
  // used with "embark run privatenet"
  privatenet: {},

  // you can name an environment with specific settings and then specify with
  // "embark run custom_name" or "embark blockchain custom_name"
  // custom_name: {}
};
