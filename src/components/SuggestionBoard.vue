<template>
	<div class="suggestionBoard">
		<a href="https://www.strawpoll.me/" target="_blank">https://www.strawpoll.me/</a>
		<h3>Welcome to Suggestion Board</h3>
		<h4>Create suggestions for your next thing</h4>

		<button @click="toggleAdmin">Toggle Admin</button>
		<div v-if="loading">
			Loading...
		</div>
		<div class="board" v-else>			
			<div class="topic">
				<br>
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
				<p>
					<button @click="addTopic()">Add Topic</button>
				</p>
			  	<!-- <div v-for="(note,n) in notes" :key="n">
					<p>
					<span class="cat">{{note}}</span> <button @click="removeSuggestion(n)">Remove</button>
					</p>
				</div> -->

				<div>
					<h2>Topics:</h2>
					<div v-for="topic in data" :key="topic.id">
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
						<button @click="deleteTopic(topic.id)" v-if="isAdmin">Delete</button>
					</div>
				</div>
			</div>
			<div class="results" v-if="currentTopic.Topic">
				<h2>Current Topic: </h2>
				<div class="suggestions__list">
					<div v-html="currentTopic.Topic"></div>
					<div v-for="suggestion in currentTopic.Suggestions" :key="suggestion.Suggestion" :style="{ order: suggestion.Vote.No - suggestion.Vote.Yes}" class="suggestion">
						<div v-html="suggestion.Suggestion"></div>
						<div class="vote">
							<button @click="voteSuggestion(currentTopic.id, suggestion.Suggestion, 'Up')">Up</button>
							<button @click="voteSuggestion(currentTopic.id, suggestion.Suggestion, 'Down')">Down</button>
							Vote: <span v-html="suggestion.Vote.Yes - suggestion.Vote.No"></span>
							<div v-html="suggestion.Vote"></div>
						</div>
						<button @click="deleteSuggestion(currentTopic.id, suggestion.Suggestion)" v-if="isAdmin">Delete</button>
					</div>
				</div>
				<input placeholder="Add new Suggestion" v-model="newSuggestion" />
				<button @click="addSuggestion(currentTopic.id)">Add Suggestion</button>
			</div>
		</div>
	</div>
</template>
<script>
	import SuggestionDataService from "../services/SuggestionDataService";

	export default {
		name: "SuggestionBoard",
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
			},
			addSuggestion(topicId) {
				if(this.currentTopic && this.newSuggestion) {
					let isNewTopic = true;
					this.currentTopic.Suggestions.some( (e) => {
						if(this.newSuggestion == e.Suggestion) {
							isNewTopic = false;
						}
					})
					if( isNewTopic ) {
						let suggestionJSON = {
										"Suggestion": this.newSuggestion,
										"Vote": {
											"Yes": 0,
											"No": 0
										},
										"Created": new Date()
									};
						SuggestionDataService.get(topicId)
							.then(response => {
								let topicData = response.data;
								topicData.Suggestions.push(suggestionJSON);
								SuggestionDataService.update(topicId, topicData)
									.then(() => {
										this.retrieveTopic();
										this.chooseTopic(topicData);
										this.newSuggestion = '';
									})
									.catch(e => {
										console.log(e);
									});
							})
							.catch(e => {
								console.log(e);
							});

					} else {
						alert('This Suggestion Already Exists');
					}
				} else {
					alert('Suggestion is not valid');
				}
			},
			deleteSuggestion(topicId, suggestion) {
				if(this.currentTopic) {
					SuggestionDataService.get(topicId)
						.then(response => {
							let index = -1;
							let topicData = response.data;
							topicData.Suggestions.forEach((val, i) => {
								if( val.Suggestion == suggestion ) {
									index = i;
								}
							})
							if(index > -1) {
								topicData.Suggestions.splice(index, 1);
							}
							SuggestionDataService.update(topicId, topicData)
								.then(() => {
									this.retrieveTopic();
									this.chooseTopic(topicData);
								})
								.catch(e => {
									console.log(e);
								});
						})
						.catch(e => {
							console.log(e);
						});

				}
			},
			voteSuggestion(topicId, suggestion, vote) {
				if(this.currentTopic) {
					SuggestionDataService.get(topicId)
						.then(response => {
							let index = -1;
							let topicData = response.data;
							topicData.Suggestions.forEach((val, i) => {
								if( val.Suggestion == suggestion ) {
									index = i;
								}
							})
							if(index > -1) {
								if(vote == "Up") {
									topicData.Suggestions[index].Vote.Yes = topicData.Suggestions[index].Vote.Yes + 1;
								} else if ( vote == "Down") {
									topicData.Suggestions[index].Vote.No = topicData.Suggestions[index].Vote.No + 1;
								}
							}
							SuggestionDataService.update(topicId, topicData)
								.then(() => {
									this.retrieveTopic();
									this.chooseTopic(topicData);
								})
								.catch(e => {
									console.log(e);
								});
						})
						.catch(e => {
							console.log(e);
						});
				}
			}
		    
		},
		mounted() {
			this.retrieveTopic();
		}
	};
</script>
<style scoped lang="scss">

* {
	font-family: 'Comic Sans MS';	
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
.suggestionBoard {
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
.topic {
	flex: 1 1 50%;
	input:not([type=checkbox]) {
		width: 100%;
		border: 1px solid black;
		padding: 4px 10px;
		background-color: transparent;
	}
	textarea {
		display: block;
		resize: both;
		padding: 5px 10px;
		width: 100%;
		max-width: 100%;
		border: 0;
		background-color: transparent;
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
}
.results {
	flex: 1 1 50%;
}

.suggestions {
	&__list {
		display: flex;
		flex-direction: column;
		.suggestion {
			padding: 20px 0;
		}
		.vote {
			display: flex;
		}
	}
}
</style>