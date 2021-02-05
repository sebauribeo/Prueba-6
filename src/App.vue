<template>
  <div>
    <div >
      <NavBar/>
      <router-view></router-view>
    </div>
  </div>
</template>

// SCRIPTS

<script scoped>
import NavBar from '@/components/NavBar.vue'
import firebase from 'firebase';

export default {
  name: 'App',
  components: {
    NavBar
  },
    mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('cargandoUsuario',user);
      }else {
        this.$store.dispatch('cargandoUsuario',null);
      }
    });
    this.$store.dispatch('traerStock');
  },
}
</script>

// ESTILOS

<style >
body {
  background: url('./assets/Fondo.jpg') no-repeat;
  background-size: cover;
  font-family: 'Sriracha', cursive !important;
}

@keyframes bg {
    0%{
        background-position: 0% 50%;
    }
    50%{
        background-position: 100% 50%;
    }
    100%{
        background-position: 0% 50%;
    }
} 
@import url('https://fonts.googleapis.com/css2?family=Sriracha&display=swap');
</style>
