<template>
  <v-row justify="center">
    <v-dialog v-model="$store.state.createRoom" persistent>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar color="green" dark flat>
              <v-toolbar-title>Play Game</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <div>
                Please Add the Game ERC20 token
                <br />
                <b>{{$store.state.token.options.address}}</b>
                <br />
              </div>
              <v-form>
                <v-text-field
                  label="Username"
                  v-model="$store.state.userAddress"
                  name="username"
                  prepend-icon="mdi-account"
                  type="text"
                ></v-text-field>
                <v-checkbox
                  color="green"
                  label="Record session"
                  v-model="$store.state.record"
                  required
                ></v-checkbox>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green" @click="$store.state.createRoom=false;" text>Close</v-btn>
              <v-btn color="green" @click="loadGame">Create</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  data() {
    return {
      record: false,
      username: "",
      usernameRules: [
        (v) =>
          (!!v && v.length > 3 && v.length <= 6) ||
          "Invalid username must be 6 characters max",
      ],
      valid: true,
    };
  },
  methods: {
    loadGame() {
      localStorage.setItem(
        "username",
        JSON.stringify({
          username: this.$store.state.userAddress,
          record: this.$store.state.record,
        })
      );
      this.$router.push({ path: "/gameview" });
    },
  },
};
</script>

<style>
</style>