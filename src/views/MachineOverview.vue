<template>
<b-container>
  <b-row align-v="center">
    <MachineDetail v-for="(data, index) in theList" v-bind:key="data.id" v-bind:name="data.name"  :id="data.id" :getTasks="(ev) => getTasks(index)"/>
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
    getMachines(){
      console.log("Test")
      
        var user = "vsapiuser";
        var pass = "BejB75sV";
        // var url = 'http://localhost:8083/getMachines';
        var url = 'https://vsapi.wegmann.dev/getMachines';

        var authorizationBasic = window.btoa(user + ':' + pass);
        var config = {
          "headers":{
            "Authorization": "Basic " + authorizationBasic
          }
        };

        axios.get(url, config).then(response => {
          this.theList = response.data
          console.log(this.theList);
        })
    
    },
    

    },
    mounted(){
      this.getMachines();
    }
}

</script>