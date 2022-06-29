import Vue from "vue";
import Router from "vue-router";
import GameView from "../components/Game";
import NoMetaMask from "../components/404Page";
import Server from "../components/Server";
import Room from "../components/Room";
import Leaderboard from "../components/Leaderboard";
import Replays from "../components/Replays";
import GameAssets from "../components/GameAssets";

Vue.use(Router);
export default new Router({
  routes: [
    {
      path: "/",
      name: "Server",
      component: Server,
    },
    {
      path: "/gameview",
      name: "GameView",
      component: GameView,
    },
    {
      path: "/error",
      name: "404Page",
      component: NoMetaMask,
    },
    {
      path: "/server",
      name: "Server",
      component: Server,
    },
    {
      path: "/room",
      name: "Room",
      component: Room,
    },
    {
      path: "/replays",
      name: "replays",
      component: Replays,
    },
    {
      path: "/leaderboard",
      name: "leaderboard",
      component: Leaderboard,
    },
    {
      path: "/gameAssets",
      name: "gameAssets",
      component: GameAssets,
    },
  ],
  mode: "hash",
});
