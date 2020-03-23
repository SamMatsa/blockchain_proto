<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">

        <b-form-group id="input-group-1" label="Your Name:" label-for="input-1">
                <b-form-input
                id="input-1"
                v-model="form.name"
                required
                placeholder="Enter name"
                ></b-form-input>
            </b-form-group>
        
        
        <b-form-group
                id="input-group-2"
                label="Email address:"
                label-for="input-2"
                description="We'll never share your email with anyone else."
            >
            <b-form-input
            id="input-2"
            v-model="form.email"
            type="email"
            required
            placeholder="Enter email"
            ></b-form-input>
        </b-form-group>

        <label for="input-group-3">Password</label>
            <b-input type="password" v-model="form.password" id="input-group-3" aria-describedby="password-help-block"></b-input>
            <b-form-invalid-feedback :state="validation" id="password-help-block">
            Your password must be 8-20 characters long, contain letters and numbers, and must not
            contain spaces, special characters, or emoji.
            </b-form-invalid-feedback>
            <b-form-valid-feedback :state="validation">
                Looks Good.
            </b-form-valid-feedback>

        <label for="input-group-4">Confirm Password</label>
            <b-input type="password" v-model="form.password_confirmation" id="input-group-4" aria-describedby="password-help-block"></b-input>
            <b-form-invalid-feedback :state="samePWD" id="password-help-block">
                different pwd
            </b-form-invalid-feedback>
            <b-form-valid-feedback :state="samePWD">
                Looks Good.
            </b-form-valid-feedback>


        <b-form-group id="input-group-5">
            <b-form-checkbox  v-model="form.is_admin" id="checkboxes-5" value="1">Admin?</b-form-checkbox>
        </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
    export default {
        props : ["nextUrl"],
        data(){
            return {
               form: {
                    email: '',
                    name: '',
                    password: '',
                    password_confirmation : '',
                    is_admin : null
                },
                show: true
            }
        },
        methods : {
             onSubmit(evt){
                evt.preventDefault()

                if (this.form.password === this.form.password_confirmation)
                {
                    let url = "https://dhhw-vs-node-server.niklas-hauschel.de/register"
                    
                    //TODO Write admin for radio button!
                    if(this.form.is_admin == 1) url = "https://dhhw-vs-node-server.niklas-hauschel.de/register-admin", console.log("Admin", this.form.is_admin, this.form.name)
                    this.$http.post(url, {
                        name: this.form.name,
                        email: this.form.email,
                        password: this.form.password,
                        is_admin: this.form.is_admin,
                        
                    })
                    .then(response => {
                        localStorage.setItem('user',JSON.stringify(response.data.user))
                        localStorage.setItem('jwt',response.data.token)

                        if (localStorage.getItem('jwt') != null){
                            this.$emit('loggedIn')
                            if(this.$route.params.nextUrl != null){
                                this.$router.push(this.$route.params.nextUrl)
                            }
                            else{
                                this.$router.push('/')
                            }
                        }
                    })
                    .catch(error => {
                        console.error(error);
                    });
                } else {
                    this.form.password = ""
                    this.passwordConfirm = ""

                    return alert("Passwords do not match")
                }
    
            },
              onReset(evt) {
                evt.preventDefault()
                // Reset our form values
                this.form.email = ''
                this.form.name = ''
                this.form.password = ""
                this.form.is_admin= null
                // Trick to reset/clear native browser form validation state
                this.show = false
                this.$nextTick(() => {
                this.show = true
                })
            }
        }, 
         computed: {
            validation() {
                return this.form.password.length >= 8 && this.form.password.length < 20
            },
            samePWD() {
                return this.form.password == this.form.password_confirmation && this.form.password.length > 0
            }
        }   
    }
</script>