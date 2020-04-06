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

            <b-modal id="modal-scrollable" size="xl" v-if="showModal"  @close="showModal=false" @cancel="showModal=false" no-close-on-backdrop  @ok="showModal=false" scrollable title="Scrollable Content">
                  <b-table striped hover :items="MachineTransaction"></b-table>
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
        newList: [],
        MachineTransaction: [],
        showModal: false
    }), 
    mounted() {
      this.getTasks(this.id)
      this.getTransactions(this.id)
      setInterval(() => {
        this.getTransactions(this.id) 
        // location.reload();
        console.log("Refresh!")
      }, 10000);
      
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
        this.newList = []
        for(var i=0; i < response.data.length; i++) {
          var response1 = response.data[i]
          this.newList.push({Product: response1.product.name, Task: response1.task.description, End: response1.end, Begin: response1.begin, Status: response1.status})
        }
        this.MachineTransaction = this.newList

      })
      },
      onShowModal(){
          this.showModal = true;
      },
    }
    }
</script>