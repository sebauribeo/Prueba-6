<template>
    <div class="container">
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

<script>
import {mapGetters} from 'vuex';

    export default {
        name: 'Stock',
        computed: {
        ...mapGetters(['enviandoStock'])
    },
    }
</script>

<style>
img-src{
    height: 100px;
}

</style>