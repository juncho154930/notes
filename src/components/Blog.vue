<template>
  <div v-if="currentBlog" class="edit-form">
    <h4>Blog Edit</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title"
          v-model="currentBlog.title"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <textarea type="text" class="form-control" id="description"
          v-model="currentBlog.description"></textarea>
      </div>
    </form>

    <button type="submit" class="badge badge-primary mr-2"
      @click="updateBlog"
    >
      Update
    </button>

    <button class="badge badge-info mr-2"
      @click="duplicateBlog"
    >
      Duplicate
    </button>

    <button class="badge badge-danger mr-2"
      @click="deleteBlog"
    >
      Delete
    </button>

    <a v-if="this.isBlogsPage" :href="'/blog/' + currentBlog.id" type="submit" class="badge badge-warning" >
      Edit View
    </a>
    <p>{{ message }}</p>
  </div>
</template>

<script>
import BlogDataService from "../services/BlogDataService";

export default {
  name: "blog",
  data() {
    return {
      currentBlog: null,
      message: '',
      routeId: this.id,
      isBlogsPage: this.$route.name == "blog"
    };
  },
  props: {
    id: String,
    saveBlog: {
      type: Function,
      default() {

      }
    }
  },
  watch: { 
    id: function() {
      this.getBlog(this.id);
    }
  },
  methods: {
    duplicateBlog(){
      var data = {
        title: this.currentBlog.title,
        description: this.currentBlog.description
      };

      if(data.title) {
        BlogDataService.create(data)
          .then(response => {
            console.log(response.data);
            if(this.isBlogsPage){
              this.$parent.refreshList();
            } else {
              this.$router.push({ name: "blogs" });
            }
          })
          .catch(e => {
            console.log(e);
          });
      } else {
        alert('Needs a title');
      }
    },
    getBlog(id) {
      BlogDataService.get(id)
        .then(response => {
          this.currentBlog = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateBlog() {
      BlogDataService.update(this.currentBlog.id, this.currentBlog)
        .then(response => {
          console.log(response.data);
          this.message = 'The blog was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteBlog() {
      BlogDataService.delete(this.currentBlog.id)
      .then(response => {
        console.log(response.data);
        if(this.isBlogsPage){
          this.$parent.refreshList();
        } else {
          this.$router.push({ name: "blogs" });
        }
      })
      .catch(e => {
        console.log(e);
      });
    
    }
  },
  mounted() {
    this.routeId = this.id ? this.id : this.$route.params.id;
    this.message = '';
    this.getBlog(this.routeId);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>