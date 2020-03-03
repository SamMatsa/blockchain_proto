<template>
<b-container>
  <b-row align-v="center">
    <b-col><MachineDetail /></b-col>
    <b-col><MachineDetail /></b-col>
    <b-col><MachineDetail /></b-col>
  </b-row>
</b-container>
</template>

<script>
import MachineDetail from '../components/MachineDetail'
export default {
    components:{
        MachineDetail
    }
}
</script>