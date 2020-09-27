<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-6 offset-lg-3 col-sm-10 offset-sm-1">
        <form
          class="text-center border border-primary p-5"
          style="margin-top:70px;height:auto;padding-top:100px !important;"
          @submit.prevent="loginUser"
        >
        Email:
          <input
            type="text"
            id="email"
            class="form-control mb-5"
            placeholder="Email"
            v-model="login.email"
          />
          Password:
          <!-- Password -->
          <input
            type="password"
            id="password"
            class="form-control mb-5"
            placeholder="Password"
            v-model="login.password"
          />
          <p>
            Dont have an account??<router-link to="/register"
              >click here</router-link
            >
          </p>
          <!-- Sign in button -->
          <center>
            <button class="btn btn-primary btn-block w-75 my-4" type="submit">
              Sign in
            </button>
          </center>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import UserDataService from "../services/UserDataService";

export default {
  name: "Login",
  data() {
    return {
      login: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    async loginUser() {
      try {
        UserDataService.login(this.login)
          .then(response => {
            let token = response.data.token;
            localStorage.setItem("jwt", token);
            if (token) {
              console.log("Success", "Login Successful", "success");
              this.$router.push("/");
            }
          })
          .catch(e => {
            console.log(e);
          });
      } catch (err) {
        console.log("Error", "Something Went Wrong With Login", "error");
        console.log(err.response);
      }
    }
  }
};
</script>