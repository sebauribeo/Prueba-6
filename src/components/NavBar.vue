<template>
  <div>
    <div>
      <b-navbar toggleable="lg" type="light" variant="warning" class="p-0 m-0">
        <b-container>
        <b-navbar-brand class="p-0 m-0">
          <img class="imagenLogo" src="../assets/logo.png" alt="Logo"></b-navbar-brand>
          <b-navbar-brand class="text-dark"><strong>KLAUSS</strong></b-navbar-brand>
        <b-navbar-toggle target="nav-collapse" ></b-navbar-toggle>
        <b-collapse variant="dark" id="nav-collapse" is-nav >
          <b-navbar-nav class="ml-auto">
            <b-nav-item href="#"><router-link class="text-dark mr-4" to="/"><strong>Log in</strong></router-link></b-nav-item>
            <b-nav-item href="#"><router-link class="text-dark mr-4" to="/administracion"><strong> Administracion</strong></router-link></b-nav-item>
          </b-navbar-nav>
        </b-collapse>
        </b-container>
      </b-navbar>
    </div>
    
    <router-view/>

  </div>
</template>

<script>
export default {
  name: 'NavBar',
}
</script>

<style >
body {
  font-family: 'Bangers', cursive;
}
.imagenLogo {
  height: 100px;
  margin: 0;
  padding: 0;
  transition: 1s;
}
.imagenLogo:hover{
transform: scale(1.1);
transition: 1s;
}

</style>
