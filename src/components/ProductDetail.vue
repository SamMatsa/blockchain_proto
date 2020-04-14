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

  <b-container>
  <li style="list-style-type : none" v-if="transactions.length === 0">Production starting soon...</li>
  <li style="list-style-type : none" v-for="trans in transactions" :key="trans.id">
    {{ trans.task }} | {{ trans.machine }} | {{ getStatus(trans.status) }}
  </li>

</b-container>
  </b-card>
</b-col>

</template>

<script>
export default {
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
              return "-"
          }
      }
      }
}
</script>