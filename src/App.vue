<template>
  <v-app>
    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>
    <playVideo />
  </v-app>
</template>
<script>
import playVideo from "./widgets/playVideo";
import EmbarkJS from "../embarkArtifacts/embarkjs";

export default {
  name: "TheCollector",
  components: { playVideo },
  data: () => ({
    //
  }),
  methods: {
    createEvent() {
      if (window.performance) {
        console.info("window.performance work's fine on this browser");
      }
      if (performance.navigation.type == 1) {
        console.info("This page is reloaded");
        localStorage.clear();
        window.location.href = "/server";
      } else {
        console.info("This page is not reloaded");
      }
      if (typeof history.pushState === "function") {
        history.pushState("jibberish", null, null);
        window.onpopstate = function () {
          history.pushState("newjibberish", null, null);
          // Handle the back (or forward) buttons here
          // Will NOT handle refresh, use onbeforeunload for this.
          this.$router.push({ path: "/server" });
        };
      } else {
        var ignoreHashChange = true;
        window.onhashchange = function () {
          if (!ignoreHashChange) {
            ignoreHashChange = true;
            window.location.hash = Math.random();
            this.$router.push({ path: "/server" });

            // Detect and redirect change here
            // Works in older FF and IE9
            // * it does mess with your hash symbol (anchor?) pound sign
            // delimiter on the end of the URL
          } else {
            ignoreHashChange = false;
          }
        };
      }
    },
  },
  mounted() {
    this.createEvent();
    try {
      EmbarkJS.enableEthereum();
    } catch (ex) {
    this.$router.push({ path: "/error" });
    }
  },
};
</script>
