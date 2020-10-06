<template>
	<div class="suggestion-board">
		<!-- <button @click="setAdmin" v-if="user.email">Set Admin</button> -->
		<button @click="toggleResults">Toggle Results</button>
		<div v-if="loading">
			Loading...
		</div>
		<div class="board" v-else>
			<div class="suggestions-container" v-if="currentTopic">
				<h2>Current Topic</h2>
				<h3 v-html="currentTopic.Topic"></h3>
				<div>
					<input type="text" :id="shareLink" :value="shareLink" readonly>
					<button @click="copyToClipboard(shareLink)">Copy</button>
					<div class="copiedText" :class="{active: copiedLink == true}">Copied!</div>
				</div>
				<div class="filter-checkboxes">
					<input type="checkbox" id="show-finished" v-model="filterFinished">
				  	<label for="show-finished">Hide Finished</label>
				</div>
				<div v-if="!user.email">
					<p>
						Please <router-link :to="'/Login?id=' + routeId">Login</router-link> or <router-link :to="'/Register?id=' + routeId">Register</router-link> to add Suggestions
					</p>
					<br>
				</div>
				<div v-else>
					<input placeholder="Add new Suggestion" v-model="newSuggestion" />
					<button @click="addSuggestion(currentTopic.id)">Add Suggestion</button>
				</div>
				<div class="suggestions__list" :class="{'filter-finished' : filterFinished}">
					<div v-for="suggestion in currentTopic.Suggestions" :key="suggestion.Suggestion" :style="{ order: suggestion.Vote.No - suggestion.Vote.Yes}" class="suggestion" :class="[suggestion.class]">
						<div v-html="suggestion.Suggestion" class="title"></div>
						<div class="vote">
							<div class="vote__buttons" >
								<button class="yes" @click="voteSuggestion(currentTopic.id, suggestion, 'Up')" :disabled="voteLoading == true">^</button>
								<button class="no" @click="voteSuggestion(currentTopic.id, suggestion, 'Down')" :disabled="voteLoading == true">v</button>
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
							<button @click="toggleFinishSuggestion(currentTopic.id, suggestion.Suggestion)" >Toggle Finish</button>
							<button @click="deleteSuggestion(currentTopic.id, suggestion.Suggestion)" >Delete</button>
						</div>
					</div>
				</div>
			</div>
			<div class="results" v-if="currentTopic && showResults">
				<h2>Results</h2>
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

	export default {
		name: "SuggestionBoard",
		data() {
			return {
				user: {},
				routeId: this.id,
				loading: true,
				isAdmin: false,
				shareLink: '',
				newSuggestion: '',
				currentTopic: {},
				showResults: false,
				filterFinished: true,
				voteLoading: false,
				copiedLink: false
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
			        let decoded = this.$VueJwtDecode.decode(token);
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
							this.routeId = this.currentTopic.id;
						} 

					})
					.catch(e => {
						console.log(e);
					});

				this.loading = false;
				
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
										"User": { 
											"name": this.user.name,
											"email": this.user.email
										},
										"Vote": {
											"Yes": 0,
											"No": 0
										},
										"userVotes": [],
										"Created": new Date()
									};

						SuggestionDataService.addSuggestion(topicId, suggestionJSON).then(() => {
							this.getTopic(topicId);
							this.newSuggestion = '';
						}).catch(e => {
							console.log(e);
						});

					} else {
						// voteSuggestion - ID depends on having unique suggestions per topic
						alert('This Suggestion Already Exists');
					}
				} else {
					alert('Suggestion is not valid');
				}
			},
			deleteSuggestion(topicId, suggestion) {
				if(this.currentTopic) {
					let index = -1;
					let topicData = this.currentTopic;
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
				}
			},
			async toggleFinishSuggestion(topicId, suggestion) {
				if(this.currentTopic) {
					let suggestionJSON = { suggestion }
					await SuggestionDataService.finishSuggestion(topicId, suggestionJSON).then( ()=> {
						this.getTopic(topicId);
					}).catch(e => {
						console.log(e);
					});
				}
			},
			async voteSuggestion(topicId, suggestion, vote) {
				this.voteLoading = true;

				let voteAllowed = true;
				let userId = '';
				let voteNotAllowedMessage = 'Vote Not Allowed';


				// TEMP - TO REMOVE LATER WHEN I FORCE COOKIES OR LOGIN
				let TEMPWORKAROUND = false;
				if(!this.currentTopic.Meta.CheckDup) {
					TEMPWORKAROUND = true;
				}
				// TEMP - TO REMOVE LATER WHEN I FORCE COOKIES OR LOGIN
				
				// Check Cookies
				if(this.currentTopic.Meta.CheckDup || TEMPWORKAROUND) {
					if( !TEMPWORKAROUND && this.currentTopic.Meta.CheckDup.loggedIn ) {
						if(!this.user.email) {
							voteAllowed = false;
							voteNotAllowedMessage = 'Need to be logged in to vote'
						} else {
							userId = this.user._id;
						}
					} else if( TEMPWORKAROUND || this.currentTopic.Meta.CheckDup.cookie ) {
						let topicSug = topicId + suggestion.Suggestion;
						let sugUserVotes = 0;
						if(suggestion.userVotes) {
							sugUserVotes = suggestion.userVotes.length
						}
						let topicSugId = topicSug + sugUserVotes;
						let currentCookie = this.$VueCookie.get(topicSug);
						if(currentCookie) {
							userId = currentCookie;
						} else {
							this.$VueCookie.set(topicSug, topicSugId, 365);
							userId = topicSugId;
						}
						
					}
				}
				
				if(voteAllowed && userId && this.currentTopic) {
					let voteData = {
						"suggestion": suggestion.Suggestion,
						"vote": vote,
						"userId": userId
					}
				
					await SuggestionDataService.updateVote(topicId, voteData).catch(e => {
						console.log(e);
					});
					

					this.getTopic(topicId);
				
				} else {
					alert(voteNotAllowedMessage);
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
			},
			copyToClipboard(inputId){
				let eId = document.getElementById(inputId);
				eId.select();
				eId.setSelectionRange(0, 99999);
				document.execCommand("copy");
				this.copiedLink = true;
				setTimeout(()=> {
					this.copiedLink = false
				},1000);
				
			}
		    
		},
		mounted() {
			this.routeId = this.id ? this.id : this.$route.params.id;
			this.getUserDetails();
			this.currentTopic = this.getTopic(this.routeId);
			this.shareLink = window.location.origin + '/board/' + this.routeId;
		}
	};
