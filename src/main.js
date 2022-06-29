import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import store from "./store";
import router from "./routes";
import VueXgplayer from "vue-xgplayer";
Vue.config.productionTip = false;


Vue.use(VueXgplayer, {
  // globalOptions
  enterLogo: {
    url: "/images/video-player-loading.png",
    width: 100,
    height: 40,
  },
  playsinline: true,
});
new Vue({
  vuetify,
  store,
  router: router,
  render: (h) => h(App),
}).$mount("#app");
