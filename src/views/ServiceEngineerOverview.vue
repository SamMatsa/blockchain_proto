<template>
<b-container class="bv-example-row">
    <ServiceEngineerListElement />
    <ServiceEngineerListElement />
    <ServiceEngineerListElement />
    <ServiceEngineerListElement />
</b-container>
</template>

<script>
import ServiceEngineerListElement from '../components/ServiceEngineerListElement'
export default {
    components:{
        ServiceEngineerListElement
    },
    data() {
      return {
        items: [
          { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          { age: 89, first_name: 'Geneva', last_name: 'Wilson' },
          { age: 38, first_name: 'Jami', last_name: 'Carney' }
        ]
      }
    }
}
</script>