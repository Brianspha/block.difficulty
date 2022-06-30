import Vue from "vue";
import Vuex from "vuex";
import Contract from "web3-eth-contract";
import swal from "sweetalert2";
import "js-loading-overlay";
import bigNumber from "bignumber.js";
import "js-loading-overlay";
import Sablier from "../../embarkArtifacts/contracts/Sablier";
import generateUsername from "random-username-generator";
import { SkynetClient, genKeyPairFromSeed } from "skynet-js";
import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from 'web3'
require('dotenv').config({})
Vue.use(Vuex);
const { publicKey, privateKey } = genKeyPairFromSeed(
  process.env.VUE_APP_APP_SECRET
);
generateUsername.setAdjectives(["guest"]);
var new_username = generateUsername.generate();
const client = new SkynetClient("https://siasky.net/");

const store = new Vuex.Store({
  state: {
    token:require('../../embarkArtifacts/contracts/ERC20').default,
    BlockDotDifficulty: require('../../embarkArtifacts/contracts/BlockDotDifficulty').default,
    sablier: Sablier,
    BlockDotDifficultyTournamentManager: require("../../embarkArtifacts/contracts/BlockDotDifficultyTournamentManager")
      .default,
    contract: Contract.setProvider(window.web3.currentProvider),
    costPerMinute: 1000000000000000000, //@dev time per minute costs 1000000000000000000
    adminAddress: "0x3cB1c48dc6984c9C058EfB5BEC358F4B598EF0D8",
    showPurchaseTimeForm: false,
    room: false,
    createRoom: false,
    username: new_username,
    record: false,
    showPlay: false,
    privateKey: privateKey,
    publicKey: publicKey,
    userAddress:"",
    connected:false
  },
  mutations: {},
  actions: {
    showAlert(state, payload) {
      swal.fire("Alert", payload.message, "warning");
    },
    showSuccess(state, payload) {
      swal.fire("Success", payload.message, "success");
    },
    hideLoading() {
      JsLoadingOverlay.hide();
    },
    showLoading() {
      JsLoadingOverlay.show({ spinnerIcon: "ball-pulse-rise" });
    },
    calculateDeposit(state, payload) {
      console.log("payload", payload);
      var diff = payload.deposit.minus(
        payload.deposit.minus(payload.deposit.mod(payload.delta))
      );
      payload.deposit = new bigNumber(payload.deposit).minus(diff);
      console.log("deposit.toFixed(): ", payload.deposit.toFixed());
      return payload.deposit.toFixed();
    },
    getSkyData: async function() {
      var test = await this.state.skyClient.db.getJSON(
        this.state.publicKey,
        this.state.appSecret
      );
      if (test.data === null) {
        test = {
          data: [],
          leaderboard: [],
        };
      }
      return test;
    },
    saveSkyData: async function(context, data) {
      await client.db.setJSON(
        this.state.privateKey,
        this.state.appSecret,
        data
      );
    },
    connectWallet: async function () {
      const provider = await detectEthereumProvider();
      console.log("provider: ", provider);
      if (provider) {
        try {
          var web3Instance = new Web3(window.web3.currentProvider);
          window.web3 = web3Instance;
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          console.log("window.web3.eth.getDefaultAccount: ", web3Instance);
          window.web3.eth.defaultAccount = accounts[0];
          store.state.userAddress = window.web3.eth.defaultAccount;
          store.state.isConnected = true;
          console.log("found default account: ", store.state.userAddress);
          store.state.connected = true;
        } catch (error) {
          console.log("error connecting wallet: ", error);
          store.dispatch("error", {
            error: "There was an error enabling metamask",
          });
        }
      } else {
        store.dispatch(
          "errorWithFooterExtension", {
            errorTitle:"Mising Extension",

          message: "Seems like you dont have metamask installed please use the below link to download",
          footer: `<a href= https://metamask.io> Download Metamask</a>`
        }
        );
      }
    },
    warning(context, message) {
      swal.fire({
        icon: "info",
        title: "Info",
        text: message.warning,
        denyButtonText: `Close`,
      });
    },
    warningWithFooter(context, message) {
      swal.fire({
        icon: "info",
        title: message.errorTitle,
        text: message.message,
        footer: message.footer,
      });
    },
    error(context, message) {
      swal.fire("Error!", message.error, "error").then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
        }
      });
    },
    successWithFooter(context, message) {
      swal.fire({
        icon: "success",
        title: "Success",
        text: message.message,
        footer: `<a href= https://testnet.iotexscan.io/tx/${message.txHash}> View on iotex Explorer</a>`,
      });
    },
    errorWithFooterExtension(context, message) {
      swal.fire({
        icon: "error",
        title: message.errorTitle,
        text: message.message,
        footer: message.footer,
      }).then((result) => {
        window.location.reload()
      });
    }
  },
  modules: {},
});


export default store