<template>
	<div class="boa">
		<h1>Maple (AKA May)</h1>
		<ul>
			<li>Allow way to add data</li>
			<li>Add way to remove/modify data</li>
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
							<td><input type="checkbox" v-model="addDataCleaning.Date"/></td>
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
			0M - 6M Hopper Mice
			<br>
			6M - 1Y Weaning Rat
			<br>
			1Y - 1.5Y Small Rat
			<br>
			1.5Y - 2.5Y Medium Rat
			<br>
			2.5Y - 4Y Large Rat
			<br>
			4Y+ Feed a little smaller than size at largest width
			<br>
		</div>

		<br>

		<div>
			0 - 1Y 10-12 Days
			<br>
			1Y - 2Y 12- 14 Days
			<br>
			2Y - 3Y 14-21 Days
			<br>
			3Y - 4Y 14-30 Days
			<br>
			4Y+ 21-60 Days
			<br>
			Feed more frequently if preparing to breed.
		</div>

		<br>

		<div>
			Hot Spot: 88-90F
			<br>
			Humidity: 55-80% - more during shedding
		</div>

		<br>

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

			<br>

			<ul>
				Rats:
				<li>Pinky: $2.79</li>
				<li>Fuzzy: $3.49</li>
				<li>Pup: $3.99</li>
				<li>Weaning: $4.49</li>
				<li>Small: $5.49</li>
				<li>Medium: $6.49</li>
				<li>Large: $8.49</li>
				<li>Jumbo: $9.99</li>
				<li>Colossal: $11.99</li>
			</ul>
		</div>

		<br>

		<div>
			Check for diseases
			<ul>
				<li>Scale Rot</li>
				<li>IBD (Inclusion Body Disease)</li>
				<li>Mites</li>
				<li>Neurological disorders e.g. stargazing</li>
				<li>Respiratory Infection</li>
				<li>Nose rub</li>
			</ul>
		</div>

		<div>
			<p>Monthly Cleaning</p>
			<p>Deep Cleaning</p>
		</div>

		<br>

		<div>
			<p>Boa Constrictor Imperator - Columbian(?) Locality</p>
			<p>
				Genes: Possible Monster Tail | Possible Kubsch Pastel | 50% Het Anery | 100% Het VPI T+
			</p>
			<p>
				Birthday: May 21, 2020
			</p>
			<p>
				Received: Aug 26, 2020
			</p>
		</div>
	</div>
</template>
<script>
	import GeneralDataService from "../services/GeneralDataService";

	export default {
		name: "BoaHome",
		data() {
			return {
				dataId: '',
				data: [],
				dbData: {
					"subject": "Boa",
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
							if(obj.subject == "Boa") {
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
					console.log('test');
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