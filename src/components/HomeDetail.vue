<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      <br>Mit dem folgenden Button kannst du den Prozess der Agenten neu starten.<br>
    </p>
     <b-button v-on:click="startProcess" variant="info" class="m-1">
      Starte jetzt
    </b-button>
    
   
  </div>
</template>

<script>
export default {
  name: 'HomeDetail',
  props: {
    msg: String,
    startProcess: Function,
  },
  data: () => ({
    showDismissibleAlert: false
  })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
