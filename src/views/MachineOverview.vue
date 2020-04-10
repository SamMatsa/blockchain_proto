<template>
<b-container>
  <b-row v-if="theList" align-v="center">
      <MachineDetail   v-for="(data) in theList" v-bind:key="data.id" v-bind:name="data.name" v-bind:transactions="data.transactions" v-bind:tasks="data.tasks" v-bind:currentProduct="data.currentProduct" :id="data.id" />
  </b-row>
  <b-row v-if="!theList" align-v="center">
      <MachineDetail  v-bind:name="null" v-bind:transactions="null" v-bind:tasks="null" :id="null" />
  </b-row>
</b-container>
</template>

<script>
import axios from 'axios'

import MachineDetail from '../components/MachineDetail'
export default {
  data() {
   return {
  options: [],
    theList: [],
    new: [],
    errors: [],
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
        var responseRequest = await this.sendRequest("getMachines");
        for(var i=0; i<responseRequest.length; i++) {
          var responseRequest2 = await this.sendRequest("getTransactions?machine_id="+responseRequest[i].id);
            
          var newList = []
          var name = null
          if (responseRequest2) {
            for(var j=0; j < responseRequest2.length; j++) {
              var response1 = responseRequest2[j]
              newList.push({Product: response1.product.name, Task: response1.task.description, End: response1.end, Begin: response1.begin, Status: response1.status})
              if (response1.status == "in progress") {
                name = response1.product.name
              }

            }
            responseRequest[i].transactions = newList
          } else {
            responseRequest[i].transactions = null
          }
           responseRequest[i].currentProduct = name
        
        }
         this.theList = responseRequest
         console.log(this.theList)
    },


    test() {
      return "hello"
    }, 
     async sendRequest(endpoint) {
        var ep = endpoint;
        var user = "vsapiuser";
        var pass = "BejB75sV";
        var url = `https://vsapi.wegmann.dev/${ep}`;
        var authorizationBasic = window.btoa(user + ':' + pass);
        var config = {
          "headers":{
            "Authorization": "Basic " + authorizationBasic
          }
        };
        var res = await axios.get(url, config);
        this.lastResponseObject = res.data;
        return res.data;
      },
  },
    mounted(){
      this.getMachines();
      setInterval(() => {
        console.log("Refresh!")
        this.getMachines();
      }, 10000);
    }
}

</script>