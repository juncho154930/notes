<template>
  <section class="section">
    <h1 class="title" v-html="articleHead"></h1>
    <hr>      
    <div class="articleBody" v-html="articleBody"></div>
  </section>
</template>

<script>
export default {
  name: "rentals",
  data() {
    return {
      slug: this.$route.params.slug,
      articleHead: '',
      articleBody: ''
    }
  },
  methods: {
    
  },
  mounted() {
    if(this.slug == 'info') {
      this.articleHead = `Ice Machines For Rent`;
      this.articleBody = 
      `<p>Rent ice machines for restaurants, hotels, bars, and offices. <strong>LOW MONTHLY RATES</strong>. <a href="/rentals/cost">Cost</a> is a big concern for many people who require ice vending machines. From small to large and everything in between, costs vary widely from model to model. We strongly recommend letting us know what you are looking for and we can show you pricing options between buying and renting. Of course, this will depend on your industry and capacity needs.</p>
      <p>Do you need to serve a few people a day or 150 or more? Are you in one of the following industries: manufacturing and industrial, medical facilities, offices, schools/colleges, retail locations, hotels/motels/inns/resorts, restaurants/bars, and gyms/health clubs/spas?</p>
      <p>We have the perfect match for you when it comes to finding ice machines for rent. Our high-quality machines are designed to fit your needs cost effectively.</p>
      <p>To learn more, follow the link below and fill out our request form to receive competing estimates. Hint: it’s much more affordable than you may think!</p>
      <a class="btn btn-primary" href="/quote">Get a Quote</a>
      <h2>Ice Machines Rentals – Low Monthly Rates</h2>
      <p>Ice machines for rent have never been more affordable for commercial businesses.</p>
      <p>Renting an ice machine can pose money-saving measures to businesses looking to save cash or simply try out a new model before investing in it. Our ice machine rentals can serve from one person per day to over 150, catering to such industries as manufacturing and industrial, medical facilities, offices, schools/colleges, retail locations, hotels/motels/inns/resorts, restaurants/bars, and gyms/health clubs/spas.</p>
      <p>Rent machines for long term or short term needs for an event such as a fair, festival or concert. You may be concerned with price. Worry no more. When you get in touch with us here via this handy form, you will see just how affordable an ice machine rental can be for your business.</p>
      <h2>Ice Maker Rental Solutions</h2>
      <p>Any type of ice maker your business needs – you’ll find it here, for less.</p>
      <ul>
        <li>Ice Machine rentals for restaurants & bars</li>
        <li>Rent Ice Makers for Office</li>
        <li>Ice Makers For Motels and Hotels</li>
      </ul>
      <p>Our options are easy, flexible, and inexpensive for any entrepreneur. Consider rentals over purchases to save money, with a rent to own option later on. Want to shop around? Click below and we will send you competing quotes from the best vendors we recommend for your needs, showing prices for both rental options and affordable purchases.</p>
      <a href="/quote">Compare Quotes on Ice Makers</a>`;
    } else if(this.slug == 'cost') {
      this.articleHead = `How Much Do Ice Machines Cost? Compare Ice Maker Prices`;
      this.articleBody = 
      `<p>Compare prices on ice machines for hotels, restaurants, convenient stores and more. Commercial ice makers cost between $1,800 – $3,900</p>
      <h2>Ice Machine Pricing Guide</h2>
      <ul>
        <li>How much do commercial ice machines cost?</li>
        <li>How do  prices compare with your other brands?</li>
        <li>Can I get an good Ice machine for cheap.</li>
        <li>Are there any other cost, like delivery, installation, etc.?</li>
        <li>How much do the best ice makers cost?</li>
      </ul>
      <h2>Pricing On All Types of Ice Makers</h2>
      <ul>
        <li>Ice Machines For Fountain Soda</li>
        <li>New & Used Ice Makers</li>
      </ul>
      <p>Find Ice Machines near you and enjoy quality products for cheaper prices. Get started now!</p>
      <a class="btn btn-primary" href="/quote">Get a Quote</a>`;
    } else {
      this.articleHead = `Ice Machines For Rent`;
      this.articleBody = 
      `<a class="btn btn-primary" href="/rentals/info">Info</a>
      <a class="btn btn-primary" href="/rentals/cost">Cost</a>
      <a class="btn btn-primary" href="/quote">Get a Quote</a>`;
    }
  }
};
</script>

<style lang="scss">

</style>
