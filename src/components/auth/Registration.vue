<template lang="pug">
.content-wrapper
        section
            .container
                .auth
                    .auth__banner
                        span.h2 Registaration
                    .auth__form
                        span.h2 Registaration
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

                            .form-group.form-item(:class="{ 'errorInput': $v.repeatPassword.$error }")
                                input#exampleInputPassword1.form-control(
                                    type="password"
                                    placeholder="Repeat your password"
                                    v-model="repeatPassword"
                                    :class="{ error: $v.repeatPassword.$error }"
                                    @change="$v.repeatPassword.$touch"
                                )
                                .error(v-if="!$v.repeatPassword.sameAsPassword") Passwords must be identical.
                            .button-list
                                button.btn.btn-secondary(
                                    type="submit"
                                )
                                    span Registration
                            .button-list.button-list__info
                                p.typo__p(v-if="submitStatus === 'OK'") Thanks for your submission!
                                p.typo__p(v-if="submitStatus === 'ERROR'") Please fill the form correctly.
                                p.typo__p(v-if="submitStatus === 'PENDING'") Sending...
                                p.typo__p(v-else) {{ submitStatus }}
                            .button-list.button-list__info
                                span Do you have account?
                                    router-link(to="/login")  Enter Here

</template>

<script>
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
import firebase from "firebase/app";
// const Cookie = process.client ? require("js-cookie") : undefined;
export default {
  data() {
    return {
      email: "",
      password: "",
      repeatPassword: "",
      submitStatus: null,
      error: ""
    };
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(4)
    },
    repeatPassword: {
      sameAsPassword: sameAs("password")
    }
  },
  methods: {
    // onSubmit() {
    //   this.$v.$touch();
    //   if (this.$v.$invalid) {
    //     this.submitStatus = "ERROR";
    //   } else {
    //     // do your submit logic here
    //     const user = {
    //       email: this.email,
    //       password: this.password
    //     };
    //     this.$store
    //       .dispatch("register", user)
    //       .then(() => {
    //         console.log("Register!");
    //         const auth = {
    //           accessToken: this.$store.getters.user.cookie
    //         };
    //         if (auth.accessToken === {}) {
    //           console.log("No Register!");
    //         }
    //         this.submitStatus = "OK";
    //         console.log(this.$store.getters.user);
    //         this.$store.commit("setAuth", auth); // mutating to store for client rendering
    //         Cookie.set("auth", auth); // saving token in cookie for server rendering
    //         this.$router.push("/Product");
    //       })
    //       .catch(err => {
    //         console.log(err.message);
    //         this.submitStatus = err.error;
    //       });
    //   }
    // }

    async onSubmit() {
      const user = await firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password);
      localStorage.setItem("user", user);
      console.log(user);
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
