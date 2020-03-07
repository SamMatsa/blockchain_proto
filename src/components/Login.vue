<template>
<b-container>
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
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
   
    <h3 @click="goTodetail()">
            Register
        </h3>
  </div>
  </b-container>
</template>

<script>
    export default {
        data(){
            return {
                form: {
                  email: '',
                  password: '',
                },
                  show: true
              }
        },
        methods : {
            onSubmit(evt){
                evt.preventDefault()
                if (this.form.password.length > 0) {
                    this.$http.post('http://localhost:3000/login', {
                        email: this.form.email,
                        password: this.form.password
                    })
                    .then(response => {
                        let is_admin = response.data.user.is_admin
                        localStorage.setItem('user',JSON.stringify(response.data.user))
                        localStorage.setItem('jwt',response.data.token)

                        if (localStorage.getItem('jwt') != null){
                            this.$emit('loggedIn')
                            if(this.$route.params.nextUrl != null){
                                this.$router.push(this.$route.params.nextUrl)
                            }
                            else {
                                if(is_admin== 1){
                                    this.$router.push('admin')
                                }
                                else {
                                    this.$router.push('product')
                                }
                            }
                        }
                    })
                }
            },
            onReset(evt) {
              evt.preventDefault()
              // Reset our form values
              this.form.email = ''
              this.form.name = ''
              // Trick to reset/clear native browser form validation state
              this.show = false
              this.$nextTick(() => {
                this.show = true
              })
            },
            goTodetail() {
                this.$router.push({name:'register'})
            }
        }
    }
</script>