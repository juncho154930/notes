<template>
	<div class="list">
		<h4>Home</h4>

        <div>
        	Check out the <router-link to="/board">Suggestion Board</router-link>
        </div>
	</div>
</template>
<script>
export default {
	name: "Home"
};
	
</script>
<style scoped lang="scss">
a {
	color: #007bff;
}
</style>