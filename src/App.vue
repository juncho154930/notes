<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <a href="/" class="navbar-brand">MoneyNotes</a>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <a href="/tutorials" class="nav-link">Tutorials</a>
        </li>
        <li class="nav-item">
          <a href="/add" class="nav-link">Add</a>
        </li>
      </div>
    </nav>

    <div class="container mt-3 mb-3">
      <router-view v-if="auth"/>
      <div v-else>
        Auth: 
        <input type="text" class="form-control" placeholder="Pass" v-model="pass" />
          <button @click="checkAuth()">Submit</button>
      </div>
    </div>

    <footer class="pt-4 my-md-5 pt-md-5 border-top container">
        <div class="row">
          <div class="col-12 col-md">
            <small class="d-block mb-3 text-muted">© 2020</small>
          </div>
          <div class="col-6 col-md">
            <h5>Features</h5>
            <ul class="list-unstyled text-small">
              <li><a class="text-muted" href="#">Cool stuff</a></li>
              <li><a class="text-muted" href="#">Random feature</a></li>
              <li><a class="text-muted" href="#">Team feature</a></li>
              <li><a class="text-muted" href="#">Stuff for developers</a></li>
              <li><a class="text-muted" href="#">Another one</a></li>
              <li><a class="text-muted" href="#">Last time</a></li>
            </ul>
          </div>
          <div class="col-6 col-md">
            <h5>Resources</h5>
            <ul class="list-unstyled text-small">
              <li><a class="text-muted" href="#">Resource</a></li>
              <li><a class="text-muted" href="#">Resource name</a></li>
              <li><a class="text-muted" href="#">Another resource</a></li>
              <li><a class="text-muted" href="#">Final resource</a></li>
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
      if(this.pass == '1234') {
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
#app {
  
}
</style>