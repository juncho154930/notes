<template>
	<div class="list">
		<h4>Blogs Home</h4>
		<ul class="list-group">
			<li class="list-group-item row d-flex"
				v-for="(blog, index) in blogs"
				:key="index" >
				<div class="col-md-6">{{ blog.title }}</div>
				<div class="col-md-6">{{ blog.description }}</div>
			</li>
		</ul>
	</div>
</template>
<script>
	import BlogDataService from "../services/BlogDataService";

	export default {
		name: "BlogsHome",
		data() {
			return {
				blogs: [],
			};
		},
		methods: {
			retrieveBlogs() {
				BlogDataService.getAll()
					.then(response => {
						this.blogs = response.data;
						console.log(response.data);
					})
					.catch(e => {
						console.log(e);
					});
			},
		},
		mounted() {
			this.retrieveBlogs();
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