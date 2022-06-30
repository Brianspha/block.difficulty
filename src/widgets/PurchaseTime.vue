<template>
  <v-row justify="center">
    <v-dialog persistent v-model="$store.state.showPurchaseTimeForm">
      <v-card>
        <v-card-title class="headline">Extend Game Time</v-card-title>

        <v-card-text>
          <v-stepper v-model="currentStep" vertical>
            <v-stepper-step :complete="currentStep > 1" step="1">
              Enter Eth Address
              <small>The Ethereum Address to use to purchase time</small>
            </v-stepper-step>
            <v-stepper-content step="1">
              <v-col cols="12" sm="6" md="3">
                <v-text-field
                  v-model="ethAddress"
                  :value="ethAddress"
                  label="Eth Address"
                  outlined
                  counter
                  maxlength="42"
                  :rules="[
                    rules.required,
                    rules.counter,
                    rules.validEthAddress,
                  ]"
                ></v-text-field>
              </v-col>
              <v-btn v-if="ethAddress" color="primary" @click="currentStep = 2">Continue</v-btn>
              <v-btn text>Cancel</v-btn>
            </v-stepper-content>
            <v-stepper-step :complete="currentStep > 2" step="2">Enter Token Address</v-stepper-step>
            <v-stepper-content step="2">
              <v-col cols="12" sm="6" md="3">
                <v-text-field
                  v-model="tokenAddress"
                  :value="tokenAddress"
                  label="ERC20 Token Address"
                  outlined
                  counter
                  maxlength="42"
                  :rules="[
                    rules.required,
                    rules.counter,
                    rules.validEthAddress,
                  ]"
                ></v-text-field>
              </v-col>
              <v-btn @click="currentStep = 1">Back</v-btn>
              <v-btn v-if="tokenAddress" color="primary" @click="currentStep = 3">Approve</v-btn>
            </v-stepper-content>
            <v-stepper-step :complete="currentStep > 3" step="3">Enter Time to Purchase</v-stepper-step>
            <small>Maximum at a time is 6 minutes</small>
            <v-stepper-content step="3">
              <v-col cols="12" sm="6" md="3">
                <v-text-field
                  v-model="time"
                  value="0"
                  label="Time"
                  outlined
                  :rules="[rules.required, rules.validNumber, rules.maxTime]"
                ></v-text-field>
              </v-col>
              <v-btn @click="currentStep = 2">Back</v-btn>
              <v-space></v-space>
              <v-btn v-if="time > 0 && time <= 6" color="primary" @click="purchaseTime">Purchase</v-btn>
            </v-stepper-content>
          </v-stepper>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="$store.state.showPurchaseTimeForm = false"
          >Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import utils from "web3-utils";
import Contract from "web3-eth-contract";
import bigNumber from "bignumber.js";
export default {
  data() {
    return {
      startDate: "",
      endDate: "",
      deposit: 0,
      tokenAddress: "",
      time: 0,
      currentStep: 1,
      ethAddress: web3.eth.defaultAccount,
      rules: {
        required: (value) => !!value || "Required.",
        counter: (value) =>
          (!!value && value.length <= 42) || "Max 42 characters",
        validEthAddress: (value) =>
          (!!value && utils.isAddress(value)) || "Invalid Eth Address",
        validNumber: (value) => (!!value && !isNaN(value)) || "Invalid Number",
        maxTime: (value) =>
          (!!value && parseInt(value) > 0 && parseInt(value) <= 6) ||
          "Max Time must be less than equal to 6",
      },
    };
  },
  mounted() {
    this.createShowModalEvent();
    console.log("this.$store ", this.$store);
  },
  methods: {
    createShowModalEvent() {
      // Listen for the event.
      let _this = this;
      window.document.addEventListener(
        "showModal",
        function (e) {
          _this.$store.state.showPurchaseTimeForm = true;
        },
        false
      );
    },
    approve() {
      this.$store.dispatch("showLoading");
      let _this = this;
      return new Promise(async (resolve) => {
        var Token = new Contract(
          require("../../contracts/abis/IERC20.json"),
          _this.tokenAddress
        );
        var tokenAmount = new bigNumber(_this.time).multipliedBy(
          _this.$store.state.costPerMinute
        );
        var bal = await Token.methods.balanceOf(_this.ethAddress).call();
        const tempDate = new Date(
          new Date().setMinutes(new Date().getMinutes() + 60)
        );
        _this.startDate = new bigNumber(tempDate.getTime()).toFixed();
        //@dev start 1 hour from now
        _this.endDate = new bigNumber(
          new Date(
            new Date().setDate(tempDate.getMinutes() + _this.time)
          ).getTime()
        ).toFixed(); //time minutes from now
        _this.startDate = Math.round(_this.startDate / 1000);
        _this.endDate = Math.round(_this.endDate / 1000);
        var timeDelta = new bigNumber(
          _this.endDate - _this.startDate
        ).toFixed();
        _this.deposit = await Promise.resolve(
          _this.$store.dispatch(`calculateDeposit`, {
            delta: timeDelta,
            deposit: tokenAmount,
          })
        );
        console.log("calculatedDeposit: ", _this.deposit);
        if (bal <= 0 && bal >= _this.deposit) {
          _this.$store.dispatch(`showAlert`, {
            message: "Please esnure you have a valid balance to purchase time",
          });
          window.document.dispatchEvent(
            new Event("continue", { bubbles: true })
          );
          this.$store.dispatch("hideLoading");
          resolve();
        } else {
          Token.methods
            .approve(_this.$store.state.sablier.address, _this.deposit)
            .send({ gas: 6000000, from: _this.ethAddress })
            .then(async (receipt, error) => {
              if (error) {
                this.$store.dispatch("hideLoading");
                this.$store.dispatch("showAlert", {
                  message:
                    "Something went wrong please ensure you have a sufficient balance and try again!!",
                });
              } else {
                _this.$store.dispatch("hideLoading");
                resolve();
              }
            })
            .catch((error) => {
              this.$store.dispatch("hideLoading");
              this.$store.dispatch("showAlert", {
                message:
                  "Something went wrong please ensure you have a sufficient balance and try again!!",
              });
            });
        }
      });
    },
    purchaseTime: async function () {
      this.$store.dispatch("showLoading");
      await Promise.resolve(this.approve());
      var receipt = this.$store.state.sablier.methods
        .createStream(
          this.$store.state.adminAddress,
          this.deposit,
          this.tokenAddress,
          this.startDate,
          this.endDate
        )
        .send({ gas: 6000000, from: this.ethAddress })
        .then(async (receipt, error) => {
          if (error) {
            await Promse.resolve(
              this.$store.dispatch("showAlert", {
                message:
                  "Something went wrong please ensure you have a sufficient balance and try again!!",
              })
            );
            this.$store.dispatch("hideLoading");
          } else {
            var streamId = receipt.events.CreateStream.returnValues.streamId;
            receipt = await this.$store.state.BlockDotDifficultyTournamentManager.methods
              .purchaseTime(streamId, this.tokenAddress)
              .send({ gas: 6000000, from: this.ethAddress });
            this.$store.dispatch("hideLoading");
            window.document.dispatchEvent(
              new Event("continue", { bubbles: true })
            );
            localStorage.setItem("time", JSON.stringify({ time: this.time }));
            this.$store.state.showPurchaseTimeForm = false;
            this.reset();
          }
        });
    },
    reset() {
      this.currentStep = 1;
      this.ethAddress = "";
      this.time = 0;
      this.tokenAddress = "";
    },
  },
};
</script>
