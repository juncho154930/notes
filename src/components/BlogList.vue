<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input v-on:input="searchTitle" type="text" class="form-control" placeholder="Search by title"
          v-model="title"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchTitle"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>List</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(blog, index) in blogs"
          :key="index"
          @click="setActiveBlog(blog, index)"
        >
          {{ blog.title }}
          <button v-if="index == currentIndex" class="btn btn-sm btn-danger float-right" @click="removeBlog(currentBlog.id)">Delete</button>
        </li>
      </ul>
      <button class="mt-3 mr-3 btn btn-sm btn-primary" @click="showAddBlogs">
        Add
      </button>
      <button class="mt-3 btn btn-sm btn-danger" @click="removeAllBlogs" disabled>
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="showAdd">
        <AddBlog></AddBlog>
      </div>
      <div v-else-if="currentBlog">
        <div v-if="editView">
          <EditBlog :id="currentBlog.id"></EditBlog>
          <button class="mt-3 btn btn-sm btn-info" @click="toggleEditView">
              Hide Edit View
          </button>
        </div>
        <div v-else>
          <div>
            <label><strong>Title:</strong></label><p v-html="currentBlog.title"></p>
          </div>
          <div class="pre-text">
            <label><strong>Description:</strong></label><p v-html="urlify(currentBlog.description)"></p>
          </div>
          <button class="mt-3 btn btn-sm btn-info" @click="toggleEditView">
            Show Edit View
          </button>
        </div>
      </div>
      <div v-else>
        <br />
        <p>Please click on a list...</p>
      </div>
    </div>
  </div>
</template>

<script>
import BlogDataService from "../services/BlogDataService";
import EditBlog from "./Blog";
import AddBlog from "./AddBlog";

export default {
  name: "blogs-list",
  components: {
    'EditBlog': EditBlog,
    'AddBlog': AddBlog
  },
  data() {
    return {
      blogs: [],
      currentBlog: null,
      currentIndex: -1,
      title: "",
      showAdd: false,
      editView: false
    };
  },
  methods: {
    urlify(text) {
      var urlRegex = /\[(https?:\/\/[^\s]+)\]/g;
      return text.replace(urlRegex, '<a href="$1" target="_blank">$1</a>')
    },
    toggleEditView() {
      this.editView = this.editView ? false : true;
    },
    showAddBlogs() {
      this.showAdd = true;
      this.currentBlog = null;
      this.currentIndex = -1;
    },
    retrieveBlogs() {
      BlogDataService.getAll()
        .then(response => {
          this.blogs = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveBlogs();
      this.currentBlog = null;
      this.currentIndex = -1;
    },

    setActiveBlog(blog, index) {
      this.currentBlog = blog;
      this.currentIndex = index;
      this.showAdd = false;
      this.editView = false;
    },

    removeAllBlogs() {
      if(window.confirm('Are you sure you want to delete all blogs?')) {
        BlogDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
      }
    },

    removeBlog(id) {
      BlogDataService.delete(id)
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    searchTitle() {
      BlogDataService.findByTitle(this.title)
        .then(response => {
          this.blogs = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveBlogs();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 90vw;
  margin: auto;
}
</style>