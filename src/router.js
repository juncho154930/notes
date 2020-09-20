import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      // alias: "/blog",
      name: "home",
      component: () => import("./components/Home")
    },
    {
      path: "/bloghome",
      // alias: "/blog",
      name: "blohome",
      component: () => import("./components/BlogHome")
    },
    {
      path: "/blog",
      name: "blog",
      component: () => import("./components/BlogList")
    },
    {
      path: "/blog/:id",
      name: "blog-details",
      component: () => import("./components/Blog")
    },
    {
      path: "/add",
      name: "add",
      component: () => import("./components/AddBlog")
    },
    {
      path: "/quote",
      name: "quote",
      component: () => import("./components/QuoteForm")
    },
    {
      path: "/rentals/",
      name: "rentals",
      component: () => import("./components/Rentals")
    },
    {
      path: "/rentals/:slug",
      name: "rentals",
      component: () => import("./components/Rentals")
    },
    {
      path: "/py",
      name: "py",
      component: () => import("./components/Python")
    },
    {
      path: "/maple",
      name: "maple",
      component: () => import("./components/Boa")
    },
    {
      path: "/sundae",
      name: "sundae",
      component: () => import("./components/Sundae")
    },
    {
      path: "/suggestionboard",
      name: "suggestionboard-home",
      component: () => import("./components/SuggestionBoardHome")
    },
    {
      path: "/suggestionboard/:id",
      name: "suggestionboard",
      component: () => import("./components/SuggestionBoard")
    }

  ]
});