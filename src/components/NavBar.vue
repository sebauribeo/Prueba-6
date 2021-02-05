<template>
  <div>
    <div>
      <b-navbar toggleable="lg" type="light" variant="warning" class="navBar">
        <b-container>
          <b-navbar-brand>
            <router-link to="/"><img class="imagenLogo" src="../assets/logo.png" alt="Logo"></router-link>
          </b-navbar-brand>
            <b-navbar-brand class="text-dark"><strong>KLAUSS</strong></b-navbar-brand>
          <b-navbar-toggle target="nav-collapse" ></b-navbar-toggle>
          <b-collapse variant="dark" id="nav-collapse" is-nav >
            <b-navbar-nav class="ml-auto">
              <b-nav-item><router-link class="nav-link text-dark mr-4" to="/"><strong>Home</strong></router-link></b-nav-item>
              <b-nav-item><router-link class="nav-link text-dark mr-4" :class="activandoSOut" :to="{name: 'Administracion'}" v-if="!existeUser"><strong>Administracion</strong></router-link></b-nav-item>
              <b-nav-item><router-link class="nav-link text-dark mr-4" to="/login"><strong>Log in</strong></router-link></b-nav-item>
              <b-nav-item><a class="signOut nav-link text-white mr-4 text-center" :class="activandoSOut" href="#" tabindex="-1" v-if="!existeUser" @click="signOut"><strong>Log Out</strong></a></b-nav-item>
            </b-navbar-nav>
        </b-collapse>
        </b-container>
      </b-navbar>
    </div>

  </div>
</template>

// SCRIPTS

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

  // METODO
  
   methods: {
    signOut(){
      firebase.auth().signOut().then(() => {
        this.$notify({
          title: '¡Haz terminado tu sesión!',
          message: 'Sesión finalizada',
          type: 'success'
        });
          console.log("Haz cerrado sesion");
          this.$router.replace({name: 'Login'});
      }).catch(() => {
          this.$notify.error({
            title: 'Error en salir de sesión',
            message: 'Intentalo nuevamente',
            position: 'top-right',
          });          
      });
    }
  },
}
</script>

// ESTILOS

<style scoped>
.navBar{
  width: 100%;
}
.imagenLogo {
  height: 80px;
  margin: 0;
  padding: 0;
  transition: 1s;
}
.imagenLogo:hover{
transform: scale(1.1);
transition: 1s;
}
.signOut{
  background-color: red;
  border-radius: 25px;
  border: 2px solid black;
  width: 80px;
}


</style>
