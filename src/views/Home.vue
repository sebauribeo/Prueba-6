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
              <b-card
                :title="item.nombre"
                img-alt="Image"
                img-top
                tag="article"
                style="height: 22rem;"
                class="m-2 text-center"
                border-variant="dark"
              >
              <b-img :src="item.imagen" style="width: 250px; height: 200px;"></b-img>
                <b-card-footer class="mt-2">
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

<style>
img-src{
    height: 100px;
}
h1 {
  font-family: monospace;
    margin-top: 20px;
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
</style>