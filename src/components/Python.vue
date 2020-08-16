<template>
  <div>
    <div>
      <div>
        <!-- IMPORTANT PART! -->
        <form v-on:submit.prevent>
          <textarea
            v-model="sepalLength"
            label="Sepal Length"
            required
          ></textarea>
          <textarea
            v-model="sepalWidth"
            label="Sepal Width"
            required
          ></textarea>
          <textarea
            v-model="petalLength"
            label="Petal Length"
            required
          ></textarea>
          <textarea
            v-model="petalWidth"
            label="Petal Width"
            required
          ></textarea>
          <button @click="submit">submit</button>
          <button @click="clear">clear</button>
        </form>
        <br/>
        <div v-if="loading">Loading ...</div>
        <h1 v-else-if="predictedClass">Predicted Class is: {{ predictedClass }}</h1>
        <!-- END: IMPORTANT PART! -->
      </div>
      <div></div>
    </div>
  </div>
</template>
<script>
  import http from "../http-common";
export default {
    name: 'HelloWorld',
    data: () => ({
      sepalLength: '',
      sepalWidth: '',
      petalLength: '',
      petalWidth: '',
      predictedClass : '',
      loading: false
    }),
    methods: {
    async submit () {
      this.loading = true;
      
      let data = [this.sepalLength, this.sepalWidth, this.petalLength, this.petalWidth];
      await http.post('/pytest', { data })
      .then((response) => {
        console.log(response.data);
        this.predictedClass = response.data;
      }, (error) => {
        console.log(error);
      })

      this.loading = false;
    },
    clear () {
      this.sepalLength = ''
      this.sepalWidth = ''
      this.petalLength = ''
      this.petalWidth = ''
    }
  }
}
</script>