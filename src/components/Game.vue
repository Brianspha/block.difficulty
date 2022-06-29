<template><div><PurchaseTime/></div></template>
<script>
import PurchaseTime from "../widgets/PurchaseTime";
export default {
  name: "GameView",
  components: {
    PurchaseTime
  },
  data: () => ({}),
  mounted() {
    this.loadGame();
  },
  methods: {
    loadGame() {
      window.route = this.$route;
      let gameScript = document.createElement("script");
      gameScript.setAttribute("src", require("../js/main"));
      document.head.appendChild(gameScript);
    },
  },
};
</script>
