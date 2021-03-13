<template>
  <v-row align="center" justify="center">
    <v-col cols="12">
      <v-hover v-slot="{ hover }" disabled>
        <v-card
          :elevation="hover ? 12 : 2"
          class="mx-auto"
          height="350"
          max-width="350"
        >
          <v-card-text class="my-4 text-center title">
            {{ user.user }}
          </v-card-text>
        </v-card>
      </v-hover>
    </v-col>
  </v-row>
</template>

<script>
import firebase from "firebase/app";

export default {
  name: "Home",
  data() {
    return {
      user: localStorage.getItem("user")
    };
  },
  created() {
    firebase;
    console.log(localStorage.getItem("user"));
  }
};
</script>
