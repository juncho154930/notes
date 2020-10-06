import Vue from "vue";
import Router from "vue-router";

import VueJwtDecode from "vue-jwt-decode";

Vue.use(Router);

const routes = [
  {
    path: "/",
    // alias: "/blog",
    name: "home",
    component: () => import("./components/Home"),
  },
  {
    path: "/bloghome",
    // alias: "/blog",
    name: "blohome",
    component: () => import("./components/BlogHome"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/blog",
    name: "blog",
    component: () => import("./components/BlogList"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/blog/:id",
    name: "blog-details",
    component: () => import("./components/Blog"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/add",
    name: "add",
    component: () => import("./components/AddBlog"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/py",
    name: "py",
    component: () => import("./components/Python"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/maple",
    name: "maple",
    component: () => import("./components/Boa"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/sundae",
    name: "sundae",
    component: () => import("./components/Sundae"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/board",
    name: "suggestionboard-home",
    component: () => import("./components/SuggestionBoardHome")
  },
  {
    path: "/board/:id",
    name: "suggestionboard",
    component: () => import("./components/SuggestionBoard")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./components/Login")
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./components/Register")
  },
  {
    path: "/*",
    component: () => import("./components/404")
  }

]

const router = new Router({
  mode: "history",
  routes
});
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem("jwt") == null) {
      next({
        path: "/Login"
      });
    } else {
      let token = localStorage.getItem("jwt");
      if(token) {
        let decoded = VueJwtDecode.decode(token);
        if (decoded.email != "jxc154930@gmail.com") {
          next({
            path: "/"
          });
        }
      }
      next();
    }
  } else {
    next();
  }
});
export default router;