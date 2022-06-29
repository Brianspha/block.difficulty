<template>
  <v-card>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon=" mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      loading-text="Loading Leaderboard... Please wait"
      :sort-by="['levels']"
      :sort-desc="[true]"
      :headers="headers"
      :items="leaderboard"
      :search="search"
      :loading="isLoading"
    ></v-data-table>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      search: "",
      headers: [
        {
          text: "Username",
          align: "start",
          filterable: false,
          value: "name",
        },
        { text: "Ethereum Address", value: "eth" },
        { text: "Levels Completed", value: "levels" },
        { text: "Total Type1 NFT", value: "type1nft" },
        { text: "Total Type2 NFT", value: "type2nft" },
        { text: "Total NFT Value", value: "value" },
      ],
      leaderboard: [
        {
          name: "guest-miss-61",
          eth: "0xbd6581FBDc3d3f42B44A1f1416ee5c2a5B7b85f6",
          roomId: Math.round(Math.random() * 1000),
          levels: Math.round(Math.random() * 11),
          type1nft: Math.round(Math.random() * 100),
          type2nft: Math.round(Math.random() * 100),
          value: Math.round(Math.random() * 1000),
        },
        {
          name: "guest-miss-61",
          eth: "0xbd6581FBDc3d3f42B44A1f1416ee5c2a5B7b85f6",
          roomId: Math.round(Math.random() * 1000),
          levels: Math.round(Math.random() * 11),
          type1nft: Math.round(Math.random() * 100),
          type2nft: Math.round(Math.random() * 100),
          value: Math.round(Math.random() * 1000),
        },
        {
          name: "guest-miss-61",
          eth: "0xbd6581FBDc3d3f42B44A1f1416ee5c2a5B7b85f6",
          roomId: Math.round(Math.random() * 1000),
          levels: Math.round(Math.random() * 11),
          type1nft: Math.round(Math.random() * 100),
          type2nft: Math.round(Math.random() * 100),
          value: Math.round(Math.random() * 1000),
        },
        {
          name: "guest-miss-61",
          eth: "0xbd6581FBDc3d3f42B44A1f1416ee5c2a5B7b85f6",
          roomId: Math.round(Math.random() * 1000),
          levels: Math.round(Math.random() * 11),
          type1nft: Math.round(Math.random() * 100),
          type2nft: Math.round(Math.random() * 100),
          value: Math.round(Math.random() * 1000),
        },
        {
          name: "guest-miss-61",
          eth: "0xbd6581FBDc3d3f42B44A1f1416ee5c2a5B7b85f6",
          roomId: Math.round(Math.random() * 1000),
          levels: Math.round(Math.random() * 11),
          type1nft: Math.round(Math.random() * 100),
          type2nft: Math.round(Math.random() * 100),
          value: Math.round(Math.random() * 1000),
        },
        {
          name: "guest-miss-61",
          eth: "0xbd6581FBDc3d3f42B44A1f1416ee5c2a5B7b85f6",
          roomId: Math.round(Math.random() * 1000),
          levels: Math.round(Math.random() * 11),
          type1nft: Math.round(Math.random() * 100),
          type2nft: Math.round(Math.random() * 100),
          value: Math.round(Math.random() * 1000),
        },
        {
          name: "guest-miss-61",
          eth: "0xbd6581FBDc3d3f42B44A1f1416ee5c2a5B7b85f6",
          roomId: Math.round(Math.random() * 1000),
          levels: Math.round(Math.random() * 11),
          type1nft: Math.round(Math.random() * 100),
          type2nft: Math.round(Math.random() * 100),
          value: Math.round(Math.random() * 1000),
        },
        {
          name: "guest-miss-61",
          eth: "0xbd6581FBDc3d3f42B44A1f1416ee5c2a5B7b85f6",
          roomId: Math.round(Math.random() * 1000),
          levels: Math.round(Math.random() * 11),
          type1nft: Math.round(Math.random() * 100),
          type2nft: Math.round(Math.random() * 100),
          value: Math.round(Math.random() * 1000),
        },
        {
          name: "guest-miss-61",
          eth: "0xbd6581FBDc3d3f42B44A1f1416ee5c2a5B7b85f6",
          roomId: Math.round(Math.random() * 1000),
          levels: Math.round(Math.random() * 11),
          type1nft: Math.round(Math.random() * 100),
          type2nft: Math.round(Math.random() * 100),
          value: Math.round(Math.random() * 1000),
        },
        {
          name: "guest-miss-61",
          eth: "0xbd6581FBDc3d3f42B44A1f1416ee5c2a5B7b85f6",
          roomId: Math.round(Math.random() * 1000),
          levels: Math.round(Math.random() * 11),
          type1nft: Math.round(Math.random() * 100),
          type2nft: Math.round(Math.random() * 100),
          value: Math.round(Math.random() * 1000),
        },
        {
          name: "guest-miss-61",
          eth: "0xbd6581FBDc3d3f42B44A1f1416ee5c2a5B7b85f6",
          roomId: Math.round(Math.random() * 1000),
          levels: Math.round(Math.random() * 11),
          type1nft: Math.round(Math.random() * 100),
          type2nft: Math.round(Math.random() * 100),
          value: Math.round(Math.random() * 1000),
        },
      ],
    };
  },
};
</script>