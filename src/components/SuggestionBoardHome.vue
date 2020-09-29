<template>
	<div class="suggestionBoardHome">
		<h3>Welcome to Suggestion Board</h3>
		<h4>Create suggestions for your next thing</h4>
		<div>
			Site is up through https://cron-job.org/
		</div>
		<!-- <button @click="setAdmin" v-if="user.email">Set Admin</button> -->
		<div v-if="loading">
			Loading...
		</div>
		<div class="board" v-else>			
			<div class="topic-container">
				<div v-if="!user.email">Need to be logged in to add new Topic</div>
				<div v-else class="new-topic">
					<input placeholder="Add new Topic" v-model="newTopic" />
					<!-- <div>
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
					</div> -->
					<button @click="addTopic()">Add Topic</button>
				</div>
				<h2>Your Topics</h2>
				<div class="topics">
					<div v-for="topic in data" :key="topic.id" class="topic" >
						<div class="topic--title">
							<h3 v-html="topic.Topic" class="text--emphasize"></h3><div v-html="'Asked on: ' + new Date(topic.createdAt).toLocaleDateString()" class="text--faded"></div>
							<div v-html="timePassed(topic.createdAt)" ></div>
						</div>
						<div class="suggestions__list">
							<div v-for="suggestion in topic.Suggestions.slice(0,3)" :key="suggestion.Suggestion" :style="{ order: suggestion.Vote.No - suggestion.Vote.Yes}" :class="[suggestion.class]">
								<div class="vote">
									<strong><div v-html="suggestion.Suggestion" class="title"></div></strong> - -
									Vote: <span v-html="suggestion.Vote.Yes - suggestion.Vote.No"></span>
								</div>
							</div>
						</div>
						
						<button @click="chooseTopic(topic)">Choose This Topic</button>
						<a :href="'/board/' + topic.id">Share Link</a>
						<div v-if="isAdmin || ( topic.Meta && user.email == topic.Meta.CreatorEmail )">
							<button @click="deleteTopic(topic.id)">Delete</button>
						</div>
						
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
	import VueJwtDecode from "vue-jwt-decode";

	export default {
		name: "SuggestionBoardHome",
		components: {
			'SuggestionBoard': SuggestionBoard
		},
		data() {
			return {
				user: {},
				loading: true,
				isAdmin: false,
				data: [],
				newTopic: '',
				newSuggestion: '',
				currentTopic: {},
			};
		},
		watch: {
		},
		methods: {
			getUserDetails() {
		      let token = localStorage.getItem("jwt");
		      if(token) {
		        let decoded = VueJwtDecode.decode(token);
		        this.user = decoded;
		      }
		    },
			setAdmin() {
				this.isAdmin =  true;
			},
			retrieveAllTopic () {
				SuggestionDataService.getAll()
					.then(response => {
						if(response.data) {
							this.data = [];
							response.data.forEach((e) => {
								if(e.Meta && e.Meta.CreatorEmail == this.user.email) {
									this.data.push(e)
								}
							})
							
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
		              this.retrieveAllTopic();
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
						"meta": {
							"CreatorEmail": this.user.email
						},
						"suggestions": [],
						"timestamp": new Date()
					};

					SuggestionDataService.create(topicJSON)
						.then(() => {
							this.retrieveAllTopic();
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
				if(confirm("Delete Topic?")) {
					SuggestionDataService.delete(id)
						.then(() => {
							this.retrieveAllTopic();
							this.currentTopic = {};
						})
						.catch(e => {
							console.log(e);
						});
				}
				
			},
			chooseTopic(topic) {
				this.currentTopic = topic;
			},
			timePassed(timestamp) {
				let timeDiff = new Date(new Date() - new Date(timestamp));
				let timeSeconds = Math.round(timeDiff.getTime() / 1000);
				if( timeSeconds < 60 ) {
					return "< 1min ago";
				} else if ( timeSeconds < 3600 ) {
					let min = Math.round(timeSeconds / 60);
					if(min == 1) {
						return min + " min ago";
					} else {
						return min + " mins ago";
					}
				} else if ( timeSeconds < 86400 ) {
					let hour = Math.round(timeSeconds / 3600);
					if(hour == 1) {
						return hour + " hour ago";
					} else {
						return hour + " hours ago";
					}
				} else {
					let day = Math.round(timeSeconds / 60);
					if(day == 1) {
						return day + " day ago";
					} else {
						return day + " days ago";
					}
				}

				
			}
		    
		},
		mounted() {
			this.retrieveAllTopic();
			this.getUserDetails();
		}
	};
</script>
<style scoped lang="scss">

* {
	font-family: 'verdana';
}
p {
	font-size: 18px;
}
.suggestionBoardHome {
	padding: 20px 10px 20px 50px;
	border-radius: 5px;
	min-height: 400px;
	background-color: #121212;
	color: #e1e1e1;
	h3 {
		color: #dcdcdc;
	}
}
.board {
	display: flex;
}
.topic-container {
	flex: 1 1 50%;
	h2 {
		font-size: 24px;
		margin-bottom: 10px;
	}
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
		padding: 20px 10px;
		margin-bottom: 10px;
		background-color: #1e1e1e;
		border: 1px solid #000;
		border-radius: 6px;
		button {
			padding: 8px 14px;
			background-color: #c38fff;
			color: #22182c;
			text-transform: uppercase;
			font-size: 14px;
		}
	}
	.topics {
		padding: 10px;
		border: 1px solid #e1e1e1;
		border-radius: 6px;
		.topic {
			padding: 10px;
			margin-bottom: 10px;
			border: 1px solid #000;
			background-color: #1e1e1e;
			border-radius: 6px;
			&:hover {
				background-color: #2e2e2e;
			}
			&:last-child {
				margin-bottom: 0px;
			}
			a {
				padding: 10px 14px;
				background-color: #c38fff;
				color: #22182c;
				text-transform: uppercase;
				font-size: 14px;
				border-radius: 5px;
				&:hover {
					text-decoration: none;
				}
			}
			button {
				padding: 8px 14px;
				background-color: #c38fff;
				color: #22182c;
				text-transform: uppercase;
				font-size: 14px;
				outline: none;
			}
			&--title {
				border: 1px solid black;
				h3 {
					margin: 10px 0;
				}
				.text {
					&--emphasize {
						color: #9c5cfc;
					}
					&--faded {

						color: #7b7b7b;
					}
				}
			}
		}
	}
	.suggestions {
		&__list {
			border: 1px solid black;
			.finished {
				.title {
					text-decoration: line-through;
				}
			}
		}
	}
}
</style>