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
import playVideo from "./widgets/PlayVideo.vue";
import EmbarkJS from "../embarkArtifacts/embarkjs";
import Web3 from "web3";
export default {
  name: "TheCollector",
  components: { playVideo },
  data: () => ({
    //
  }),
  methods: {
   async authenticate() {
      try {
        await this.createEvent();
        await this.init()
        await this.addStandardTokenToMetaMask()
        await this.addNFTTokenToMetaMask()

      } catch (ex) {
        this.$router.push({ path: "/error" });
      }
    },
    detectPageReload() {
      if (window.performance) {
        console.info("window.performance works fine on this browser");
      }
      console.info(performance.navigation.type);
      if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
        console.info("This page is reloaded");
        window.location.href = "./index.html";
      } else {
        console.info("This page is not reloaded");
      }
    },
    isMetaMaskConnected() {
      //Have to check the ethereum binding on the window object to see if it's installed
      const { ethereum } = window;
      return Boolean(ethereum && ethereum.isMetaMask);
    },
    init: async function () {
      return new Promise(async (resolve) => {
        this.$store.state.isLoading = true;
        let _this = this;
        this.detectPageReload();
        await this.$store.dispatch("connectWallet");
        console.log("window: ", window.web3);
        window.ethereum.on("accountsChanged", function (accounts) {
          _this.$store.state.userAddressEth = accounts[0];
          window.location.reload();
        });
        const chainId = await web3.eth.getChainId();
        console.log("chainId: ", chainId);
        if (chainId !== 4690) {
         // await this.switchNetworks();
        }
        window.ethereum.on("chainChanged", (chainId) => {
          console.log("chainChanged: ", chainId);
          if (chainId !== "0x1252") {
            this.$store.dispatch("error", {
              error: "The DApp only works if connected to OASIS testnetwork",
              onTap: async () => {
             //   await this.switchNetworks();
              },
            });
          } else {
            window.location.reload();
          }
          // Handle the new chain.
          // Correctly handling chain changes can be complicated.
          // We recommend reloading the page unless you have good reason not to.
        });
        //this.$store.state.isLoading = false;
      });
    },
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
    addStandardTokenToMetaMask: async function () {
      const tokenAddress = require('../build/contracts/ERC20.json').deployedAddress;
      const tokenSymbol = 'B.D';
      const tokenDecimals = 18;
      const tokenImage = 'https://cdn-0.generatormix.com/images/thumbs/random-female-cartoon-characters.jpg';

      try {
        // wasAdded is a boolean. Like any RPC method, an error may be thrown.
        const wasAdded = await ethereum.request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20', // Initially only supports ERC20, but eventually more!
            options: {
              address: tokenAddress, // The address that the token is at.
              symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
              decimals: tokenDecimals, // The number of decimals in the token
              image: tokenImage, // A string url of the token logo
            },
          },
        });

        if (wasAdded) {
          console.log('Thanks for your interest!');
        } else {
          console.log('Your loss!');
        }
      } catch (error) {
        console.log(error);
      }
    },
    addNFTTokenToMetaMask: async function () {
      const tokenAddress = require('../build/contracts/BlockDotDifficulty.json').deployedAddress;
      const tokenSymbol = 'B.D';
      const tokenDecimals = 0;
      const tokenImage = 'https://cdn-0.generatormix.com/images/thumbs/random-female-cartoon-characters.jpg';

      try {
        // wasAdded is a boolean. Like any RPC method, an error may be thrown.
        const wasAdded = await ethereum.request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC721', // Initially only supports ERC20, but eventually more!
            options: {
              address: tokenAddress, // The address that the token is at.
              symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
              decimals: tokenDecimals, // The number of decimals in the token
              image: tokenImage, // A string url of the token logo
            },
          },
        });

        if (wasAdded) {
          console.log('Thanks for your interest!');
        } else {
          console.log('Your loss!');
        }
      } catch (error) {
        console.log(error);
      }
    }
  },
  created() {
    this.authenticate();
  },

};
</script>