</script>
<style scoped lang="scss">
p {
	font-size: 18px;
}
input:not([type=checkbox]) {
	width: 100%;
	max-width: 600px;
	padding: 8px 12px;
	border-radius: 5px;
	outline: none;
}
.suggestion-board {
	padding: 16px 30px;
	margin: auto 10px;
	min-height: 400px;
	background-color: #2e2e2e;
	border: 1px solid #fff;
	border-radius: 5px;

	button {
		padding: 8px 14px;
		margin: 6px 0;
		border-radius: 6px;
		border: 1px solid black;
		background-color: #c38fff;
		color: #22182c;
		text-transform: uppercase;
		font-size: 14px;
		font-weight: 900;
		outline: none;
	}
}
.board {
	display: flex;
}
.suggestions-container {
	flex: 1 1 50%;
	padding: 10px;
	border: 1px solid #fff;
	border-radius: 6px;
	margin-right: 10px;
	h2 {
		color: #9c5cfc;
	}
	h3 {
		margin-bottom: 6px;
	}
	a {
	    padding: 10px 14px;
	    background-color: #c38fff;
	    color: #22182c;
	    text-transform: uppercase;
	    font-size: 14px;
	    font-weight: 900;
	    border-radius: 5px;
	}
	button {
		padding: 8px 14px;
		margin: 6px 0;
		border-radius: 6px;
		border: 1px solid black;
		background-color: #c38fff;
		color: #22182c;
		text-transform: uppercase;
		font-size: 14px;
		font-weight: 900;
		outline: none;
	}
	.filter-checkboxes  {
		margin: 14px 0 6px;
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
	border: 1px solid #fff;
	border-radius: 6px;
	h2 {
		color: #9c5cfc;
	}
	button {
		padding: 8px 14px;
		margin: 6px 0;
		border-radius: 6px;
		border: 1px solid black;
		background-color: #c38fff;
		color: #22182c;
		text-transform: uppercase;
		font-size: 14px;
		outline: none;
	}
	&__list {
		display: flex;
		flex-direction: column;
		.result {
			border: 1px solid #fff;
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
.copiedText {
	opacity: 0;
	transition: opacity ease 2s;
	margin-bottom: 10px;
	&.active {
		opacity: 1;
		transition: 0s;
	}
}
</style>