
<template>
<b-container>
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="input-group-1"
        label="Username"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.username"
          required
          placeholder="Enter your username"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Your password:" label-for="input-2">
        <b-form-input
          id="input-2"
          type="password"
          v-model="form.password"
          required
          placeholder="Enter password"
        ></b-form-input>
      </b-form-group>
      

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
  </b-container>
</template>

<script>
    export default {
        data(){
            return {
                form: {
                  username: '',
                  password: '',
                },
                  show: true
              }
        },
        methods : {
            async onSubmit(evt){
                evt.preventDefault()
                await this.setToken( this.form.username, this.form.password)
            },
            onReset(evt) {
              evt.preventDefault()
              // Reset our form values
              this.form.username = ''
              this.form.password = ''
              // Trick to reset/clear native browser form validation state
              this.show = false
              this.$nextTick(() => {
                this.show = true
              })
            },
             async setToken(user, passwd) {
              var authorizationBasic = window.btoa(user + ':' + passwd);
              localStorage.setItem("tk", authorizationBasic)
              this.sendRequest()
            },
            async getToken() {
              var token = await localStorage.getItem("tk")
              return token
            },
            async sendRequest() {
              var token = await this.getToken()
              var url = `https://vsapi.wegmann.dev/getTasks`;
              try {
                  var response = await fetch(url, {
                    method: "GET", 
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': 'Basic ' + token
                    }});

                  var data = await response
                  if (data.status != 200) {
                    localStorage.removeItem("tk")
                    alert("Wrong token")
                  } else {
                    this.$router.push({name:'Home'})
                  }
                } catch(err) {
                  localStorage.removeItem("tk")
                  alert("Wrong token")
                }
              
            },
            remove(){
              localStorage.removeItem("tk")
            }
        }, 
        async mounted(){
            var token = await this.getToken()
            if (token) {
              this.$router.push({name:'Home'})
            } 
          }
    }
</script>
