<template>
    <div class="container">

<!-- HEADER -->
      <h1>
        <span>P</span>
        <span>r</span>
        <span>o</span>
        <span>d</span>
        <span>u</span>
        <span>c</span>
        <span>t</span>
        <span>o</span>
        <span>s</span>
      </h1>

<!-- CARDS DE PRODUCTOS -->

      <div >
          <b-row>
            <b-col cols="12" sm="12" md="6" lg="4" xl="4" v-for="(item,index) in enviandoStock" :key="index">
              <b-card :title="item.nombre" img-alt="Image" img-top tag="article" style="height: 350px;" class="card m-2 text-center">
              <b-img :src="item.imagen" class="imagen"></b-img>
                <b-card-footer class="p-0">
                    <p><strong>Precio: </strong>${{item.precio}}</p>
                    <p><strong>stock: </strong>{{item.stock}} unidades.</p>
                </b-card-footer>
              </b-card>
          </b-col>
        </b-row>
      </div>        
    </div>
</template>

// SCRIPTS

<script>
import {mapGetters} from 'vuex';

    export default {
      name: 'Stock',
      computed: {
      ...mapGetters(['enviandoStock'])
    },
    }
</script>

// ESTILOS

<style scoped>
h1 {
  color:  #00b7ff;
  font-size: 70px;
  display: flex;
  align-content: center;
  justify-content: center;
}
h1 span {
  display: table-cell;
  margin: 0;
  padding: 0;
  animation: animate 2s linear infinite;
}
@keyframes animate{
  0%, 100% {
    color: #fff;
    filter: blur(0px);
    text-shadow: 0 0 10px #00b7ff, 0 0 20px #00b7ff, 0 0 30px #00b7ff, 0 0 40px #00b7ff,0 0 50px #00b7ff;
  }
}
.card{
  border-radius: 25px;
  background: rgba(0, 0, 0, 0.767);
  color: white;
}
.imagen{
  border-radius: 25px;
  height: 200px;
  width: 100%;
}
</style>