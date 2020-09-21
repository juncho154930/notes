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
            <a class="dropdown-item" href="/blog">Blog</a>
            <a class="dropdown-item" href="/maple">Maple</a>
            <a class="dropdown-item" href="/sundae">Sundae</a>
          </div>
        </div>
        <a href="/suggestionboard" class="nav-link">Suggestion Board</a>
        <!-- <a href="/quote" class="nav-link">Quote</a>
        <a href="/py" class="nav-link">python</a> -->
      </div>
      <div style="color:#fff">Call 1-800-XXX-XXXX</div>
    </nav>

    <div class="container mt-3 mb-3">
      <router-view v-if="auth"/>
      <div v-else>
        Auth: 
        <input type="password" class="form-control" placeholder="Pass" v-model="pass" />
          <button @click="checkAuth()">Submit</button>
      </div>
    </div>

    <footer class="pt-4 my-md-5 pt-md-5 border-top container">
        <div class="row">
          <div class="col-12 col-md">
            <small class="d-block mb-3 text-muted">© 2020 JC Notes | Dev</small>
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
export default {
  name: 'app',
  data(){
    return{
      auth: false,
      pass: ""
    }
  },
  methods: {
    checkAuth() {
      if(this.pass == '1324') {
        this.auth = true;
        let d = new Date();                
        d.setTime(d.getTime() + (1*24*60*60*1000));
        let expires = "expires="+ d.toUTCString();
        document.cookie = "Auth=true;" + expires + ";";
      } else {
        alert('Invalid Pass');
      }
    },
    getCookie(name) {
      var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
      if (match) return match[2];
    }
  },
  created(){
    if (this.getCookie('Auth')) {
      this.auth = true;
    }
  }
}
</script>
<style lang="scss">
body {
  // background-image: url('~@/assets/img/site-background.jpg');
  background-color: #507DBC;
  background-attachment: fixed;
  background-size: cover;
}

.container {
  padding: 2em;
  font-size: 18px;
  background-color: #555;
  color: #d6d6d6;
}
#app {
  
}
</style>