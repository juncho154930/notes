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
        <h1 v-if="predictedClass">Predicted Class is: {{ predictedClass }}</h1>
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
      predictedClass : ''
    }),
    methods: {
    async submit () {
      // axios.post('http://127.0.0.1:5000/predict', {
      //   sepal_length: this.sepalLength,
      //   sepal_width: this.sepalWidth,
      //   petal_length: this.petalLength,
      //   petal_width: this.petalWidth
      // })
      // .then((response) => {
      //   this.predictedClass = response.data.class
      // })
      let data = [this.sepalLength, this.sepalWidth, this.petalLength, this.petalWidth];
      await http.post('/pytest', { data })
      .then((response) => {
        console.log(response.data);
        this.predictedClass = response.data;
      }, (error) => {
        console.log(error);
      });
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