<template>
	<div class="list">
		<h4>Home</h4>

        <SuggestionBoard></SuggestionBoard>
	</div>
</template>
<script>
import SuggestionBoard from "./SuggestionBoard";

export default {
  name: "Home",
	components: {
    'SuggestionBoard': SuggestionBoard
  }

}
	
</script>
<style>
	
</style>