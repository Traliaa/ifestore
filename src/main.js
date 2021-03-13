import "./plugins/bootstrap-vue";
import App from "./App.vue";
import router from "./router";
import "./plugins/bootstrap-vue";
import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import "./registerServiceWorker";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/messaging";
import "firebase/storage";
import vuetify from "./plugins/vuetify";
import Vuelidate from "vuelidate";

const firebaseConfig = {
  apiKey: "AIzaSyD6vbcyvVDxt23pnVtr9jzWqm41-5daIF8",
  authDomain: "ifestore.firebaseapp.com",
  projectId: "ifestore",
  storageBucket: "ifestore.appspot.com",
  messagingSenderId: "530941987279",
  appId: "1:530941987279:web:ace9e77acb2496c69baaba",
  measurementId: "G-Q2F70SHFGF"
};
Vue.use(Vuelidate);
let app;
firebase.initializeApp(firebaseConfig);
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      firebase,
      vuetify,
      render: h => h(App)
    }).$mount("#app");
  }
});

//
//
// Vue.config.productionTip = false;
// Vue.use(Vuelidate);
// new Vue({
//   router,
//   firebase,
//   vuetify,
//   render: h => h(App)
// }).$mount("#app");
//
// firebase.initializeApp(firebaseConfig);
