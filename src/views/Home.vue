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
      var simulationResponse = await this.sendRequest();
      if (simulationResponse=="200") {
        this.makeToastSuccess()
      } else {
        this.makeToastFailed()
      }
     
    },
    async getToken() {
      var token = await localStorage.getItem("tk")
      return token
    },
    async sendRequest() {
        var token = await this.getToken()
        var response = await fetch('https://vsapi.wegmann.dev/mgmt/startSimulation', {
          method: "POST", 
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + token
          }});
        let data = await response.status
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
      remove(){
        localStorage.removeItem("tk")
        location.reload();        
      }

  }, 
  async mounted() {
    var token = await this.getToken()
    if(!token){
      alert("No access")
      this.$router.push({name:'Login'})
    }
  }
  
}
</script>
