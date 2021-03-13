<template lang="pug">
.content-wrapper
    section
      .container
        .auth
          .auth__banner
            span.h2 Login
          .auth__form
            span.h2 Login
            form(
              @submit.prevent="onSubmit"
            )
              .form-group.form-item(:class="{ 'errorInput': $v.email.$error }")
                input#exampleInputEmail1.form-control(
                  type="email"
                  placeholder="Email"
                  v-model="email"
                  :class="{ error: $v.email.$error }"
                  @change="$v.email.$touch"
                )
                .error(v-if="!$v.email.required") Field is required
                .error(v-if="!$v.email.email") email is required
              .form-group.form-item(:class="{ 'errorInput': $v.password.$error }")
                input#exampleInputPassword.form-control(
                  type="password"
                  placeholder="Password"
                  v-model="password"
                  :class="{ error: $v.password.$error }"
                  @change="$v.password.$touch"
                )
                .error(v-if="!$v.password.required") Password is required.
                .error(v-if="!$v.password.minLength")
                  | Password must have at least {{ $v.password.$params.minLength.min }} letters.

              .button-list
                button.btn.btn-secondary(
                  type="submit"
                  :class="{ 'button--disable': $v.$invalid }"
                ) Login
              .button-list.button-list__info
                p(v-if="submitStatus === 'OK'") Thanks for your submission!
                p(v-if="submitStatus === 'ERROR'") Please fill the form correctly.
                p(v-else) {{ submitStatus }}
              .button-list.button-list__info
                span Need Registration?
                  router-link(to="/registration")  Enter Here
            span {{ this.user}}
</template>
<script>
import { required, email, minLength } from "vuelidate/lib/validators";
import firebase from "firebase";
// const Cookie = process.client ? require("js-cookie") : undefined;

export default {
  // middleware: "notAuthenticated",
  data() {
    return {
      user: "",
      email: "",
      password: "",
      submitStatus: null,
      error: ""
    };
  },
  // Vuelidate
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    }
  },
  mounted() {
    if (localStorage.user) {
      this.user = localStorage.user;
    }
  },
  watch: {
    user(newUser) {
      localStorage.user = newUser;
    }
  },
  methods: {
    // onSubmit() {
    //   // Initialize Vuelodate
    //   this.$v.$touch();
    //   // Invalid
    //   if (this.$v.$invalid) {
    //     this.submitStatus = "ERROR";
    //     // Valid
    //   } else {
    //     // User
    //     const user = {
    //       email: this.email,
    //       password: this.password
    //     };
    //     this.$store
    //       .dispatch("login", user)
    //       .then(() => {
    //         this.submitStatus = "OK";
    //         console.log(this.$store.getters.user);
    //         const auth = {
    //           accessToken: this.$store.getters.user.cookie
    //         };
    //         if (auth.accessToken === {}) {
    //         }
    //         this.$store.commit("setAuth", auth); // mutating to store for client rendering
    //         Cookie.set("auth", auth); // saving token in cookie for server rendering
    //         this.$router.push("/Product");
    //       })
    //       .catch(err => {
    //         console.log(err.message);
    //         this.submitStatus = err.error;
    //       });
    //   }
    // },
    // postLogin() {
    //   setTimeout(() => {
    //     // we simulate the async request with timeout.
    //     const user = {
    //       email: "a.a.korastelev@gmail.com",
    //       password: "Koras1993"
    //     };
    //     this.$store
    //       .dispatch("login", user)
    //       .then(() => {
    //         this.submitStatus = "OK";
    //         console.log(this.$store.getters.user);
    //         const auth = {
    //           accessToken: this.$store.getters.user.cookie
    //         };
    //         if (auth.accessToken === {}) {
    //         }
    //         console.log("тут");
    //         this.$store.commit("setAuth", auth); // mutating to store for client rendering
    //         Cookie.set("auth", auth); // saving token in cookie for server rendering
    //         this.$router.push("/Product");
    //       })
    //       .catch(err => {
    //         console.log(err.message);
    //         this.submitStatus = err.error;
    //       });
    //   }, 1000);
    // },
    // postLoginLasr() {
    //   const user = {
    //     email: "a.a.korastelev@gmail.com",
    //     password: "Koras1993"
    //   };
    //   this.$store
    //     .dispatch("login", user)
    //     .then(() => {
    //       console.log();
    //       this.$store.commit("setAuth", this.$store.getters.user.cookie); // mutating to store for client rendering
    //       Cookie.set("auth", this.$store.getters.user.cookie); // saving token in cookie for server rendering
    //       this.submitStatus = "OK";
    //       this.$router.push("/Product");
    //     })
    //     .catch(err => {
    //       console.log(err.message);
    //       this.submitStatus = err.error;
    //     });
    // }
    async onSubmit() {
      this.user = await firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password);
      // localStorage.setItem("user", user);
      console.log(this.user);
      console.log(localStorage.getItem("user"));
    }
  }
};
</script>
<style lang="stylus" scoped>
.auth
  display flex
  justify-content space-between
  flex-wrap wrap
.auth__banner,
.auth__form
  width 50%
  @media screen and (max-width: 768px)
    width 100%
    margin-bottom 30px
    &:last-child
      margin-bottom 0
.auth__form
  max-width 400px
.form-item
  .error
    display none
    margin-bottom 8px
    font-size 13.4px
    color #fc5c65
  &.errorInput
    .error
      display block
input
  &.error
    border-color #fc5c65
    animation shake .3s
.buttons-list
  text-align right
  margin-bottom 20px
  &.buttons-list--info
    text-align center
    &:last-child
      margin-bottom 0
a
  color #444ce0
</style>
