import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import vuetify from "./plugins/vuetify";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

Vue.config.productionTip = false;
const firebaseConfig = {
  apiKey: "AIzaSyD6vbcyvVDxt23pnVtr9jzWqm41-5daIF8",
  authDomain: "ifestore.firebaseapp.com",
  projectId: "ifestore",
  storageBucket: "ifestore.appspot.com",
  messagingSenderId: "530941987279",
  appId: "1:530941987279:web:ace9e77acb2496c69baaba",
  measurementId: "G-Q2F70SHFGF"
};

let app;
firebase.initializeApp(firebaseConfig);
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      vuetify,
      render: h => h(App)
    }).$mount("#app");
  }
});
