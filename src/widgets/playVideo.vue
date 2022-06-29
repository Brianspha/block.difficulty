<template>
  <v-row justify="center">
    <v-dialog persistent v-model="$store.state.showPlay">
      <v-card>
        <v-card-title class="headline">Replay Session</v-card-title>
        <xgplayer :options="replayOptions"></xgplayer>
        <v-card-title>{{replayOptions.player}}</v-card-title>
        <v-card-text></v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="$store.state.showPlay = false">Close</v-btn>
          <v-btn color="green darken-1" text @click="toMainMenu">Replay</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  data() {
    return {
      replayOptions: {},
    };
  },
  mounted() {
    this.init();
    this.createPlayVideoEvent();
  },
  methods: {
    createPlayVideoEvent() {
      let _this = this;
      window.document.addEventListener(
        "playVideo",
        function (e) {
          _this.replayOptions = {
            player: web3.eth.defaultAccount,
            url: e.detail,
            width: "100%",
          };
          _this.$store.state.showPlay = true;
        },
        false
      );
    },
    init() {
      try {
        this.replayOptions = {
          player: web3.eth.defaultAccount,
          url: JSON.parse(localStorage.getItem("video")).data,
          width: "100%",
        };
        console.log("here in try");
      } catch (ex) {
        console.log("ex: ", ex);
        this.replayOptions = {
          player: web3.eth.defaultAccount,
          url: "",
          width: "100%",
        };
      }
      console.log("replayOptions: ", this.replayOptions);
    },
    toMainMenu() {
      window.location.href = "/server";
    },
  },
};
</script>

<style>
</style>