<template>
	<div class="tosh">
		<h1>Tosh</h1>
		<div>
			<p>Python bivittatus - Albino Het Green</p>
			<p>
				Albino Het Green Baby Male 2020 Burmese Python. <br>
				Born Late August - Aug 26, 2020?<br>
				Mother: ~12ft<br>
				Fater: ~9ft<br>
				At arrival: <br>
				Received - Nov 6, 2020<br>
				Feeding him frozen thawed large mice<br>
				He’s currently housed on blank newspaper at 89 degrees with 60-70% humidity<br>
				<br>
				later have listerine or something<br>
				Move to rats when possible<br>
				<br>
				0 - 1Y 10-12 Days
				<br>
				1Y - 2Y 12- 14 Days
				<br>
				2Y - 3Y 14-21 Days
				<br>
				3Y - 4Y 14-30 Days
				<br>
				4Y+ 21-30 Days
			</p>
		</div>
		<ul>
			<li></li>
		</ul>
		<div class="schedule">
			<div class="buttons">
				<button @click="changeList('Record')">Record</button>
				<button @click="changeList('Feeding')">Feeding</button>
				<button @click="changeList('Cleaning')">Cleaning</button>
				<button @click="changeList('Shed')">Shed</button>
			</div>
			
			<div class="lists">
				<div class="update__message" :class="{active: updatedData == true}">Updated!</div>
				<button @click="updateData()" class="update__button">Update Data</button>
				<p>To Delete entry, just clear out date section</p>
				<div v-if="showList == 'Record'" class="scheduleList">
					<h1>Record</h1>
					<table>
						<tr>
							<th>Date</th>
							<th>Length</th>
							<th>Weight</th>
							<th>Note</th>
						</tr>
						<tr>
							<td><input type="text" v-model="addDataRecord.Date"/></td>
							<td><input type="text" v-model="addDataRecord.Length"/></td>
							<td><input type="text" v-model="addDataRecord.Weight"/></td>
							<td><textarea v-model="addDataRecord.Note"></textarea></td> 
						</tr>
						<tr v-for="info in dbData.data.Record" :key="info.ID">
							<td><input type="text" v-model="info.Date"/></td>
							<td><input type="text" v-model="info.Length"/></td>
							<td><input type="text" v-model="info.Weight"/></td>
							<td><textarea v-model="info.Note"></textarea></td>
						</tr>
					</table>
				</div>
				<div v-else-if="showList == 'Feeding'" class="scheduleList">
					<h1>Feeding</h1>
					<table>
						<tr>
							<th>Completed</th>
							<th>Date</th>
							<th>Days since last fed</th>
							<th>Size</th>
							<th>Note</th>
						</tr>
						<tr>
							<td><input type="checkbox" v-model="addDataFeeding.Completed"/></td>
							<td><input type="text" v-model="addDataFeeding.Date"/></td>
							<td><input type="text" v-model="addDataFeeding.Last_Fed"/></td>
							<td><input type="text" v-model="addDataFeeding.Size"/></td>
							<td><textarea v-model="addDataFeeding.Note"></textarea></td> 
						</tr>
						<tr v-for="info in dbData.data.Feeding" :key="info.ID">
							<td><input type="checkbox" v-model="info.Completed"/></td>
							<td><input type="text" v-model="info.Date"/></td>
							<td><input type="text" v-model="info.Last_Fed"/></td>
							<td><input type="text" v-model="info.Size"/></td>
							<td><textarea v-model="info.Note"></textarea></td>
						</tr>
					</table>
				</div>
				<div v-else-if="showList == 'Cleaning'" class="scheduleList">
					<h1>Cleaning</h1>
					<table>
						<tr>
							<th>Completed</th>
							<th>Date</th>
							<th>Clean</th>
							<th>Note</th>
						</tr>
						<tr>
							<td><input type="checkbox" v-model="addDataCleaning.Completed"/></td>
							<td><input type="text" v-model="addDataCleaning.Date"/></td>
							<td><textarea v-model="addDataCleaning.Clean"></textarea></td>
							<td><textarea v-model="addDataCleaning.Note"></textarea></td> 
						</tr>
						<tr v-for="info in dbData.data.Cleaning" :key="info.ID">
							<td><input type="checkbox" v-model="info.Completed"/></td>
							<td><input type="text" v-model="info.Date"/></td>
							<td><textarea v-model="info.Clean"></textarea></td>
							<td><textarea v-model="info.Note"></textarea></td>
						</tr>
					</table>
				</div>
				<div v-else-if="showList == 'Shed'" class="scheduleList">
					<h1>Shed</h1>
					<table>
						<tr>
							<th>Completed</th>
							<th>Date</th>
							<th>Humidity</th>
							<th>Note</th>
						</tr>
						<tr>
							<td><input type="checkbox" v-model="addDataShed.Completed"/></td>
							<td><input type="text" v-model="addDataShed.Date"/></td>
							<td><input type="text" v-model="addDataShed.Humidity"/></td>
							<td><textarea v-model="addDataShed.Note"></textarea></td> 
						</tr>
						<tr v-for="info in dbData.data.Shed" :key="info.ID">
							<td><input type="checkbox" v-model="info.Completed"/></td>
							<td><input type="text" v-model="info.Date"/></td>
							<td><input type="text" v-model="info.Humidity"/></td>
							<td><textarea v-model="info.Note"></textarea></td>
						</tr>
					</table>
				</div>
			</div>
		</div>
		<div>
			<p>DFW Reptarium Prices: (Frozen)</p>
			<ul>
				Mice:
				<li>Pinky: $1.19</li>
				<li>Fuzzy: $1.49</li>
				<li>Hopper: $1.99</li>
				<li>Adult: $2.99</li>
				<li>Jumbo: $3.99</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import GeneralDataService from "../services/GeneralDataService";

	export default {
		name: "Tosh",
		data() {
			return {
				dataId: '',
				data: [],
				dbData: {
					"subject": "Tosh",
					data: {
						Record: [],
						Feeding: [],
						Cleaning: [],
						Shed: [],
					}
				},
				addDataRecord: {},
				addDataFeeding: {},
				addDataCleaning: {},
				addDataShed: {},
				showList: "Record",
				updatedData: false
			};
		},
		methods: {
			retrieveData() {
				GeneralDataService.getAll()
					.then(response => {
						console.log(response.data);

						response.data.some((obj) => {
							if(obj.subject == "Tosh") {
								this.dataId = obj.id;

								this.dbData.data = obj.data;

								return obj.id;
							}
						})

						
					})
					.catch(e => {
						console.log(e);
					});

				this.addDataRecord = {};
				this.addDataFeeding = {};
				this.addDataCleaning = {};
				this.addDataShed = {};
				
			},
			checkDataAndTrim (json) {
				let newJson = [];
				json.forEach((val) => {
					if(val.Date != "") {
						newJson.push(val);
					}
				})

				return newJson;
			},
			updateData() {
				this.addDataRecord.Date ? this.dbData.data.Record.unshift(this.addDataRecord) : "";
				this.addDataFeeding.Date ? this.dbData.data.Feeding.unshift(this.addDataFeeding) : "";
				this.addDataCleaning.Date ? this.dbData.data.Cleaning.unshift(this.addDataCleaning) : "";
				this.addDataShed.Date ? this.dbData.data.Shed.unshift(this.addDataShed) : "";

				this.dbData.data.Record = this.checkDataAndTrim(this.dbData.data.Record);
				this.dbData.data.Feeding = this.checkDataAndTrim(this.dbData.data.Feeding);
				this.dbData.data.Cleaning = this.checkDataAndTrim(this.dbData.data.Cleaning);
				this.dbData.data.Shed = this.checkDataAndTrim(this.dbData.data.Shed);

				if(this.dataId) {
					if(this.dbData.data) {
						GeneralDataService.update(this.dataId, this.dbData)
					        .then(response => {
					          console.log(response.data);
					          this.message = 'The data was updated successfully!';
					          this.retrieveData();
					        })
					        .catch(e => {
					          console.log(e);
					        });
					} else {
						alert('insufficient data');
					}
				} else {
					this.addNewData();
				}

				this.updatedData = true;
				setTimeout(()=> {
					this.updatedData = false
				},1000);
				
		    },
		    addNewData() {
		        if(this.dbData.data) {
		          GeneralDataService.create(this.dbData)
		            .then(response => {
		              this.dataId = response.data.id;
		              console.log(response.data);
		              this.retrieveData();
		            })
		            .catch(e => {
		              console.log(e);
		            });
		        } else {
		          alert('Needs Data');
		        }
		    },
			urlify(text) {
				var urlRegex = /\[(https?:\/\/[^\s]+)\]/g;
				return text.replace(urlRegex, '<a href="$1" target="_blank">$1</a>')
			},
			sendToUrl(url){ 
				window.location = url;
			},
			changeList(list) {
				this.showList = list;
			}
		},
		mounted() {
			this.retrieveData();
		}
	};
