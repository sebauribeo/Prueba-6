<template>
  <div>
    <div >
      <NavBar/>
    </div>
  </div>
</template>

// SCRIPTS

<script>
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
    margin: 0;
    padding: 0;
    background: url('./assets/Fondo.jpg');
    width: 100%;
    height: 100%;
    font-family: -apple-system;
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
</style>
