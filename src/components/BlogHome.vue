<template>
	<div class="blog-home blog-list">
		<h4>Blogs Home</h4>
		<ul class="list-group">
			<li class="list-group-item row d-flex"
				v-for="(blog, index) in blogs"
				:key="index" v-on:click="sendToUrl('/blog/' + blog.id)">
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
			},
			sendToUrl(url){ 
				window.location = url;
			}
		},
		mounted() {
			this.retrieveBlogs();
		}
	};
</script>
<style lang="scss">
.blog-home li {
	&:hover {
		cursor:pointer
	}
}
</style>