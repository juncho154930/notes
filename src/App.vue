<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <a href="/" class="navbar-brand">JC Notes</a>
      <div class="navbar-nav mr-auto">
        <div class="dropdown show">
          <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Misc
          </a>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <div class="dropdown-item">
              <router-link to="/blog"
                >Blog</router-link
              >
            </div>
            <div class="dropdown-item">
              <router-link to="/Maple"
                >Maple</router-link
              >
            </div>
            <div class="dropdown-item">
              <router-link to="/Sundae"
                >Sundae</router-link
              >
            </div>
          </div>
        </div>
        <div class="dropdown-item">
          <router-link to="/board"
            >Board</router-link
          >
        </div>
        <!-- <a href="/quote" class="nav-link">Quote</a>
        <a href="/py" class="nav-link">python</a> -->
      </div>
      <div>
        <div v-if="user.name && user.email">{{ user.name }} | {{ user.email }} | <a @click="logUserOut">Logout</a></div>
        <div v-else>
          <router-link to="/Login"
            >Login</router-link
          >
          <router-link to="/Register"
            >Register</router-link
          >
        </div>
      </div>
    </nav>

    <div class="container mt-3 mb-3">
      <router-view />
    </div>

    <footer class="pt-4 my-md-5 pt-md-5 border-top container">
        <div class="row">
          <div class="col-12 col-md">
            <small class="d-block mb-3 text-muted">© 2020 JC Notes | Dev</small>
            NEED TO UPDATE ROUTER
          </div>
          <div class="col-6 col-md">
            <h5>Features</h5>
            <ul class="list-unstyled text-small">
              <li><a class="text-muted" href="#">Random feature</a></li>
              <li><a class="text-muted" href="#">Team feature</a></li>
              <li><a class="text-muted" href="#">Stuff for developers</a></li>
            </ul>
          </div>
          <div class="col-6 col-md">
            <h5>Resources</h5>
            <ul class="list-unstyled text-small">
              <li><a class="text-muted" href="#">Site Map</a></li>
              <li><a class="text-muted" href="#">About Us</a></li>
              <li><a class="text-muted" href="#">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
      </footer>
  </div>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode";

export default {
  name: 'app',
  data(){
    return{
      user: {}
    }
  },
  watch: {
    $route (to, from){
      if(from.path == "/Login" || from.path == "/Register") {
        this.getUserDetails();
      }
    }
  },
  methods: {
    getUserDetails() {
      let token = localStorage.getItem("jwt");
      if(token) {
        let decoded = VueJwtDecode.decode(token);
        this.user = decoded;
      }
    },
    logUserOut() {
      localStorage.removeItem("jwt");
      this.$router.go()
    }
  },
  created(){
    this.getUserDetails();
  }
}
</script>
<style lang="scss">
body {
  // background-image: url('~@/assets/img/site-background.jpg');
  background-color: #121212;
  background-attachment: fixed;
  background-size: cover;
}

.container {
  padding: 4px;
  border-radius: 5px;
  background-color: #484848;
  color: #ededed;
}
#app {
  a {
    &:hover {
      cursor: pointer;
    }
  }
}
</style>