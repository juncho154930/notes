<template>
	<div class="suggestionBoardHome">
		<h3>Welcome to Suggestion Board</h3>
		<h4>Create suggestions for your next thing</h4>

		<button @click="toggleAdmin">Toggle Admin</button>
		<div v-if="loading">
			Loading...
		</div>
		<div class="board" v-else>			
			<div class="topic-container">
				<br>
				<div class="new-topic">
					<input placeholder="Add new Topic" v-model="newTopic" />
					<div>
						<input type="checkbox" id="1" name="1">
					  	<label for="1">IP Duplication checking</label>
					</div>
					<div>
						<input type="checkbox" id="2" name="2">
					  	<label for="2">Cache Duplication checking</label>
					</div>
					<div>
						<input type="checkbox" id="3" name="3">
						<label for="3">No Dup checking</label>
					</div>
					<div>
						<input type="checkbox" id="4" name="4">
					  	<label for="4">Captcha required</label>
					</div>
					<button @click="addTopic()">Add Topic</button>
				</div>

				<div class="topics">
					<div v-for="topic in data" :key="topic.id" class="topic">
						<h3 v-html="topic.Topic"></h3><div v-html="'Asked on: ' + topic.createdAt"></div>
						<h4>Top 3 suggestions: </h4>
						<div class="suggestions__list">
							<div v-for="suggestion in topic.Suggestions.slice(0,3)" :key="suggestion.Suggestion" :style="{ order: suggestion.Vote.No - suggestion.Vote.Yes}">
								<div class="vote">
									<strong><div v-html="suggestion.Suggestion"></div></strong> - -
									Vote: <span v-html="suggestion.Vote.Yes - suggestion.Vote.No"></span>
								</div>
							</div>
						</div>
						
						<button @click="chooseTopic(topic)">Choose This Topic</button>
						<a :href="'/suggestionboard/' + topic.id">Share Link</a>
						<button @click="deleteTopic(topic.id)" v-if="isAdmin">Delete</button>
					</div>
				</div>
			</div>
			<div v-if="currentTopic.Topic">
				<SuggestionBoard :id="currentTopic.id"></SuggestionBoard>
			</div>
			
		</div>
	</div>
</template>
<script>
	import SuggestionDataService from "../services/SuggestionDataService";
	import SuggestionBoard from "./SuggestionBoard";

	export default {
		name: "SuggestionBoardHome",
		components: {
			'SuggestionBoard': SuggestionBoard
		},
		data() {
			return {
				loading: true,
				isAdmin: false,
				data: [],
				newTopic: '',
				newSuggestion: '',
				currentTopic: {},
			};
		},
		methods: {
			toggleAdmin() {
				if(this.isAdmin) {
					this.isAdmin = false;
				} else {
					this.isAdmin = true;
				}
			},
			retrieveTopic () {
				SuggestionDataService.getAll()
					.then(response => {
						if(response.data) {
							this.data = response.data;
						} else {
							this.createSuggestionBoardDB();
						}

						this.loading = false;
					})
					.catch(e => {
						console.log(e);
					});
				
			},
			createSuggestionBoardDB () {
		        if(this.data) {
		          SuggestionDataService.create(this.data)
		            .then(() => {
		              this.retrieveTopic();
		            })
		            .catch(e => {
		              console.log(e);
		            });
		        } else {
		          alert('Needs Data');
		        }
		    },
			addTopic() {
				if(this.newTopic) {
					let topicJSON = { 
						"topic": this.newTopic,
						"suggestions": [],
						"timestamp": new Date()
					};

					SuggestionDataService.create(topicJSON)
						.then(() => {
							this.retrieveTopic();
							this.newTopic = "";
						})
						.catch(e => {
							console.log(e);
						});
				} else {
					alert('Please fill in topic input field')
				}
				
			},
			deleteTopic(id) {
				SuggestionDataService.delete(id)
					.then(() => {
						this.retrieveTopic();
					})
					.catch(e => {
						console.log(e);
					});
			},
			chooseTopic(topic) {
				this.currentTopic = topic;
			}
		    
		},
		mounted() {
			this.retrieveTopic();
		}
	};
</script>
<style scoped lang="scss">

* {
	font-family: 'Courier';	
}
h3 {
	color: #c83232;
}

h4 {
	margin-bottom: 20px;
}

p {
	font-size: 18px;
	padding: 10px 0;
}
li {
	margin-left: 30px;
}
.suggestionBoardHome {
	position: relative;
	padding: 20px 10px 20px 50px;
	min-height: 400px;
	background-color: #ffd756;
	color: rgb(33, 37, 41);
	&::before {
		content: '';
		position: absolute;
		pointer-events: none;
		top: 0;
		left: 25px;
		bottom: 0;
		width: 8px;
		border: 2px solid #ca302c;
		border-width: 0 2px;
		z-index: 2;
	}
}
.board {
	display: flex;
}
.topic-container {
	flex: 1 1 50%;
	input:not([type=checkbox]) {
		width: 100%;
		border: 1px solid black;
		padding: 4px 10px;
	}
	textarea {
		display: block;
		resize: both;
		padding: 5px 10px;
		width: 100%;
		max-width: 100%;
		border: 0;
		color: #000;
	}
	button {
		padding: 2px 6px;
		margin: 6px 0;
		border-radius: 6px;
		border: 1px solid black;
		background-color: #333;
		color: #fff;
	}
	.new-topic {
		padding: 10px;
		margin-bottom: 10px;
		background-color: #ccc;
		border: 1px solid #000;
		border-radius: 6px;

	}
	.topics {
		padding: 10px;
		border: 1px solid #000;
		background-color: #b481ae;
		border-radius: 6px;
		.topic {
			padding: 10px;
			margin-bottom: 10px;
			border: 1px solid #000;
			background-color: #f49d02;
			border-radius: 6px;
			&:last-child {
				margin-bottom: 0px;
			}
			a {
				padding: 2px 4px;
				background-color: #eee;
				border: 1px solid black;
				border-radius: 5px;
			}
		}
	}
}
</style>