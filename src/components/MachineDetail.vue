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
        <b-card-title>
          {{name}}
        </b-card-title>
        <b-card-text v-for="(value) in tasks" v-bind:key="value.id">
            {{ value.description }},  {{ value.duration }}s
        </b-card-text>

        <div>
          <div v-if="!transactions">
            <b-button v-b-modal.modal-scrollable v-on:click="onShowModal" disable>No product planned</b-button>
          </div>
          <div v-if="transactions">
            <b-button v-b-modal.modal-scrollable v-on:click="onShowModal">Todo:current Product</b-button>

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