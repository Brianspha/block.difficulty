<template>
  <v-data-table :headers="headers" :items="nfts" sort-by="calories" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Mint New NFT</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="green" dark class="mb-2" v-bind="attrs" v-on="on">New Item</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-tabs color="green" right>
                    <v-tab key="1">MINT Type1</v-tab>
                    <v-tab key="2">MINT Type2</v-tab>
                    <v-tab-item key="1">
                      <v-container fluid>
                        <v-stepper v-model="currentStepNFType1" vertical>
                          <v-stepper-step color="green" :complete="currentStepNFType1 > 1" step="1">
                            Token Address
                            <small>The Ethereum Address of your ERC721 Token</small>
                          </v-stepper-step>
                          <v-stepper-content step="1">
                            <v-card class="mb-12" flat>
                              <v-card-text>
                                <v-text-field
                                  :rules="[rules.required,rules.validEthAddress]"
                                  v-model="tokenAddressType1"
                                  label="Address"
                                  outlined
                                ></v-text-field>
                              </v-card-text>
                            </v-card>
                            <v-btn
                              v-if="web3Utils.isAddress(tokenAddressType1)"
                              color="green"
                              @click="currentStepNFType1 = 2"
                            >Continue</v-btn>
                          </v-stepper-content>
                          <v-stepper-step color="green" :complete="currentStepNFType1 > 2" step="2">
                            NFT Value
                            <small>The ERC20 Token Value associated with the Token and the Token Address</small>
                          </v-stepper-step>
                          <v-stepper-content step="2">
                            <v-card class="mb-12" flat>
                              <v-card-text>
                                <v-text-field
                                  v-model="tokenERC20AddressType1"
                                  :rules="[rules.required,rules.validEthAddress]"
                                  label="Address"
                                  outlined
                                ></v-text-field>
                                <v-text-field
                                  v-model="nftValue1"
                                  :rules="[rules.required,rules.validNumber]"
                                  label="Value"
                                  outlined
                                ></v-text-field>
                              </v-card-text>
                            </v-card>
                            <v-btn
                              v-if="web3Utils.isAddress(tokenERC20AddressType1) && nftValue1>0"
                              color="green"
                              @click="mintType1"
                            >Mint</v-btn>
                            <v-btn @click="currentStepNFType1-=1" text>Back</v-btn>
                          </v-stepper-content>
                        </v-stepper>
                      </v-container>
                    </v-tab-item>
                    <v-tab-item key="2">
                      <v-container fluid>
                        <v-stepper v-model="currentStepNFType2" vertical>
                          <v-stepper-step color="green" :complete="currentStepNFType2 > 1" step="1">
                            Token Address
                            <small>The Ethereum Address of your ERC721 Token</small>
                          </v-stepper-step>
                          <v-stepper-content step="1">
                            <v-card class="mb-12" flat>
                              <v-card-text>
                                <v-text-field
                                  :rules="[rules.required,rules.validEthAddress]"
                                  v-model="tokenAddressType1"
                                  label="Address"
                                  outlined
                                ></v-text-field>
                              </v-card-text>
                            </v-card>
                            <v-btn
                              v-if="web3Utils.isAddress(tokenAddressType1)"
                              color="green"
                              @click="currentStepNFType2 = 2"
                            >Continue</v-btn>
                          </v-stepper-content>
                          <v-stepper-step color="green" :complete="currentStepNFType2 > 2" step="2">
                            NFT Value
                            <small>The ERC20 Token Value associated with the Token and the Token Address</small>
                          </v-stepper-step>
                          <v-stepper-content step="2">
                            <v-card class="mb-12" flat>
                              <v-card-text>
                                <v-text-field
                                  v-model="tokenERC20AddressType2"
                                  :rules="[rules.required,rules.validEthAddress]"
                                  label="Address"
                                  outlined
                                ></v-text-field>
                                <v-text-field
                                  v-model="nftValue2"
                                  :rules="[rules.required,rules.validNumber]"
                                  label="Value"
                                  outlined
                                ></v-text-field>
                              </v-card-text>
                            </v-card>
                            <v-btn @click="currentStepNFType2-=1" text>Back</v-btn>
                            <v-btn
                              v-if="web3Utils.isAddress(tokenERC20AddressType2) && nftValue2>0"
                              color="green"
                              @click="currentStepNFType2 = 3"
                            >Continue</v-btn>
                          </v-stepper-content>
                          <v-stepper-step
                            color="green"
                            :complete="currentStepNFType2 > 3"
                            step="3"
                          >Start Date for Value Stream</v-stepper-step>
                          <v-stepper-content :complete="currentStepNFType2 > 3" step="3">
                            <v-card class="mb-12" flat>
                              <v-card-text>
                                <v-date-picker
                                  color="green"
                                  v-model="startDate"
                                  :show-current="true"
                                ></v-date-picker>
                              </v-card-text>
                            </v-card>
                            <v-btn @click="currentStepNFType2-=1" text>Back</v-btn>
                            <v-btn color="green" @click="currentStepNFType2 = 4">Continue</v-btn>
                          </v-stepper-content>
                          <v-stepper-step
                            color="green"
                            :complete="currentStepNFType2 > 4"
                            step="4"
                          >End Date for Value Stream</v-stepper-step>
                          <v-stepper-content :complete="currentStepNFType2 > 4" step="4">
                            <v-card class="mb-12" flat>
                              <v-card-text>
                                <v-date-picker color="green" v-model="endDate" :show-current="true"></v-date-picker>
                              </v-card-text>
                            </v-card>
                            <v-btn @click="currentStepNFType2-=1" text>Back</v-btn>
                            <v-btn color="green" @click="mintType2">Mint</v-btn>
                          </v-stepper-content>
                        </v-stepper>
                      </v-container>
                    </v-tab-item>
                  </v-tabs>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="dialog=false">Cancel</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
  </v-data-table>
