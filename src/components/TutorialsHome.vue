<template>
	<div class="list">
		<h4>Tutorials Home</h4>
		<ul class="list-group">
			<li class="list-group-item row d-flex"
				v-for="(tutorial, index) in tutorials"
				:key="index" >
				<div class="col-md-6">{{ tutorial.title }}</div>
				<div class="col-md-6">{{ tutorial.description }}</div>
			</li>
		</ul>
	</div>
</template>
<script>
	import TutorialDataService from "../services/TutorialDataService";

	export default {
		name: "TutorialsHome",
		data() {
			return {
				tutorials: [],
			};
		},
		methods: {
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