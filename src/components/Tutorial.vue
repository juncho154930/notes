<template>
  <div v-if="currentTutorial" class="edit-form">
    <h4>Tutorial Edit</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title"
          v-model="currentTutorial.title"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <textarea type="text" class="form-control" id="description"
          v-model="currentTutorial.description"></textarea>
      </div>
    </form>

    <button type="submit" class="badge badge-primary mr-2"
      @click="updateTutorial"
    >
      Update
    </button>

    <button class="badge badge-info mr-2"
      @click="duplicateTutorial"
    >
      Duplicate
    </button>

    <button class="badge badge-danger mr-2"
      @click="deleteTutorial"
    >
      Delete
    </button>

    <a v-if="this.isTutorialsPage" :href="'/tutorials/' + currentTutorial.id" type="submit" class="badge badge-warning" >
      Edit View
    </a>
    <p>{{ message }}</p>
  </div>
</template>

<script>
import TutorialDataService from "../services/TutorialDataService";

export default {
  name: "tutorial",
  data() {
    return {
      currentTutorial: null,
      message: '',
      routeId: this.id,
      isTutorialsPage: this.$route.name == "tutorials"
    };
  },
  props: {
    id: String,
    saveTutorial: {
      type: Function,
      default() {

      }
    }
  },
  watch: { 
    id: function() {
      this.getTutorial(this.id);
    }
  },
  methods: {
    duplicateTutorial(){
      var data = {
        title: this.currentTutorial.title,
        description: this.currentTutorial.description
      };

      if(data.title) {
        TutorialDataService.create(data)
          .then(response => {
            console.log(response.data);
            if(this.isTutorialsPage){
              this.$parent.refreshList();
            } else {
              this.$router.push({ name: "tutorials" });
            }
          })
          .catch(e => {
            console.log(e);
          });
      } else {
        alert('Needs a title');
      }
    },
    getTutorial(id) {
      TutorialDataService.get(id)
        .then(response => {
          this.currentTutorial = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateTutorial() {
      TutorialDataService.update(this.currentTutorial.id, this.currentTutorial)
        .then(response => {
          console.log(response.data);
          this.message = 'The tutorial was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteTutorial() {
      TutorialDataService.delete(this.currentTutorial.id)
      .then(response => {
        console.log(response.data);
        if(this.isTutorialsPage){
          this.$parent.refreshList();
        } else {
          this.$router.push({ name: "tutorials" });
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
    this.getTutorial(this.routeId);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>