</template>

<script>
import utils from "web3-utils";
export default {
  data: () => ({
    web3Utils: utils,
    startDate: "",
    endDate: "",
    tokenERC20AddressType1: "",
    tokenERC20AddressType2: "",
    tokenAddressType1: "",
    tokenAddressType2: "",
    nftValue1: 0,
    nftValue2: 0,
    currentStepNFType1: 1,
    currentStepNFType2: 1,
    selectedType: "",
    rules: {
      required: (value) => !!value || "Required.",
      counter: (value) =>
        (!!value && value.length <= 42) || "Max 42 characters",
      validEthAddress: (value) =>
        (!!value && utils.isAddress(value)) || "Invalid Eth Address",
      validNumber: (value) => (!!value && !isNaN(value)) || "Invalid Number",
      maxTime: (value) =>
        (!!value && parseInt(value) > 0 && parseInt(value) <= 6) ||
        "Max Time must be less than equal to 6",
    },
    nftTypes: ["Type1", "Type2"],
    valid: false,
    dialog: false,
    headers: [
      {
        text: "Token Address",
        align: "start",
        filterable: false,
        value: "tokenAddress",
      },
      { text: "NFT ID", value: "id" },
      { text: "NFT Type", value: "nftType" },
      { text: "Stream Duration", value: "duration" },
      { text: "NFT Value", value: "value" },
    ],
    nfts: [],
    editedIndex: -1,
    editedItem: {
      id: 0,
      nftType: 0,
      duration: 0,
      value: 0,
    },
    defaultItem: {
      tokenAddress: "",
      id: 0,
      nftType: 0,
      duration: 0,
      value: 0,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    close() {
      this.dialog = false;
    },
    mintType2() {
      console.log("startDate: ", new Date(this.startDate).getTime());
      console.log("endDate: ", new Date(this.endDate).getTime());
    },
    mintType1() {},
    initialize() {
      this.nfts = [
        {
          tokenAddress: "0xbd6581FBDc3d3f42B44A1f1416ee5c2a5B7b85f6",
          id: Math.round(Math.random() * 1000),
          nftType: Math.floor(Math.random() * 2) + 1,
          duration: Math.floor(
            new Date(new Date().setDate(new Date().getDate() + 5)).getTime() /
              1000
          ),
          value: Math.round(Math.random() * 10000),
        },
        {
          tokenAddress: "0xbd6581FBDc3d3f42B44A1f1416ee5c2a5B7b85f6",
          id: Math.round(Math.random() * 1000),
          nftType: Math.floor(Math.random() * 2) + 1,
          duration: 0,
          value: Math.round(Math.random() * 10000),
        },
      ];
    },
  },
};
</script>