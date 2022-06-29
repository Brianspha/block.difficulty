<template>
  <v-app>
    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <v-card>
          <v-tabs
            v-model="tab"
            background-color="white"
            color="green"
            centered
            icons-and-text
            fixed-tabs
            right
          >
            <v-tab key="1">
              <v-icon>mdi-gamepad</v-icon>Room
            </v-tab>
            
            <v-tab>
              <v-icon>mdi-history</v-icon>Replays
            </v-tab>
            
            <v-tabs-items v-model="tab">
              <v-tab-item key="1">
                <v-container height="100%" fluid>
                  <room />
                </v-container>
              </v-tab-item>
              <v-tab-item key="3">
                <v-container height="100%" fluid>
                  <Replays />
                </v-container>
              </v-tab-item>
           
            </v-tabs-items>
          </v-tabs>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Room from "./Room.vue";
import Replays from "./Replays.vue";

export default {
  components: {
    Room,
    Replays,
  },
  data() {
    return {
      activeBtn: 0,
      tab: null,
    };
  },
  mounted() {},
  methods: {},
};
</script>

<style></style>

