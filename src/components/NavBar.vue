<template>
  <div>
    <div>
      <b-navbar toggleable="lg" type="light" variant="warning">
        <b-container>
        <b-navbar-brand>
          <router-link to="/"><img class="imagenLogo" src="../assets/logo.png" alt="Logo"></router-link>
        </b-navbar-brand>
          <b-navbar-brand class="text-dark"><strong>KLAUSS</strong></b-navbar-brand>
        <b-navbar-toggle target="nav-collapse" ></b-navbar-toggle>
        <b-collapse variant="dark" id="nav-collapse" is-nav >
          <b-navbar-nav class="ml-auto">
            <b-nav-item><router-link class="nav-link text-dark mr-4" to="/"><strong>Home</strong></router-link></b-nav-item>
            <b-nav-item><router-link class="nav-link text-dark mr-4" to="/login"><strong>Log in</strong></router-link></b-nav-item>
            <b-nav-item><a class="nav-link text-dark mr-4" :class="activandoSOut" href="#" tabindex="-1" v-if="!existeUser" @click="signOut"><strong>Sign Out</strong></a></b-nav-item>
            <b-nav-item><router-link class="nav-link text-dark mr-4" :class="activandoSOut" :to="{name: 'Administracion'}" v-if="!existeUser"><strong>Administracion</strong></router-link></b-nav-item>
          </b-navbar-nav>
        </b-collapse>
        </b-container>
      </b-navbar>
    </div>
    
    <router-view/>

  </div>
</template>

<script>
import { mapGetters } from "vuex";
import firebase from 'firebase';


export default {
  name: 'NavBar',
  computed: {
    ...mapGetters(['enviandoUser']),


    activandoSOut(){
      return this.existeUser ? 'disabled' : '';
    },
    existeUser(){
      return !this.enviandoUser;
    },
  },
   methods: {
      signOut(){
            firebase.auth().signOut().then(() => {
                console.log("Haz cerrado sesion");
                this.$router.replace({name: 'Login'});
            }).catch((error) => {
                console.error(error);
            });
        }
    },
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
