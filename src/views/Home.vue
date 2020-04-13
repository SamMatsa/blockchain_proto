<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HomeDetail :startProcess="(ev) => startProcess()" msg="Herzlich Willkommen zu unserer Agenten App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HomeDetail from '@/components/HomeDetail.vue'

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
      console.log(endpoint)
        var response = await fetch('https://vsapi.wegmann.dev/mgmt/startSimulation', {
          method: "POST", 
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic dnNhcGl1c2VyOkJlakI3NXNW'
          }});
        let data = await response.status
        console.log(data)
        return data;

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
