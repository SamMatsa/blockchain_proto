<template>
<b-container>
  <b-spinner v-if="machines.length === 0" label="Loading..."></b-spinner>
  <b-row v-if="machines" align-v="center">
      <MachineDetail   v-for="(data) in machines" v-bind:key="data.id" v-bind:name="data.name" v-bind:transactions="data.transactions" v-bind:tasks="data.tasks" v-bind:currentProduct="data.currentProduct" :id="data.id" />
  </b-row>
  <b-row v-if="!machines" align-v="center">
      <MachineDetail  v-bind:name="null" v-bind:transactions="null" v-bind:tasks="null" :id="null" />
  </b-row>
</b-container>
</template>

<script>

import MachineDetail from '../components/MachineDetail'
export default {
  data() {
   return {
  options: [],
    machines: [],
    new: [],
    errors: [],
    polling : null,
    url: 'https://vsapi.wegmann.dev/getMachines',
    username: 'vsapiuser',
    password: 'BejB75sV',
    token: Buffer.from(`${this.username}:${this.password}`, 'utf8').toString('base64'),
   }
  },
  components:{
      MachineDetail
  }, 
  methods: {
    async getMachines(){
        var machineResponse = await this.sendRequest("getMachines");
        for(var i=0; i<machineResponse.length; i++) {
          var transactionResponse = await this.sendRequest("getTransactions?machine_id="+machineResponse[i].id);
            
          var newList = []
          var name = null
          if (transactionResponse) {
            for(var j=0; j < transactionResponse.length; j++) {
              var transactions = transactionResponse[j]
              newList.push({Product: transactions.product.name, Task: transactions.task.description, End: transactions.end, Begin: transactions.begin, Status: this.getStatus(transactions.status)})
              if (transactions.status == "in progress") {
                name = transactions.product.name
              }

            }
            machineResponse[i].transactions = newList
          } else {
            machineResponse[i].transactions = null
          }
           machineResponse[i].currentProduct = name
        }
         this.machines = machineResponse
    },
    async getToken() {
      var token = await localStorage.getItem("tk")
      return token
    },
    async sendRequest(endpoint) {
      var token = await this.getToken()
      var ep = endpoint;
      var url = `https://vsapi.wegmann.dev/${ep}`;
      var response = await fetch(url, {
        method: "GET", 
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + token
        }});
      var data = await response.json()
      return data;

    },
      getStatus(status){
        switch (status) {
          case "in progress":
            return "⏳";
          case "done":
            return "✔️";
          default: "t.b.a"
            return "tba"
        }
      }
  },
    
    beforeDestroy(){
      clearInterval(this.polling);
    },
    async mounted(){
      var token = await this.getToken()
      if(!token){
        alert("No access")
        this.$router.push({name:'Login'})
      } else {
        this.getMachines();
        this.polling = setInterval(() => {
          this.getMachines();
        }, 10000);
      }

   
    }
}

</script>