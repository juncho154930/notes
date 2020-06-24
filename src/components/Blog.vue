<template>
  <div v-if="currentBlog" class="edit-form">
    <h4>Blog Edit</h4>
    <div v-if="editView">
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
      <br>
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
    <a v-if="this.isBlogsPage" :href="'/blog/' + currentBlog.id" type="submit" class="mt-3 btn btn-sm btn-warning" >
      Go To Blog
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
      isBlogsPage: this.$route.name == "blog",
      editView: false
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
    urlify(text) {
      var urlRegex = /\[(https?:\/\/[^\s]+)\]/g;
      return text.replace(urlRegex, '<a href="$1" target="_blank">$1</a>')
    },
    toggleEditView() {
      this.editView = this.editView ? false : true;
    },
    duplicateBlog(){
      if(window.confirm('Are you sure you want to duplicate this blog?')) {
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
          if(this.isBlogsPage){
            this.$parent.refreshList();
          }
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteBlog() {
      if(window.confirm('Are you sure you want to delete this blog?')) {
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
    }
  },
  mounted() {
    this.routeId = this.id ? this.id : this.$route.params.id;
    this.message = '';
    this.getBlog(this.routeId);
  }
};
</script>

<style lang="scss">
.edit-form {
  margin: auto;
  textarea {
    min-height: 300px;
  }
}
</style>