<template>
	<div class="list">
		<h4>Home</h4>

        <div>
        	<br>
        	Check out the <router-link to="/board">Suggestion Board</router-link>
        </div>
        <div>
        	Make suggestions for the site <router-link to="/board/5f7c31f4e095be981b43f678">Public Site Update Suggestions Board</router-link>
        </div>
        <div>
        	<br>
        	<p>Goal of this site is to allow for people to make quick suggestions for topics such as finding new ideas or improving on projects</p>
        	<p>I'm open to any suggestions, but try to make it as describe the issue/wanted feature as best as possible.</p>
        	<p>If you can't login/register it's because it's only for a few people to test first.</p>
        	<br>
        	<p>Trying to make a MVP (Minimum Viable Product) before I make this Web App public so I can start testing with real users.</p>
        </div>
        <div>
        	<br><br><br><br>
			Ping from https://cron-job.org/
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