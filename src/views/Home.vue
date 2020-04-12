<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HomeDetail :startProcess="(ev) => startProcess()" msg="Herzlich Willkommen zu unserer Agenten App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HomeDetail from '@/components/HomeDetail.vue'
import axios from 'axios'

export default {
  name: 'Home',
  components: {
    HomeDetail
  }, 
  methods: {
    async startProcess() {
      var simulationResponse = await this.sendRequest("mgmt/startSimulation");
      if (simulationResponse=="200") {
        this.makeToastSuccess()
      } else {
        this.makeToastFailed()
      }
     
    },
    async sendRequest(endpoint) {
        var ep = endpoint;
        var user = "vsapiuser";
        var pass = "BejB75sV";
        // var url = `http://localhost:8081/${ep}`;
        var url = `https://vsapi.wegmann.dev/${ep}`;
        var authorizationBasic = window.btoa(user + ':' + pass);
        var config = {
          "headers":{
            "Authorization": "Basic " + authorizationBasic
          }
        };
        var res = await axios.post(url, config);
        return res.status;
      },
      makeToastSuccess(append = false) {
        this.toastCount++
        this.$bvToast.toast(`Prozess wurde gestartet`, {
          title: 'Agent',
          autoHideDelay: 5000,
          appendToast: append
        })
      },
      makeToastFailed(append = false) {
        this.toastCount++
        this.$bvToast.toast(`Der Prozess konnte nicht neu gestartet werden!`, {
          title: 'Agent',
          variant: 'danger',
          autoHideDelay: 5000,
          appendToast: append
        })
      },

  }
}
</script>
