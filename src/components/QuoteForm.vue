<template>
  <!-- <form class="columns" v-on:submit.prevent="console.log(form)"> -->
  <form class="columns" v-on:submit.prevent>
    <div class="column is-two-thirds">
      <section class="section">
        <h1 class="title">Advance AC Rentals</h1>
        <p class="subtitle">
          Find rental Ice machines with <strong>Advance AC</strong>!
          <br>
          Request a Quote:
        </p>
        <hr>      
        Answer the following questions and receive competing quotes.
        <!-- form starts here -->
        <section class="form">
          <div class="field">
            <label><strong>Where do you need service?</strong></label>
            <div class="control">
              <label class="radio">
                <input v-model="form.service" type="radio" value="Office">
                Office
              </label>
              <label class="radio">
                <input v-model="form.service" type="radio" value="Industrial">
                Industrial
              </label>
              <label class="radio">
                <input v-model="form.service" type="radio" value="Medical">
                Medical
              </label>
              <label class="radio">
                <input v-model="form.service" type="radio" value="Retail">
                Retail
              </label>
              <label class="radio">
                <input v-model="form.service" type="radio" value="Restaurant">
                Restaurant
              </label>
              <label class="radio">
                <input v-model="form.service" type="radio" value="Other">
                Other
              </label>
            </div>
          </div>
          <div class="field">
            <label><strong>How many people per day do you serve?</strong></label>
            <div class="control">
              <label class="radio">
                <input v-model="form.people_serve" type="radio" value=">20">
                Less than 20
              </label>
              <label class="radio">
                <input v-model="form.people_serve" type="radio" value="20-49">
                20 - 49
              </label>
              <label class="radio">
                <input v-model="form.people_serve" type="radio" value="50-100">
                50 - 10
              </label>
              <label class="radio">
                <input v-model="form.people_serve" type="radio" value=">100">
                More than 100
              </label>
            </div>
          </div>
          <div class="field">
            <label class="label">Zip / Postal Code</label>
            <div class="control">
              <input v-model="form.zip" class="input" type="text" placeholder="Zip/Postal code">
            </div>
          </div>
          <div class="field">
            <label class="label">Email</label>
            <div class="control">
              <input v-model="form.email" class="input" type="text" placeholder="Email">
            </div>
          </div>
          <div class="field">
            <label class="label">First Name </label>
            <div class="control">
              <input v-model="form.first_name" class="input" type="text" placeholder="First Name">
            </div>
            <label class="label">Last Name </label>
            <div class="control">
              <input v-model="form.last_name" class="input" type="text" placeholder="Last Name">
            </div>
            <label class="label">Company</label>
            <div class="control">
              <input v-model="form.company" class="input" type="text" placeholder="Company">
            </div>
            <label class="label">Phone</label>
            <div class="control">
              <input v-model="form.phone" class="input" type="text" placeholder="Phone">
            </div>
          </div>
          <div class="field">
            <label class="label">Message</label>
            <div class="control">
              <textarea class="textarea" placeholder="Additional Message" v-model="form.message"></textarea>
            </div>
          </div>
        </section>
        <div class="box">
          <ul>          
            <!-- loop through all the `form` properties and show their values -->
            <li v-for="(item, k) in form" :key="item.id">
              <strong>{{ k }}:</strong> {{ item }}
            </li>
          </ul>
        </div>
      </section>
    </div>
    <div class="field is-grouped">
      <div class="control">
        <button class="button is-primary">Submit</button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "QuoteForm",
  data() {
    return {
      form : {
        service: '',
        people_serve: '',
        zip: '',
        email: '',
        first_name: '',
        last_name: '',
        company: '',
        phone: '',
        message: '',        
      }
    }
  },
  methods: {
    
  },
  mounted() {
    
  }
};
</script>

<style lang="scss">
.control {
  display: flex;
  flex-direction: column;
}

</style>