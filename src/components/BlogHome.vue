<template>
	<div class="list">
		<h4>Blogs Home</h4>
		<ul class="list-group">
			<li class="list-group-item row d-flex"
				v-for="(blog, index) in blogs"
				:key="index" >
				<div class="col-md-6 pre-text" v-html="blog.title"></div>
				<div class="col-md-6 pre-text" v-html="urlify(blog.description)"></div>
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
				blogs: []
			};
		},
		methods: {
			retrieveBlogs() {
				BlogDataService.getAll()
					.then(response => {
						this.blogs = response.data;
						
					})
					.catch(e => {
						console.log(e);
					});
			},
			urlify(text) {
				var urlRegex = /\[(https?:\/\/[^\s]+)\]/g;
				return text.replace(urlRegex, '<a href="$1" target="_blank">$1</a>')
			}
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