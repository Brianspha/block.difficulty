import Vue from "vue";
import Vuex from "vuex";
import Contract from "web3-eth-contract";
import Swal from "sweetalert2";
import "js-loading-overlay";
import bigNumber from "bignumber.js";
import "js-loading-overlay";
import Sablier from "../../embarkArtifacts/contracts/Sablier";
import generateUsername from "random-username-generator";
import { SkynetClient, genKeyPairFromSeed } from "skynet-js";
require('dotenv').config({})
Vue.use(Vuex);
const { publicKey, privateKey } = genKeyPairFromSeed(
  process.env.VUE_APP_APP_SECRET
);
generateUsername.setAdjectives(["guest"]);
var new_username = generateUsername.generate();
const client = new SkynetClient("https://siasky.net/");

export default new Vuex.Store({
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
      Swal.fire("Alert", payload.message, "warning");
    },
    showSuccess(state, payload) {
      Swal.fire("Success", payload.message, "success");
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
    }
  },
  modules: {},
});
