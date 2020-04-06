<template>
<b-col>
  <b-card
    :title="name"
    img-alt="Image"
    img-top
    tag="article"
    style="max-width: 30rem;"
    class="mb-2"
  >
  <b-card-text >
      {{ this.type }}
  </b-card-text>
  <!-- <p> {{ this.type }}</p>
  <label v-for="transaction in transactions" :key="transaction.id">
   <b-alert show :variant="returnSuccessVar()">{{ this.transactions[0].task }}</b-alert>
  </label> -->

  <b-container>
  <!-- <b-row align-v="center"> -->

  <li v-for="trans in transactions" :key="trans.id">
    {{ trans.task }} | {{ trans.machine }} | {{ getStatus(trans.status) }}
  </li>
    <!-- <product-detail-list-component v-for="trans in transactions" :key="trans.id"
      :taskName="trans.task"
    ></product-detail-list-component > -->

  <!-- </b-row> -->
</b-container>
  </b-card>
</b-col>

</template>

<script>
// import ProductDetailListComponent from '../components/ProductDetailListComponent';
export default {
  // components: {ProductDetailListComponent},
  props:["name", "type", "transactions"],
  data(){
      return{
        successVar: "success"
      }
    },
  methods:{
      getStatus(status){
          switch (status) {
            case "in progress":
              return "⏳";
            case "done":
              return "✔️";
            default: "t.b.a"
              return "tba"
          }
      }
      }
}
</script>