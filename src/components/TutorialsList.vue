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
          v-for="(tutorial, index) in tutorials"
          :key="index"
          @click="setActiveTutorial(tutorial, index)"
        >
          {{ tutorial.title }}
          <button v-if="index == currentIndex" class="btn btn-sm btn-danger float-right" @click="removeTutorial(currentTutorial.id)">Delete</button>
        </li>
      </ul>
      <button class="mt-3 mr-3 btn btn-sm btn-primary" @click="showAddTutorials">
        Add
      </button>
      <button class="mt-3 btn btn-sm btn-danger" @click="removeAllTutorials" disabled>
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="showAdd">
        <AddTutorial></AddTutorial>
      </div>
      <div v-else-if="currentTutorial">
        <div v-if="editView">
          <EditTutorial :id="currentTutorial.id"></EditTutorial>
          <button class="mt-3 btn btn-sm btn-info" @click="toggleEditView">
              Hide Edit View
          </button>
        </div>
        <div v-else>
          <div>
            <label><strong>Title:</strong></label> {{ currentTutorial.title }}
          </div>
          <div>
            <label><strong>Description:</strong></label> {{ currentTutorial.description }}
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
import TutorialDataService from "../services/TutorialDataService";
import EditTutorial from "./Tutorial";
import AddTutorial from "./AddTutorial";

export default {
  name: "tutorials-list",
  components: {
    'EditTutorial': EditTutorial,
    'AddTutorial': AddTutorial
  },
  data() {
    return {
      tutorials: [],
      currentTutorial: null,
      currentIndex: -1,
      title: "",
      showAdd: false,
      editView: false
    };
  },
  methods: {
    toggleEditView() {
      this.editView = this.editView ? false : true;
    },
    showAddTutorials() {
      this.showAdd = true;
      this.currentTutorial = null;
      this.currentIndex = -1;
    },
    retrieveTutorials() {
      TutorialDataService.getAll()
        .then(response => {
          this.tutorials = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveTutorials();
      this.currentTutorial = null;
      this.currentIndex = -1;
    },

    setActiveTutorial(tutorial, index) {
      this.currentTutorial = tutorial;
      this.currentIndex = index;
      this.showAdd = false;
      this.editView = false;
    },

    removeAllTutorials() {
      if(window.confirm('Are you sure you want to delete all tutorials?')) {
        TutorialDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
      }
    },

    removeTutorial(id) {
      TutorialDataService.delete(id)
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    searchTitle() {
      TutorialDataService.findByTitle(this.title)
        .then(response => {
          this.tutorials = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveTutorials();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>