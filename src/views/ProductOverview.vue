<template>
        <div class="container-fluid">
          <b-container>
              <b-spinner v-if="productsFinal.length === 0" label="Loading..."></b-spinner>
            </b-container>
          <div class="row">

  <div class="columns" v-for="chunk in productChunks" :key="chunk.id">   
    <product-detail
    v-for="product in chunk" :key="product.id"
    :name="product.name"
    :type="product.type"
    :transactions="product.transactions"
    ></product-detail>
  </div>
          </div>
        </div>
</template>

<script>
import ProductDetail from '../components/ProductDetail';
import _ from 'lodash'
import axios from 'axios';

export default {
    components:{
        ProductDetail
    },
    computed: {
      productChunks(){
          return _.chunk(Object.values(this.productsFinal), 4);
      }
    },
    data(){
      return{
        list: [],
        polling : null,
        lastResponseObject : null,
        productsFinal: [],
        theRawArray: []
      }
    },
    methods:{
      async sendRequest(endpoint){
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
      },

      async addTransactionsToProducts(products){
        var newArray = [];
        var productsArray = products;
        this.theRawArray = products;
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

            //push to clean array
            productTransactions.push({
              id: transactionId,
              machine: machineName, 
              task: transactionTaskName, 
              status: transactionTaskStatus})

          }

          //Mache hier tasks
          for (var q = 0; q < productsArray[k].tasks.length; q++){
            if(productsArray[k].tasks.length != productTransactions.length){
            var index = productTransactions.length;

            productTransactions.push({
              // id: transactionId,
              machine: "-", 
              task: productsArray[k].tasks[index].description, 
              status: "-"})
            }

            console.log(productsArray[k].tasks[index])
          }


          //push to clean array
          newArray.push({
            name: productName, 
            type: productType,
            transactions: productTransactions
            })

        }

        return newArray;
      },
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