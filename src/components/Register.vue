<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-6 offset-lg-3 col-sm-10 offset-sm-1">
        <form
          class="text-center border border-primary p-5"
          style="margin-top:70px;height:auto;padding-top:100px !important;"
          @submit.prevent="registerUser"
        >
          <input
            type="password"
            id="secretpass"
            class="form-control mb-5"
            placeholder="Secret Pass"
            v-model="secretpass"
            required
          />
          <input
            type="text"
            id="name"
            class="form-control mb-5"
            placeholder="Name"
            v-model="register.name"
            required
          />
          <input
            type="email"
            id="email"
            class="form-control mb-5"
            placeholder="Email"
            v-model="register.email"
            required
          />
          <!-- Password -->
          <input
            type="password"
            id="password"
            class="form-control mb-5"
            placeholder="Password"
            v-model="register.password"
          />
          <p>
            Already have an account??<router-link to="/"
              >click here</router-link
            >
            <!-- Sign in button -->
            <center>
              <button class="btn btn-primary btn-block w-75 my-4" type="submit">
                Sign in
              </button>
            </center>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import UserDataService from "../services/UserDataService";

export default {
  name: "Regsiter",
  data() {
    return {
      secretpass: "",
      register: {
        name: "",
        email: "",
        password: "",
        data: {}
      }
    };
  },
  methods: {
    async registerUser() {
      if(this.secretpass == "1324") {


        try {
          UserDataService.register(this.register)
            .then(response => {
              let token = response.data.token;
              if (token) {
                localStorage.setItem("jwt", token);
                this.$router.push("/");
                console.log("Success", "Registration Was successful", "success");
              } else {
                console.log("Error", "Something Went Wrong With Regsiter", "error");
              }
            })
            .catch(e => {
              console.log(e);
            });

        } catch (err) {
          let error = err.response;
          if (error.status == 409) {
            console.log("Error", error.data.message, "error");
          } else {
            console.log("Error", error.data.err.message, "error");
          }
        }


      } else {
        alert('Need secret pass');
      }
      
    }
  }
};
</script>