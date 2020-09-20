<template>
	<div class="suggestionBoard">
		<button @click="toggleAdmin">Toggle Admin</button>
		<button @click="toggleResults">Toggle Results</button>
		<div v-if="loading">
			Loading...
		</div>
		<div class="board" v-else>
			<div class="suggestions-container" v-if="currentTopic.Topic">
				<input placeholder="Add new Suggestion" v-model="newSuggestion" />
				<button @click="addSuggestion(currentTopic.id)">Add Suggestion</button>
				<h2>Current Topic: </h2>
				<div v-html="currentTopic.Topic"></div>
				<div class="suggestions__list">
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
			</div>
			<div class="results" v-if="currentTopic.Topic && showResults">
				<h2>Results: </h2>
				<h3 v-html="currentTopic.Topic"></h3>
				<div class="results__list">
					<div v-for="suggestion in currentTopic.Suggestions" :key="suggestion.Suggestion" :style="{ order: suggestion.Vote.No - suggestion.Vote.Yes}" class="result">
						<div class="title">
							<div class="votes">
								<div class="yesNo">
									<div class="yes" v-html="suggestion.Vote.Yes"></div>
									<div class="no" v-html="suggestion.Vote.No"></div>
								</div>
								<div class="total"  v-html="suggestion.Vote.Yes - suggestion.Vote.No"></div>
							</div>
							<div class="text">
								<div v-html="suggestion.Suggestion"></div>
								<div class="time" v-html="'Asked: ' + suggestion.Created + 'min ago'"></div>
							</div>
						</div>
						<button @click="deleteSuggestion(currentTopic.id, suggestion.Suggestion)" v-if="isAdmin">Delete</button>
					</div>
				</div>
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
				routeId: this.id,
				loading: true,
				isAdmin: false,
				newSuggestion: '',
				currentTopic: {},
				showResults: false
			};
		},
		props: {
			id: String
		},
		methods: {
			toggleAdmin() {
				if(this.isAdmin) {
					this.isAdmin = false;
				} else {
					this.isAdmin = true;
				}
			},
			toggleResults() {
				if(this.showResults) {
					this.showResults = false;
				} else {
					this.showResults = true;
				}
			},
			getTopic (id) {
				SuggestionDataService.get(id)
					.then(response => {
						if(response.data) {
							this.currentTopic = response.data;
						} 

						this.loading = false;
					})
					.catch(e => {
						console.log(e);
					});
				
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
										this.getTopic(topicId);
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
									this.getTopic(topicId);
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
									this.getTopic(topicId);
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
			this.routeId = this.id ? this.id : this.$route.params.id;
			this.currentTopic = this.getTopic(this.routeId);
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
.suggestions-container {
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

.results {
	&__list {
		display: flex;
		flex-direction: column;
		.result {
			padding: 20px 0;
			.title {
				display: flex;
				align-items: center;
				.votes {
					display: flex;
					align-items: center;
					border: 1px solid #000;
					padding: 4px;
					margin-right: 10px;
					.total {
						padding: 0 4px;
					}
					.yesNo {
						display: flex;
						flex-direction: column;
						padding: 0 10px;
					}
					.yes {
						color: rgb(44, 160, 44);
					}
					.no {
						color: rgb(214, 39, 40);
					}
				}
				.text {
					.time {
						font-size: 12px;
					}
				}
			}
		}
	}
}
</style>