</script>
<style scoped lang="scss">


.update {
	&__message {
		opacity: 0;
		transition: opacity ease 2s;
		margin-bottom: 10px;
		&.active {
			opacity: 1;
			transition: 0s;
		}
	}

	&__button {
		margin-bottom: 20px;	
		border: 0;
		border-radius: 6px;
		padding: 6px 12px;
		&:hover {
			opacity: 0.8
		}
	}
}

.schedule {
	padding: 20px;
	margin: 30px 0;
	border: 1px solid #FFF;
	.buttons {
		margin-bottom: 30px;
		button {
			padding: 6px 12px;
			margin: 4px 20px;
			border: none;
			border-radius: 5px;

		}	
	}
	
	.lists {
		table {
			border-collapse:separate; 
			border-spacing: 0 16px;
			td, th {
				padding: 10px 20px;
			}
			td {
				@include mobile {
					padding: 2px 20px;
					&:first-child {
						font-weight: 600;
						letter-spacing: 1px;
						font-size: 22px;
					}
					&:nth-child(2) {
						font-size: 22px;
					}
				}
			}
			tr {
				@include mobile {
					display: flex;
					flex-direction: column;
					padding: 20px 0;
					margin-bottom: 6px;
				}
			}
			textarea {
  				resize: both;
			}
			.th-row {
				@include mobile {
					display: none;
				}
			}
		}
	}

}

</style>