<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="blog.title"
          name="title"
        />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <textarea
          class="form-control"
          id="description"
          required
          v-model="blog.description"
          name="description"
        ></textarea>
      </div>

      <button @click="saveBlog" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success d-block" @click="newBlog">Add More</button>
      <a v-if="!isBlogsPage" href="/blog" class="btn btn-success mt-3">Blogs Page</a>
    </div>
  </div>
</template>

<script>
import BlogDataService from "../services/BlogDataService";

export default {
  name: "add-blog",
  data() {
    return {
      blog: {
        id: null,
        title: "",
        description: "",
        published: true
      },
      submitted: false,
      isBlogsPage: this.$route.name == "blog"
    };
  },
  methods: {
    saveBlog() {
      if(!this.submitted) {
        var data = {
          title: this.blog.title,
          description: this.blog.description,
          published: this.blog.published,
          timestamp: BlogDataService.getNow()
        };

        if(data.title) {
          BlogDataService.create(data)
            .then(response => {
              this.blog.id = response.data.id;
              console.log(response.data);
              this.submitted = true;
              if(this.isBlogsPage){
                this.$parent.refreshList();
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
    
    newBlog() {
      this.submitted = false;
      this.blog = {};
    }
  }
};
</script>

<style>
.submit-form {
  margin: auto;
}
</style>