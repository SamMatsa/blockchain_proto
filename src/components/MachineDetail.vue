<template>
    <div>
      <b-col>
        <b-card
          img-src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRIyZk8xeEQgaRz2BlnyS9kijaRj6_5LMlZnW4FpdwaKsNT6kNr"
          img-alt="Image"
          img-top
          tag="article"
          class="mb-2"
          style="max-width: 20rem;">
        <div v-if="name">
          <b-card-title>
            {{name}}
          </b-card-title>
        </div>
        <div v-if="!name">
          <b-card-title>
            Keine Maschine definiert
          </b-card-title>
        </div>
        <div>
          <div v-if="tasks">
            <b-card-text  v-for="(value) in tasks" v-bind:key="value.id">
                {{ value.description }},  {{ value.duration }}s
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
            <b-button v-b-modal.modal-scrollable v-on:click="onShowModal">Alle Produkte</b-button>   
            <b-modal id="modal-scrollable" 
              size="xl" 
              v-if="showModal"  
              @close="showModal=false" 
              @cancel="showModal=false" 
              no-close-on-backdrop  
              @ok="showModal=false" 
              scrollable 
              title= "Transactions:">
              <b-table striped hover :items="transactions"></b-table>
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
        showModal: false
    }), 
    methods: {
     
      onShowModal(){
          this.showModal = true;
      },
    }
    }
</script>