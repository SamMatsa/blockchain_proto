<template>

        <div class="container-fluid">
          <div class="row">
<!-- <b-container> -->
  <!-- <b-row align-v="center"> -->

    <product-detail
    v-for="product in productsFinal" :key="product.id"
    :name="product.name"
    :type="product.type"
    :transactions="product.transactions"
    ></product-detail>

  <!-- </b-row> -->
<!-- </b-container> -->
            <!-- <div class="col-sm d-flex">
              <div class="card card-body flex-fill">
                Another small card content.
              </div>
            </div> -->
          </div>
        </div>




<!-- <b-container>
  <b-row align-v="center">
    <product-detail 
    v-for="product in productsFinal" :key="product.id"
    :name="product.name"
    :type="product.type"
    :transactions="product.transactions"
    ></product-detail>
  </b-row>
</b-container> -->
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
          // console.log(this.productsFinal);
      },

      async addTransactionsToProducts(products){
        var newArray = [];
        var productsArray = products;
        var taskNames = await this.sendRequest("getTasks");

        for (var i = 0; i < productsArray.length; i++) {
          var transactions = await this.sendRequest(`getTransactions?product_id=${productsArray[i].id}`);

          if(transactions != null){
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
          else
          {
            productsArray[i].transactions = [];
          }
        }

        for (var k = 0; k < productsArray.length; k++) {
          var productName = productsArray[k].name;
          var productType = productsArray[k].model_name;
          var productTransactions = [];


          for (var g = 0; g < productsArray[k].transactions.length; g++){
              
            var transactionTemp = productsArray[k].transactions[g];

            var machineName = transactionTemp.machine.name;
            var transactionTaskName = transactionTemp.task.description;
            var transactionTaskStatus = transactionTemp.status;
            var transactionId = transactionTemp.id;

            productTransactions.push({
              id: transactionId,
              machine: machineName, 
              task: transactionTaskName, 
              status: transactionTaskStatus})

          }


          newArray.push({
            name: productName, 
            type: productType,
            transactions: productTransactions
            })

        }

        return newArray;
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