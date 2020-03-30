<template>
    <div>
      <b-col>
    <b-card
      img-src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRIyZk8xeEQgaRz2BlnyS9kijaRj6_5LMlZnW4FpdwaKsNT6kNr"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 20rem;"
      class="mb-2"
     
    >
    <b-card-title>
      {{name}}
      </b-card-title>
    <b-card-text v-for="(value) in MachineTask" v-bind:key="value.id">
        {{ value.description }},  {{ value.duration }}s
    </b-card-text>

    <div>
    <b-dropdown id="dropdown-buttons" text="Aktuell: Produkt ABC" class="m-2">
      <b-dropdown-item-button>Produkt 1 | Schrauben | 12:44</b-dropdown-item-button>
      <b-dropdown-item-button>Produkt 2 | Schweißen | 12:32</b-dropdown-item-button>
      <b-dropdown-item-button>Produkt 3 | Schrauben | 12:20</b-dropdown-item-button>
      <b-dropdown-item-button>Produkt 4 | Schrauben | 12:08</b-dropdown-item-button>
    </b-dropdown>

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
        MachineTask: []
    }), 
    mounted() {
      this.getTasks(this.id)
    },
    methods: {
      getTasks(index) {
       console.log(index)
        var user = "vsapiuser";
        var pass = "BejB75sV";
        // var url = 'http://localhost:8081/getTaks';
        var url = 'https://vsapi.wegmann.dev/getTasks';

        var authorizationBasic = window.btoa(user + ':' + pass);
        var config = {
          "headers":{
            "Authorization": "Basic " + authorizationBasic
          }
        };

        axios.get(url, config).then(response => {
          this.MachineTask = response.data
          console.log("Machine Tasks",this.MachineTask)
        })
        }
      
    }
}
</script>
