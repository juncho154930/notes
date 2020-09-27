<template>
	<div class="list">
		<h4>Home</h4>

        <SuggestionBoardHome></SuggestionBoardHome>
	</div>
</template>
<script>
import SuggestionBoardHome from "./SuggestionBoardHome";

export default {
	name: "Home",
	components: {
		'SuggestionBoardHome': SuggestionBoardHome
	}
};
	
</script>
<style scoped lang="scss">
</style>