/*global artifacts, contract, it*/
/**/
var SkynetClient = require("skynet-js").SkynetClient;
const BlockDotDifficultyTournamnetManager = artifacts.require(
  "BlockDotDifficultyTournamnetManager"
);
const BlockDotDifficulty = artifacts.require("BlockDotDifficulty");
const Sablier = artifacts.require("Sablier");
var Token = artifacts.require("ERC20");
const bigNumber = require("bignumber.js");
const axios = require("axios");
const skynet = require("skynet-js");
let accounts = [],
  nfts = [],
  urls = [];
const url = web3.utils.asciiToHex(
  "https://siasky.net/IADUs8d9CQjUO34LmdaaNPK_STuZo24rpKVfYW3wPPM2uQ"
);
let accounts1,
  tokenAmount,
  adminKeys,
  playerKeys,
  policyData,
  startDate,
  balance,
  endDate,
  deposit,
  streamId,
  tokenID,
  scoresIds,
  nftIds,
  tokenID1,
  decimals,
  tournamentId,
  tournamentDuration,
  tournamentScoreIds;
// For documentation please see https://framework.embarklabs.io/docs/contracts_testing.html
config(
  {
    contracts: {
      deploy: {
        BlockDotDifficultyTournamnetManager: {
          args: [],
        },
        BlockDotDifficulty: {
          args: [],
        },
        ERC20: {
          args: [
            "TestToken",
            "TT",
            18,
            new bigNumber(20000000000000000000000000000).toFixed(),
          ],
        },
        CTokenManager: {
          args: [],
        },
        Sablier: {
          deps: ["ERC20"],
          args: ["$CTokenManager"],
        }, // options as discussed in Smart Contract configuration guide
      },
    },
  },
  (err, _accounts) => {
    accounts = _accounts;
    console.log("_accounts: ", _accounts);
  }
);
contract("ERC720", async () => {
  it("should init  token contract and mint tokens", async () => {
    var receipt = await Token.methods
      .initialize(
        "TestToken",
        "TT",
        18,
        new bigNumber(20000000000000000000000000000).toFixed()
      )
      .send();
    assert.strictEqual(receipt != null, true);
    // console.log('receipt: ', receipt.events.Approval.returnValues)
  });
  it("should approve the sablier token", async () => {
    var receipt = await Token.methods
      .approve(
        Sablier.options.address,
        new bigNumber(1000000000000000000000000000000)
      )
      .send();
    assert.strictEqual(receipt != null, true);
    // console.log('receipt: ', receipt.events.Approval.returnValues)
  });
  it("should approve to accounts[1] 100000000000000000000000", async () => {
    var receipt = await Token.methods
      .approve(accounts[1], new bigNumber(1000000000000000000000000000000))
      .send();
    assert.strictEqual(receipt != null, true);
    // console.log('receipt: ', receipt.events.Approval.returnValues)
  });
  /**/ it("should transfer 100000000000000000000000", async () => {
    var receipt = await Token.methods
      .transfer(accounts[1], new bigNumber(200000000000000000000000000))
      .send();
    assert.strictEqual(receipt != null, true);
    // console.log('receipt: ', receipt.events.Approval.returnValues)
  });
});
contract("BlockDotDifficulty", async function() {
  it("should init the asset contract", async () => {
    var receipt = await BlockDotDifficulty.methods
      .init("Collector", "TC", accounts[0])
      .send();
    assert.strictEqual(receipt != null, true);
  });
  it("should  create a new NFT", async () => {
    const assetMetaData = JSON.stringify({
      name: "NFT",
      type: "NFT1",
      avatarURL: "https://source.unsplash.com/random",
      value: Math.random() * new bigNumber(4500000000000000000000).toFixed(),
    });

    const receipt = await BlockDotDifficulty.methods
      .createNewNFT(assetMetaData)
      .send();
    console.log("added nft: ", receipt.events.Transfer.returnValues);
    tokenID = receipt.events.Transfer.returnValues.tokenId;
    assert.strictEqual(receipt != null, true);
  });
  it("should  create a time based NFT", async () => {
    const assetMetaData = JSON.stringify({
      name: "TimeNFT",
      type: "NFT2",
      avatarURL: "https://source.unsplash.com/random",
      value: Math.random() * new bigNumber(9000000000000000000000).toFixed(),
      endDate: endDate,
    });

    const receipt = await BlockDotDifficulty.methods
      .createNewNFT(assetMetaData)
      .send();
    console.log("added nft: ", receipt.events.Transfer.returnValues);
    tokenID1 = receipt.events.Transfer.returnValues.tokenId;
    assert.strictEqual(receipt != null, true);
  });
  it("should check if the NFT exists id exists", async () => {
    var exists = await BlockDotDifficulty.methods.exists(tokenID).call();
    console.log("exists: ", exists);
    assert.strictEqual(exists, true);
  });
  it("should check if the NFT exists id1 exists", async () => {
    var exists = await BlockDotDifficulty.methods.exists(tokenID1).call();
    console.log("exists1: ", exists);
    assert.strictEqual(exists, true);
  });
  it("should check if caller owns or is aproved to transfer", async () => {
    var isApprovedOrOwner = await BlockDotDifficulty.methods
      .isApprovedOrOwner(accounts[0], tokenID)
      .call();
    console.log("isApprovedOrOwner: ", isApprovedOrOwner);
    assert.strictEqual(isApprovedOrOwner, true);
  });
  it("should check if caller owns or is aproved to transfer tokenID1", async () => {
    var isApprovedOrOwner = await BlockDotDifficulty.methods
      .isApprovedOrOwner(accounts[0], tokenID1)
      .call();
    console.log("isApprovedOrOwner: ", isApprovedOrOwner);
    assert.strictEqual(isApprovedOrOwner, true);
  });
  it("Should get totalSUpply of all NFTS", async () => {
    var supply = await BlockDotDifficulty.methods.totalSupply().call();
    console.log("supply: ", supply);
    assert.strictEqual(supply > 0, true);
  });
  it("should get a nft metadata", async () => {
    var metadata = await BlockDotDifficulty.methods.tokenURI(tokenID).call();
    console.log("metaData: ", metadata);
    assert.strictEqual(metadata !== null, true);
  });
});
/**/
contract("Sablier", async function() {
  it("should create a stream", async () => {
    decimals = await Token.methods.decimals().call({
      gas: 6000000,
    });
    console.log("decimals: ", decimals);
    tokenAmount = new bigNumber(Math.round(Math.random() * 500000));
    tokenAmount = tokenAmount.multipliedBy(new bigNumber(10).pow(decimals));
    startDate = new bigNumber(
      new Date(new Date().setMinutes(new Date().getMinutes() + 1)).getTime()
    ).toFixed();
    endDate = new bigNumber(
      new Date(new Date().setDate(new Date().getDate() + 5)).getTime()
    ).toFixed(); //5 days from now
    startDate = Math.round(startDate / 1000);
    endDate = Math.round(endDate / 1000);
    console.log("startDate: ", startDate);
    console.log("endDate: ", endDate);
    var timeDelta = new bigNumber(endDate - startDate).toFixed();
    console.log(
      "tokenAmount: ",
      tokenAmount.toFixed(),
      " timeDelta: ",
      timeDelta
    );
    deposit = calculateDeposit(timeDelta, tokenAmount);
    console.log("deposit: ", deposit);
  });
  it("should start a new stream", async function() {
    var receipt = await Sablier.methods
      .createStream(
        accounts[1],
        deposit,
        Token.options.address,
        startDate,
        endDate
      )
      .send({
        gas: 6000000,
        from: accounts[0],
      });
    console.log(
      "startStream: ",
      receipt.events.CreateStream.returnValues.streamId
    );
    streamId = receipt.events.CreateStream.returnValues.streamId;
    await increaseTime(200);
  });
  it("should check the balance of user since stream started", async () => {
    var balance = await Sablier.methods.balanceOf(streamId, accounts[1]).call({
      gas: 6000000,
    });
    console.log("balance: ", balance);
    assert.strictEqual(balance > 0, true);
    // console.log('receipt: ', receipt.events.Approval.returnValues)
  });
});
contract("BlockDotDifficultyTournamnetManager", async () => {
  createNFTS();
  console.log(JSON.stringify(nfts));
  tournamentId = web3.utils.toHex(
    Math.round(Math.random() * 100 + new Date().getTime()).toString()
  );
  tournamentDuration = new Date(
    new Date().setMinutes(new Date().getMinutes() + 60)
  ).getTime();
  it("should init the BlockDotDifficultyTournamnetManager contract", async () => {
    var receipt = await BlockDotDifficultyTournamnetManager.methods.init().send();
    assert.strictEqual(receipt != null, true);
  });
  it("should register a new tournament", async () => {
    var receipt = await BlockDotDifficultyTournamnetManager.methods
      .registerTournament(tournamentId, tournamentDuration)
      .send();
    assert.strictEqual(receipt !== null, true);
  });
  it("should check if a tournament exists", async () => {
    var exists = await BlockDotDifficultyTournamnetManager.methods
      .tournamentActive(tournamentId)
      .call();
    console.log("tournament exists: ", exists);
    assert.strictEqual(exists, true);
  });
  it("should register a players score", async () => {
    const receipt = await BlockDotDifficultyTournamnetManager.methods
      .registerPlayerScore(
        Math.round(Math.random() * 10000),
        [
          BlockDotDifficulty.options.address,
          BlockDotDifficulty.options.address,
        ],
        [tokenID, tokenID1],
        tournamentId
      )
      .send();
    assert.strictEqual(receipt !== null, true);
  });
  it("should get tournament details", async () => {
    var details = await BlockDotDifficultyTournamnetManager.methods
      .getTournamentDetails(tournamentId)
      .call();
    console.log("tournament details: ", details);
    assert.strictEqual(details !== null, true);
  });
  it("should end a tournament", async () => {
    var receipt = await BlockDotDifficultyTournamnetManager.methods
      .endTournament(tournamentId)
      .send();
    assert.strictEqual(receipt !== null, true);
  });

  it("should get player tournament scores", async () => {
    tournamentScoreIds = await BlockDotDifficultyTournamnetManager.methods
      .getPlayerTournamentScoreIds(tournamentId)
      .call();
    assert.strictEqual(tournamentScoreIds !== null, true);
  });
  it("should get a players tournament score", async () => {
    const player = await BlockDotDifficultyTournamnetManager.methods
      .getPlayerTournamentScore(tournamentScoreIds[0])
      .call();
    console.log("player: ", player);
    assert.strictEqual(player[0] > 0, true);
  });

  it("should get player collected nft ids", async () => {
    nftIds = await BlockDotDifficultyTournamnetManager.methods
      .getPlayerCollectedNFTIds()
      .call();
    console.log("nftIds: ", nftIds.length);
    assert.strictEqual(nftIds !== null, true);
  });
  it("should upload skynet url", async () => {
    const receipt = await BlockDotDifficultyTournamnetManager.methods
      .saveRecording(url)
      .send();
    assert.strictEqual(receipt !== null, true);
  });
  it("should get all uploaded urls", async () => {
    urls = await BlockDotDifficultyTournamnetManager.methods.getRecordingKeys().call();
    console.log("urls: ", urls);
    assert.strictEqual(urls.length > 0, true);
  });
  it("should get recording details", async () => {
    //const url = web3.utils.toAscii(urls[0]);
    const details = await BlockDotDifficultyTournamnetManager.methods
      .getRecordingDetails(urls[0])
      .call();
    console.log("recording details: ", details);
    assert.strictEqual(details !== null, true);
  });
  it("should add token to minted", async () => {
    const receipt = await await BlockDotDifficultyTournamnetManager.methods
      .addToMinted(tokenID1)
      .send();
    console.log("receipt: ", receipt);
    assert.strictEqual(receipt !== null, true);
  });
  it("should get all minted tokens id", async () => {
    const keys = await await BlockDotDifficultyTournamnetManager.methods
      .getMintedNFTKeys()
      .call();
    console.log("keys: ", keys);
    assert.strictEqual(keys.length > 0, true);
  });
  it("should get all minted tokens id", async () => {
    const minted = await await BlockDotDifficultyTournamnetManager.methods
      .isMinted(tokenID1)
      .call();
    console.log("minted: ", minted);
    assert.strictEqual(minted, true);
  });
  it("should purchase more time through sablier", async () => {
    decimals = await Token.methods.decimals().call();
    tokenAmount = new bigNumber(Math.round(Math.random() * 200));
    tokenAmount = tokenAmount.multipliedBy(new bigNumber(10).pow(decimals));
    startDate = new bigNumber(
      new Date(new Date().setMinutes(new Date().getMinutes() + 30)).getTime()
    ).toFixed();
    endDate = new bigNumber(
      new Date(new Date().setDate(new Date().getDate() + 5)).getTime()
    ).toFixed(); //5 days from now
    startDate = Math.round(startDate / 1000);
    endDate = Math.round(endDate / 1000);
    console.log("startDate: ", startDate);
    console.log("endDate: ", endDate);
    var timeDelta = new bigNumber(endDate - startDate).toFixed();
    console.log("timeDelta: ", timeDelta);
    deposit = calculateDeposit(timeDelta, tokenAmount);
    var bal = await Token.methods.balanceOf(accounts[1]).call();
    console.log(deposit, bal, bal > deposit);
    var receipt = await Sablier.methods
      .createStream(
        BlockDotDifficulty.options.address,
        deposit,
        Token.options.address,
        startDate,
        endDate
      )
      .send({
        from: accounts[0],
      });
    console.log(
      "startStream: ",
      receipt.events.CreateStream.returnValues.streamId
    );
    streamId = receipt.events.CreateStream.returnValues.streamId;
    await increaseTime(200);
    receipt = await BlockDotDifficultyTournamnetManager.methods
      .purchaseTime(streamId, Token.options.address)
      .send();
    assert.strictEqual(receipt != null, true);
  });
});
contract("sealable NFTs", async () => {
  it("should generate nucypher keys for admin", async () => {
    adminKeys = await axios.post("http://0.0.0.0:5000/api/generate_keys/", {
      user_uuid: accounts[0],
    });
    adminKeys = adminKeys.data;
    console.log("adminKeys: ", adminKeys);
    assert.strictEqual(adminKeys !== null, true);
  });
  it("should generate nucypher keys for player", async () => {
    playerKeys = await axios.post("http://0.0.0.0:5000/api/generate_keys/", {
      user_uuid: accounts[0],
    });
    playerKeys = playerKeys.data;
    console.log("playerKeys: ", playerKeys);
    assert.strictEqual(playerKeys !== null, true);
  });
  it("should encrypt NFT data useing admin keys", async () => {
    var results = await axios.post("http://0.0.0.0:5000/api/encrypt/", {
      nft_uuid: "1234444",
      nft_data: [
        '{"name":"NFT","type":"NFT1","avatarURL":"https://source.unsplash.com/random","value":611846011332834000000}',
        '{"name":"TimeNFT","type":"NFT2","avatarURL":"https://source.unsplash.com/random","value":8.288574632515459e+21}',
        '{"name":"NFT","type":"NFT1","avatarURL":"https://source.unsplash.com/random","value":3.760890008172044e+21}',
        '{"name":"TimeNFT","type":"NFT2","avatarURL":"https://source.unsplash.com/random","value":567948296124890740000}',
        '{"name":"NFT","type":"NFT1","avatarURL":"https://source.unsplash.com/random","value":2.1769600916738036e+21}',
        '{"name":"TimeNFT","type":"NFT2","avatarURL":"https://source.unsplash.com/random","value":4.2856733365278207e+21}',
        '{"name":"NFT","type":"NFT1","avatarURL":"https://source.unsplash.com/random","value":3.3521013038646863e+21}',
        '{"name":"TimeNFT","type":"NFT2","avatarURL":"https://source.unsplash.com/random","value":4.147827778070077e+21}',
        '{"name":"NFT","type":"NFT1","avatarURL":"https://source.unsplash.com/random","value":291677280056555900000}',
        '{"name":"TimeNFT","type":"NFT2","avatarURL":"https://source.unsplash.com/random","value":1.3730906646129871e+21}',
        '{"name":"NFT","type":"NFT1","avatarURL":"https://source.unsplash.com/random","value":1.6188163626998288e+21}',
        '{"name":"TimeNFT","type":"NFT2","avatarURL":"https://source.unsplash.com/random","value":4.345618488546691e+21}',
        '{"name":"NFT","type":"NFT1","avatarURL":"https://source.unsplash.com/random","value":3.6028761433711606e+21}',
        '{"name":"TimeNFT","type":"NFT2","avatarURL":"https://source.unsplash.com/random","value":5.630996444020398e+21}',
        '{"name":"NFT","type":"NFT1","avatarURL":"https://source.unsplash.com/random","value":2.7818895298032766e+21}',
        '{"name":"TimeNFT","type":"NFT2","avatarURL":"https://source.unsplash.com/random","value":3.5098897571398125e+21}',
        '{"name":"NFT","type":"NFT1","avatarURL":"https://source.unsplash.com/random","value":2.2109424776702539e+21}',
        '{"name":"TimeNFT","type":"NFT2","avatarURL":"https://source.unsplash.com/random","value":2.640078304955253e+21}',
        '{"name":"NFT","type":"NFT1","avatarURL":"https://source.unsplash.com/random","value":2.4078634193345357e+21}',
        '{"name":"TimeNFT","type":"NFT2","avatarURL":"https://source.unsplash.com/random","value":4.401895249980393e+21}',
      ],
      sender: accounts[1],
    });
    console.log("results: ", results.data);
    assert.strictEqual(results.data.results === "OK", true);
  });
  it("should assign the policy to the player", async () => {
    policyData = await axios.post("http://0.0.0.0:5000/api/assign_policy/", {
      nft_uuid: "1234444",
      public_key_user: playerKeys.pub.sig,
      public_sign_user: playerKeys.pub.enc,
    });
    policyData = policyData.data;
    console.log("policyData: ", policyData);
    assert.strictEqual(policyData !== null, true);
  });
  it("should decrypt the nftdata", async () => {
    console.log(`data: `, {
      nft_uuid: "1234444",
      sub_private_key: playerKeys.pvt.enc,
      sub_signer_key: playerKeys.pvt.sig,
      policy_pub_key: policyData.policy_pub_key,
      policy_sign_key: policyData.policy_sig_key,
      label: policyData.label,
    });
    data = await axios.post("http://0.0.0.0:5000/api/decrypt_data/", {
      nft_uuid: "1234444",
      sub_private_key: playerKeys.pvt.enc,
      sub_signer_key: playerKeys.pvt.sig,
      policy_pub_key: policyData.policy_pub_key,
      policy_sign_key: policyData.policy_sig_key,
      label: policyData.label,
    });
    //data = JSON.parse(data.data);
    console.log("data: ", data.data);
    assert.strictEqual(data.length === nfts.length, true);
  });
  it("should  create a new NFT from the sealed data", async () => {
    const assetMetaData = JSON.stringify(nfts[0]);
    const receipt = await BlockDotDifficulty.methods
      .createNewNFT(assetMetaData)
      .send();
    console.log("added nft: ", receipt.events.Transfer.returnValues);
    tokenID = receipt.events.Transfer.returnValues.tokenId;
    assert.strictEqual(receipt != null, true);
  });
});

