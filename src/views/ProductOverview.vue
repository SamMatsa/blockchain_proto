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
        list: [],
        polling : null,
        lastResponseObject : null,
        productsFinal: []
      }
    },
    methods:{
      async sendRequest(endpoint){
             
        //https://stackoverflow.com/questions/44072750/how-to-send-basic-auth-with-axios

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

      pollDataIntervall(){
        this.polling = setInterval(()=> {
          this.pollData();
        },5000)
      },

      async pollData(){
          var productsRaw = await this.sendRequest("getProducts");
          this.productsFinal = await this.addTransactionsToProducts(productsRaw);
          console.log(this.productsFinal);
      },

      async addTransactionsToProducts(products){
        var productsArray = products;
        var taskNames = await this.sendRequest("getTasks");

        for (var i = 0; i < productsArray.length; i++) {
          var transactions = await this.sendRequest(`getTransactions?product_id=${productsArray[i].id}`);

            for (var y = 0; y < transactions.length; y++) {
              var taskId = transactions[y].task_id;
              var taskName = "";

              for (var x = 0; x < taskNames.length; x++) {
                if(taskId === taskNames[x].task_id){
                  taskName = taskNames[x].description;
                }
              }

              transactions[y].task_name = taskName;

            }
            
          productsArray[i].transactions = transactions;
        }

        return productsArray;
      }
    },
    beforeDestroy(){
      clearInterval(this.polling);
    },
    created(){
      this.pollData();
      this.pollDataIntervall();
    }
}
</script>