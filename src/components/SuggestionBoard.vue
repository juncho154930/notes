<template>
	<div class="suggestionBoard">
		<button @click="setAdmin" v-if="user.email">Set Admin</button>
		<button @click="toggleResults">Toggle Results</button>
		<div v-if="loading">
			Loading...
		</div>
		<div class="board" v-else>
			<div class="suggestions-container" v-if="currentTopic.Topic">
				<h2>Current Topic: </h2>
				<div v-html="currentTopic.Topic"></div>
				<a :href="'/suggestionboard/' + routeId">Share</a>
				<div>
					<input type="checkbox" id="show-finished" v-model="filterFinished">
				  	<label for="show-finished">Hide Finished</label>
				</div>
				<div v-if="!user.email">Need to be logged in to add new Topic</div>
				<div v-else>
					<input placeholder="Add new Suggestion" v-model="newSuggestion" />
					<button @click="addSuggestion(currentTopic.id)">Add Suggestion</button>
				</div>
				<div class="suggestions__list" :class="{'filter-finished' : filterFinished}">
					<div v-for="suggestion in currentTopic.Suggestions" :key="suggestion.Suggestion" :style="{ order: suggestion.Vote.No - suggestion.Vote.Yes}" class="suggestion" :class="[suggestion.class]">
						<div v-html="suggestion.Suggestion" class="title"></div>
						<div class="vote">
							<div class="vote__buttons" >
								<button class="yes" @click="voteSuggestion(currentTopic.id, suggestion.Suggestion, 'Up')" :disabled="voteLoading == true">^</button>
								<button class="no" @click="voteSuggestion(currentTopic.id, suggestion.Suggestion, 'Down')" :disabled="voteLoading == true">v</button>
							</div>
							Vote: <span v-html="suggestion.Vote.Yes - suggestion.Vote.No"></span>
							<div v-html="suggestion.Vote"></div>
						</div>
						<div v-if="suggestion.AuthorComment" v-html="'Author Comment: ' + suggestion.AuthorComment" class="authorComment"></div>
						<div v-if="isAdmin || currentTopic.Meta && user.email == currentTopic.Meta.CreatorEmail">
							<input placeholder="Author Comment" v-model="suggestion.newAuthorComment" />
							<button @click="addComment(currentTopic.id, suggestion.Suggestion, suggestion.newAuthorComment)">Add/edit Comment</button>
						</div>
						<div v-if="isAdmin || currentTopic.Meta && user.email == currentTopic.Meta.CreatorEmail">
							<button @click="finishSuggestion(currentTopic.id, suggestion.Suggestion)" >Finish</button>
							<button @click="deleteSuggestion(currentTopic.id, suggestion.Suggestion)" >Delete</button>
						</div>
					</div>
				</div>
			</div>
			<div class="results" v-if="currentTopic.Topic && showResults">
				<h2>Results: </h2>
				<h3 v-html="currentTopic.Topic"></h3>
				<div class="results__list">
					<div v-for="suggestion in currentTopic.Suggestions" :key="suggestion.Suggestion" :style="{ order: suggestion.Vote.No - suggestion.Vote.Yes}" class="result" :class="[suggestion.class]">
						<div class="result__detail">
							<div class="votes">
								<div class="yesNo">
									<div class="yes" v-html="suggestion.Vote.Yes"></div>
									<div class="no" v-html="suggestion.Vote.No"></div>
								</div>
								<div class="total"  v-html="suggestion.Vote.Yes - suggestion.Vote.No"></div>
							</div>
							<div class="text">
								<div v-html="suggestion.Suggestion" class="title"></div>
								<div class="time" v-html="'Asked: ' + suggestion.Created + 'min ago'"></div>
							</div>
						</div>
						<div v-if="isAdmin || currentTopic.Meta && user.email == currentTopic.Meta.CreatorEmail">
							<button @click="deleteSuggestion(currentTopic.id, suggestion.Suggestion)" >Delete</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import SuggestionDataService from "../services/SuggestionDataService";
	import UserDataService from "../services/UserDataService";

	import VueJwtDecode from "vue-jwt-decode";

	export default {
		name: "SuggestionBoard",
		data() {
			return {
				user: {},
				routeId: this.id,
				loading: true,
				isAdmin: false,
				newSuggestion: '',
				currentTopic: {},
				showResults: false,
				filterFinished: true,
				voteLoading: false
			};
		},
		props: {
			id: String
		},
		watch: {
			id: function() {
		      this.getTopic(this.id);
		    }
		},
		methods: {
			getUserDetails() {
				let token = localStorage.getItem("jwt");
			      if(token) {
			        let decoded = VueJwtDecode.decode(token);
			        this.user = decoded;
			        if(this.user.email) {
			        	UserDataService.postUserDetails(this.user)
				            .then(response => {
								this.user = response.data;
								
				            })
				            .catch(e => {
				            	//logout if can't find user
				            	localStorage.removeItem("jwt");
				            	this.$router.go()
								console.log(e);
				            });
			        }
			      }
		      
		    },
			setAdmin() {
				this.isAdmin = true;
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
					let isNewSuggestion = true;
					this.currentTopic.Suggestions.some( (e) => {
						if(this.newSuggestion == e.Suggestion) {
							isNewSuggestion = false;
							return true;
						}
					})
					if( isNewSuggestion ) {
						let suggestionJSON = {
										"Suggestion": this.newSuggestion,
										"User": this.user,
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
			finishSuggestion(topicId, suggestion) {
				if(this.currentTopic) {
					SuggestionDataService.get(topicId)
						.then(response => {
							let index = -1;
							let topicData = response.data;
							topicData.Suggestions.some((val, i) => {
								if( val.Suggestion == suggestion ) {
									index = i;
									return true;
								}
							})
							if(index > -1) {
								if(!topicData.Suggestions[index].class) {
									topicData.Suggestions[index].class = [];
								}
								topicData.Suggestions[index].class.push('finished');
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
			async voteSuggestion(topicId, suggestion, vote) {
				this.voteLoading = true;
				if(this.user.email && this.currentTopic) {
					let userData = this.user;
					let voteStatus = 'empty';
					let newVoteTopicIndex = -1;
					let voteNewSuggestion = true;
			      	if(!userData.data) {
			      		userData.data = {}
			      	}
			      	if(!userData.data.votes) {
			      		userData.data.votes = []
			      	}
			      	userData.data.votes.some( (e, voteTopicIndex) => {
						if( e.topicId == topicId ) {
							newVoteTopicIndex = voteTopicIndex;
							if(e.suggestions) {
								e.suggestions.some( (f) => {
									if( f.suggestion == suggestion ) {
										if (f.vote == '') {
											voteStatus = 'empty';
										}
										else if(vote == f.vote) {
											voteStatus = 'same';
										} else {
											voteStatus = 'opposite';
										}
										voteNewSuggestion = false;
										return true
									}
								})
								return true
							}
						}
					})
				
					const topicDataResponse = await SuggestionDataService.get(topicId).catch(e => {
							console.log(e);
						});
					let topicData = topicDataResponse.data;
							topicData.Suggestions.some((val, i) => {
								if( val.Suggestion == suggestion ) {

									if (voteNewSuggestion || voteStatus == 'empty') {
										if(vote == "Up") {
											topicData.Suggestions[i].Vote.Yes = topicData.Suggestions[i].Vote.Yes + 1;
										} else if ( vote == "Down") {
											topicData.Suggestions[i].Vote.No = topicData.Suggestions[i].Vote.No + 1;
										}
									} else  {
										if(voteStatus == 'same') {
											if(vote == "Up") {
												topicData.Suggestions[i].Vote.Yes = topicData.Suggestions[i].Vote.Yes - 1;
											} else if ( vote == "Down") {
												topicData.Suggestions[i].Vote.No = topicData.Suggestions[i].Vote.No - 1;
											}
										} else { // voteStatus Opposite
											if(vote == "Up") {
												topicData.Suggestions[i].Vote.Yes = topicData.Suggestions[i].Vote.Yes + 1;
												topicData.Suggestions[i].Vote.No = topicData.Suggestions[i].Vote.No - 1;
											} else if ( vote == "Down") {
												topicData.Suggestions[i].Vote.No = topicData.Suggestions[i].Vote.No + 1;
												topicData.Suggestions[i].Vote.Yes = topicData.Suggestions[i].Vote.Yes - 1;
											}
										}
									}
									return true
								}
							})

		      				
				      		if(newVoteTopicIndex < 0) {
				      			let newUserVoteList = {
							      						'topicId': topicId,
							      						'suggestions': [
								      						{
									      						'suggestion': suggestion,
									      						'vote': vote
								      						}
							      						]
							      					}
				      			userData.data.votes.push(newUserVoteList)
				      		}  else {
		      					const foundExistingSuggestion = userData.data.votes[newVoteTopicIndex].suggestions.some((e, i) => {
					      			if(e.suggestion == suggestion) {
					      				if(voteStatus == 'same') {
					      					userData.data.votes[newVoteTopicIndex].suggestions[i].vote = '';
					      				} else {
					      					userData.data.votes[newVoteTopicIndex].suggestions[i].vote = vote;
					      				}
										
										return true
									}
					      		})
					      		if( !foundExistingSuggestion ) {
					      			let userVote = {
						      						'suggestion': suggestion,
						      						'vote': vote
					      						}
					      			userData.data.votes[newVoteTopicIndex].suggestions.push(userVote);
					      		}
				      		}
				      		
					      	

		          	await UserDataService.updateData(userData).catch(e => {
			              console.log(e);
			            });
		            await SuggestionDataService.update(topicId, topicData).catch(e => {
								console.log(e);
							});
					this.getTopic(topicId);
				
				} else {
					alert('Need to log in to vote');
				}
				this.voteLoading = false;
			},
			addComment(topicId, suggestion, authorComment) {
				if(this.currentTopic) {
					SuggestionDataService.get(topicId)
						.then(response => {
							let topicData = response.data;
							topicData.Suggestions.some((val, i) => {
								if( val.Suggestion == suggestion ) {
									topicData.Suggestions[i].AuthorComment = authorComment;
									return true
								}
							})
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
				} else {
					alert('Suggestion is not valid');
				}
			}
		    
		},
		mounted() {
			this.routeId = this.id ? this.id : this.$route.params.id;
			this.getUserDetails();
			this.currentTopic = this.getTopic(this.routeId);

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
	padding: 10px;
	border: 1px solid #000;
	background-color: #ccc;
	border-radius: 6px;
	margin-right: 10px;
	a {
		padding: 2px 4px;
		background-color: #eee;
		border: 1px solid black;
		border-radius: 5px;
	}
	.suggestions {

		&__list {
			display: flex;
			flex-direction: column;
			&.filter-finished {
				.finished {
					display: none;
				}
			}
			.suggestion {
				border: 1px solid #000;
				background-color: #fff;
				border-radius: 6px;
				margin-bottom: 10px;
				padding: 20px 0 10px;
				&.finished {
					.title {
						text-decoration: line-through;
					}
				}
			}
			.vote {
				display: flex;
				align-items: center;
				&__buttons {
					display: flex;
					flex-direction: column;
					margin-right: 4px;
					.yes {
						padding: 4px;
						background-color: rgb(44, 160, 44);
						border-radius: 10%;
						margin-bottom: 4px;
					}
					.no {
						padding: 4px;
						background-color: rgb(214, 39, 40);
						border-radius: 10%;
					}
				}
			}
		}
	}

}

.results {
	padding: 10px;
	border: 1px solid #000;
	background-color: #ddd;
	border-radius: 6px;
	&__list {
		display: flex;
		flex-direction: column;
		.result {
			border: 1px solid #000;
			background-color: #fff;
			border-radius: 6px;
			margin-bottom: 10px;
			padding: 20px 0 10px;
			&.finished {
				.title {
					text-decoration: line-through;
				}
			}
			&__detail {
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