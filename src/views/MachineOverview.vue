<template>
<b-container>
  <b-row align-v="center">
    <MachineDetail v-for="(data) in theList" v-bind:key="data.id" v-bind:name="data.name" v-bind:transactions="data.transactions" v-bind:tasks="data.tasks" :id="data.id" />
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
          console.log("id",responseRequest[i].id)
          var responseRequest2 = await this.sendRequest("getTransactions?machine_id="+responseRequest[i].id);
            
          var newList = []
            for(var j=0; j < responseRequest2.length; j++) {
              var response1 = responseRequest2[j]
              newList.push({Product: response1.product.name, Task: response1.task.description, End: response1.end, Begin: response1.begin, Status: response1.status})
            }
          responseRequest[i].transactions = newList
        }
         this.theList = responseRequest
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