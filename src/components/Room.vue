<template>
  <div>
    <v-row align="end" justify="end">
      <v-btn @click="createRoom" color="green" block>Play</v-btn>
    </v-row>
    <createRoom />
  </div>
</template>
<script>
import createRoom from "../widgets/AddRoom";
export default {
  components: {
    createRoom,
  },
  data() {
    return {
      rooms: [
        {
          id: Math.round(Math.random() * 100),
          type: "Score",
        },
        {
          id: Math.round(Math.random() * 100),
          type: "Score",
        },
        {
          id: Math.round(Math.random() * 100),
          type: "Score",
        },
        {
          id: Math.round(Math.random() * 100),
          type: "Score",
        },
        {
          id: Math.round(Math.random() * 100),
          type: "Score",
        },
        {
          id: Math.round(Math.random() * 100),
          type: "Score",
        },
        {
          id: Math.round(Math.random() * 100),
          type: "Score",
        },
        {
          id: Math.round(Math.random() * 100),
          type: "Score",
        },
      ],
    };
  },
  methods: {
    createRoom() {
      this.$store.state.createRoom = true;
    },
  },
};
</script>

<style>
</style>