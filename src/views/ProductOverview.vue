<template>
<b-container>
  <b-row align-v="center">
    <b-col><ProductDetail /></b-col>
  </b-row>
</b-container>
</template>

<script>
import ProductDetail from '../components/ProductDetail';
import axios from 'axios';

export default {
    components:{
        ProductDetail
    },
    data(){
      return{
        list: []
      }
    },
    methods:{
      getList(){

        var user = "vsapiuser";
        var pass = "BejB75sV";
        var url = 'http://localhost:8080/getProducts';

        var authorizationBasic = window.btoa(user + ':' + pass);
        var config = {
          "headers":{
            "Authorization": "Basic " + authorizationBasic
          }
        };

        axios.get(url, config).then(function(response){
          console.log(response);
        })

        // axios.get(
        //   'http://localhost:8080/getProducts',
        //   {withCredentials: true,
        //   headers:{
        //     "Accept": "application/json",
        //     "Content-Type": "application/json"
        //   }
        //   }
        //   ,{
        //     auth: {
        //       username: 'vsapiuser',
        //       password: 'BejB75sV'
        //   }
        //   }).then(function(response){
        //     console.log(response);
        //   })
      }
    },
    mounted(){
      this.getList();
    }
}
</script>