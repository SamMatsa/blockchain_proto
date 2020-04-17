<template>
  <div id="app">
<div id="navigator" style="margin-bottom: 20px">
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">AGENT</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/">Home</b-nav-item>
        <b-nav-item to="/machine">Maschinen</b-nav-item>
        <b-nav-item to="/product">Produkte</b-nav-item>
        <!-- <b-nav-item to="/service">Servicetechniker</b-nav-item> -->
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item @click="logout()">Logout</b-nav-item>

      
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
    <router-view/>
  </div>
</template>
<script>
// @ is an alias to /src

export default {
 
  methods: {
      logout() {
         localStorage.removeItem("tk")
         this.$router.push({name:'Login'})
      }
  }}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