/*contract("server interaction", function() {
  it("Should post a player profile to the server", async () => {
    axios
      .post("http://localhost:3001/profile", {
        walletid: "0xe28EF036Aa9133dbd323dE3674D2c41a49E761fA",
        username: "ass",
      })
      .then(function(response) {
        // handle success
        console.log("response: ", response);
        assert.strictEqual(response.data.username, true);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      })
      .then(function() {
        // always executed
      });
  });
  it("Should get a player profile from the server", async () => {
    axios
      .get("http://localhost:3001/profile", {
        walletid: "0xe28EF036Aa9133dbd323dE3674D2c41a49E761fA",
        username: "ass",
      })
      .then(function(response) {
        // handle success
        console.log("response: ", response);
        assert.strictEqual(response.data.username, true);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      })
      .then(function() {
        // always executed
      });
  });
});*/

function calculateDeposit(delta, deposit) {
  var diff = deposit.minus(deposit.minus(deposit.mod(delta)));
  deposit = new bigNumber(deposit).minus(diff);
  console.log("deposit.toFixed(): ", deposit.toFixed());
  return deposit.toFixed();
}
function createNFTS() {
  for (var i = 0; i < 10; i++) {
    nfts.push(
      JSON.stringify({
        name: "NFT",
        type: "NFT1",
        avatarURL: "https://source.unsplash.com/random",
        value: Math.random() * new bigNumber(4500000000000000000000).toFixed(),
      })
    );
    nfts.push(
      JSON.stringify({
        name: "TimeNFT",
        type: "NFT2",
        avatarURL: "https://source.unsplash.com/random",
        value: Math.random() * new bigNumber(9000000000000000000000).toFixed(),
        endDate: endDate,
      })
    );
  }
}
const onUploadProgress = (progress, { loaded, total }) => {
  console.info(`Progress ${Math.round(progress * 100)}%`);
};
