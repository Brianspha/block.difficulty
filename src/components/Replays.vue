<template>
  <v-row>
    <v-col v-for="(replayOptions, i) in replays" :key="i" class="d-flex child-flex" cols="4">
      <v-card class="mx-auto">
        <xgplayer :options="replayOptions"></xgplayer>
        <v-card-title>{{ replayOptions.player }}</v-card-title>
        <v-card-actions>
          <v-btn text color="green">Share</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    <infinite-loading @infinite="loadVideos"></infinite-loading>
  </v-row>
</template>
<script>
import utils from "web3-utils";

import InfiniteLoading from "vue-infinite-loading";
import { SkynetClient } from "skynet-js";

const client = new SkynetClient();

export default {
  components: {
    InfiniteLoading,
  },
  data() {
    return {
      replays: [],
      isLoading: true,
      fullPage: true,
    };
  },
  mounted: async function () {
    // await Promise.resolve(this.loadVideos());
  },
  methods: {
    /**
     * @dev Initialy i was using swarm for file uploads but decided to change to skynet contract functions are unnecessary 
     * */
    loadVideos: async function ($state) {
      let _this = this;
      var urls = await _this.$store.state.BlockDotDifficultyTournamentManager.methods
        .getRecordingKeys()
        .call();
      console.log("urls: ", urls);
      if (urls.length === 0) {
        _this.$store.dispatch("hideLoading");
      } else {
        urls.map(async (url) => {
          console.log("url", url);
          const details = await _this.$store.state.BlockDotDifficultyTournamentManager.methods
            .getRecordingDetails(url)
            .call();
          console.log("details: ", details);
          const skylink = await client.downloadFile(utils.toAscii(url));
          _this.replays.push({
            url: skylink,
            width: "100%",
            player: details,
          });

        });
        _this.$store.dispatch("hideLoading");
      }
    },
  },
};
</script>