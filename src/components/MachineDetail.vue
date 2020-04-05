<template>
    <div>
      <b-col>
        <b-card
          img-src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRIyZk8xeEQgaRz2BlnyS9kijaRj6_5LMlZnW4FpdwaKsNT6kNr"
          img-alt="Image"
          img-top
          tag="article"
          class="mb-2"
          style="max-width: 20rem;"
        >
        <b-card-title>
          {{name}}
          </b-card-title>
        <b-card-text v-for="(value) in MachineTask" v-bind:key="value.id">
            {{ value.description }},  {{ value.duration }}s
        </b-card-text>

        <div>
            <div v-if="!newList">
              <b-button v-b-modal.modal-scrollable v-on:click="onShowModal" disable>No product planned</b-button>
            </div>
            <div v-if="newList">
              <b-button v-b-modal.modal-scrollable v-on:click="onShowModal">Todo:current Product</b-button>

              <b-modal id="modal-scrollable" v-if="showModal"  @close="showModal=false" @cancel="showModal=false" no-close-on-backdrop  @ok="showModal=false" scrollable title="Scrollable Content">
                    <b-table striped hover :items="newList"></b-table>
              </b-modal>
            </div>
              
      </div> 
      </b-card>
    </b-col>
  </div>
</template>


<script>



import axios from 'axios'

export default {
    name: 'MachineDetail',
    props: {
        id: Number,
        name: String,
    }, 
    data: () => ({
        MachineTask: [],
        MachineTransactions: [],
        newList: [],
        showModal: false

    }), 
    mounted() {
      this.getTasks(this.id)
      this.getTransactions(this.id)
    },
    methods: {
      getTasks(index) {
        var user = "vsapiuser";
        var pass = "BejB75sV";
        var url = 'https://vsapi.wegmann.dev/getTasks';

        var authorizationBasic = window.btoa(user + ':' + pass);
        var config = {
          "headers":{
            "Authorization": "Basic " + authorizationBasic
          }
        };
      var newUrl = url + "?machine_id="+index
        axios.get(newUrl, config).then(response => {
          this.MachineTask = response.data
        })
        },
      getTransactions(index) {
        var user = "vsapiuser";
        var pass = "BejB75sV";
        var url = 'https://vsapi.wegmann.dev/getTransactions';

        var authorizationBasic = window.btoa(user + ':' + pass);
        var config = {
          "headers":{
            "Authorization": "Basic " + authorizationBasic
          }
        };
      var newUrl = url + "?machine_id="+index

        axios.get(newUrl, config).then(response => {
          for(var i=0; i < response.data.length; i++) {
            this.getProductName(response.data[i].product_id, response.data[i]).then(ok => {
              console.log(ok)

            });
          }
        })
       
        
        
      },
      getProductName(id, response1) {
        return new Promise((resolve) => {
           var user = "vsapiuser";
          var pass = "BejB75sV";
          var url = 'https://vsapi.wegmann.dev/getProduct';

          var authorizationBasic = window.btoa(user + ':' + pass);
          var config = {
            "headers":{
              "Authorization": "Basic " + authorizationBasic
            }
          };
          var newUrl = url + "/" + id
          var productName1 = ""

            axios.get(newUrl, config).then(response => {
              productName1 = response.data.name
              this.newList.push({Product: productName1, Task: response1.task_id, End: response1.end, Begin: response1.begin, Status: response1.status})
              resolve("Success");
            })    
          
        });
      },
      onShowModal(){
          this.showModal = true;
      },
    }
    }
</script>