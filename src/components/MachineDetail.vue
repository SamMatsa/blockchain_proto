<template>
    <div>
      <b-col>
        <b-card
          img-src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRIyZk8xeEQgaRz2BlnyS9kijaRj6_5LMlZnW4FpdwaKsNT6kNr"
          img-alt="Image"
          img-top
          tag="article"
          class="mb-2"
          style="width: 25rem; height: 35rem; max-height:35rem; min-width: 25rem"
          header-tag="header">
      
          <template v-slot:header> 
            <div v-if="name">
              <h6 class="mb-0">{{name}}</h6>
            </div>
            <div v-if="!name">
              <h6 class="mb-0"> Keine Maschine definiert</h6>
            </div>
          </template>
       
       
        <div>
          <div v-if="tasks">
            <b-card-text  v-for="(value) in tasks.slice(0,2)" v-bind:key="value.id">
                {{ value.description }}, {{ value.duration }}s 
            </b-card-text>
          </div>
          <div v-if="!tasks">
            <b-card-text >
                Keine Aufgaben definiert
            </b-card-text>
          </div>
        </div>

        <div>
          <br>
          <div v-if="currentProduct">
            <b-card-text >
              <b>Aktuelles Produkt:</b>
              <div v-if="currentProduct.length<20">{{ currentProduct }}</div><div v-else>{{ currentProduct.substring(0,20)+"..." }}</div>
            </b-card-text>
          </div>
          <div v-if="!currentProduct">
            <b-card-text >
                <b>Aktuelles Produkt:</b> <br> -
            </b-card-text>
          </div>
        </div>

        <div>
          <br>
          <div v-if="!transactions">
            <b-button v-b-modal.modal-scrollable disable>Keine Produkte</b-button>
          </div>
          <div v-if="transactions">
            <b-button style="position: relative; bottom: 20px;" variant="success" v-b-modal.modal-scrollable v-on:click="onShowModal">Alle Produkte</b-button>   
            <b-modal id="modal-scrollable" 
              size="xl" 
              v-if="showModal"  
              @close="showModal=false" 
              @cancel="showModal=false" 
              no-close-on-backdrop  
              @ok="showModal=false" 
              scrollable 
              title= "Transaktionen:">
              <b-table striped hover :items="transactions"  :fields="fields"></b-table>
            </b-modal>
          </div>
       
        
      </div> 
      </b-card>
    </b-col>
  </div>
</template>


<script>

export default {
    name: 'MachineDetail',
    props: {
        id: Number,
        name: String,
        currentProduct: String,
        tasks: Array,
        transactions: Array
    }, 
    data: () => ({
        showModal: false,
        fields: [
          { key: 'Product', label: 'Produkt' },
          { key: 'Task', label: 'Aufgabe' },
          { key: 'Begin', label: 'Beginn' },
          { key: 'End', label: 'Ende' },

          { key: 'Status', label: 'Status' },
        ]
    }), 
    methods: {
     
      onShowModal(){
          this.showModal = true;
      },
    }
    }
</script>
