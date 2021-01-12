<template>
    <div class="container">

<!-- HEADER -->

        <h1>
          <span>A</span>
          <span>d</span>
          <span>m</span>
          <span>i</span>
          <span>n</span>
          <span>i</span>
          <span>s</span>
          <span>t</span>
          <span>r</span>
          <span>a</span>
          <span>c</span>
          <span>i</span>
          <span>ó</span>
          <span>n</span>
        </h1>

<!-- TABLA DE DATOS -->
        
        <button type="button" class="btn btn-success btn-lg btn-block rounded-pill my-3" data-toggle="modal" data-target="#exampleModal">Agregar nuevo stock</button>

        <div class="container" v-if="enviandoStock.length > 0">
            <table class="table bg-light text-dark" >
                <thead class="text-center">
                    <tr>
                        <th>#</th>
                        <th>Codigo</th>
                        <th>Nombre</th>
                        <th>Stock</th>
                        <th>Precio</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                    </tr> 
                </thead>
                <tbody class="text-center">
                    <tr v-for="(item, index) in enviandoStock" :key="index">
                        <td>{{index+1}}</td>
                        <td>{{item.codigo}}</td>
                        <td>{{item.nombre}}</td>
                        <td>{{item.stock}}</td>
                        <td>{{item.precio}}</td>
                        <td><button type="button" class="btn btn-success rounded-pill" v-b-tooltip.bottom.hover title="Preciona para editar" @click.prevent="editor(item.idDoc)"><b-icon icon="pencil-square" aria-hidden="true" ></b-icon></button></td>
                        <td><button type="button" class="btn btn-danger  rounded-pill" @click="eliminando(item.idDoc)" v-b-tooltip.bottom.hover title="Preciona para eliminar"><b-icon icon="trash" aria-hidden="true" variant="light"></b-icon></button></td>
                    </tr>
                </tbody>
            </table>
        </div>

<!-- ALERTA -->

        <div class="container" v-else>
            <div class="alert alert-danger" role="alert">
                No hay productos para mostrar
            </div>
        </div>

<!-- MODAL PARA AGREGAR STOCK -->

        <div v-for="(item, index) in enviandoStock" :key="index">
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Agregar stock</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form>
                  <div class="form-group">
                    <label for="recipient-name" class="col-form-label">Codigo:</label>
                    <input type="text" class="form-control" id="recipient-name" v-model="codigo">
                  </div>
                  <div class="form-group">
                    <label for="recipient-name" class="col-form-label">Nombre:</label>
                    <input type="text" class="form-control" id="recipient-name" v-model="nombre">
                  </div>
                  <div class="form-group">
                    <label for="recipient-name" class="col-form-label">Imagen Url:</label>
                    <input type="text" class="form-control" id="recipient-name" v-model="imagen">
                  </div>
                  <div class="form-group">
                    <label for="recipient-name" class="col-form-label">Stock:</label>
                    <input type="number" class="form-control" id="recipient-name" v-model="stock">
                  </div>
                  <div class="form-group">
                    <label for="recipient-name" class="col-form-label">Precio:</label>
                    <input type="number" class="form-control" id="recipient-name" v-model="precio">
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-danger rounded-pill col" data-dismiss="modal">Cerrar</button>
                <button type="button" class="btn btn-success rounded-pill col" data-dismiss="modal" @click="agregarStock(item.idDoc)">Guardar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

// SCRIPTS

<script>
import {mapGetters} from 'vuex';

    export default {
    name: 'Administracion',
    data(){
      return {
          codigo: '',
          nombre: '',
          imagen: '',
          stock: '',
          precio: '',

      }
    },
    computed: {
        ...mapGetters(['enviandoStock'])
    },
    methods: {

//BOTON HACIA EDITAR

      editor(idDoc){
        this.$router.push({name: 'Editar', params: {id: idDoc}});
      },

//AGREGAR DATOS

      agregarStock(item){
        console.log('agregarStock', item)
        this.$confirm('¿Estás seguro que deseas agregar el juguete seleccionado?', {
              confirmButtonText: 'Si',
              cancelButtonText: 'Cancel',
              type: 'warning',
              center: true
        }).then(() => {
          if (this.codigo && this.nombre && this.stock >= 0 && this.precio >0) {
            let datos = {
              codigo: this.codigo,
              imagen: this.imagen,
              nombre: this.nombre,
              stock: this.stock,
              precio: this.precio,
            };
              this.$store.dispatch('agregandoStock',datos);
              console.log('agregarStock', datos)                
              this.codigo = '';
              this.imagen = '';
              this.nombre = '';
              this.stock = '';
              this.precio = '';
              this.$notify({
                title: '¡Completado!',
                message: 'Haz Agregado al Stock',
                type: 'success'
              });
          }else {
            this.$notify.error({
              title: 'Error de Ingreso',
              message: 'Ingresa solo números positivos',
              position: 'top-right',
            });
          }
        })
      },  

// ELIMINAR DATOS

      eliminando(id){
        console.log('eliminando',id);
        this.$confirm('¿Estás seguro que deseas eliminar los datos?', {
          confirmButtonText: 'Si',
          cancelButtonText: 'Cancel',
          type: 'warning',
          center: true
        }).then(() => {
          this.$store.dispatch('borrandoStock',id);
          this.$notify({
          title: '¡Completado!',
          message: 'Haz eliminado los datos',
          type: 'success'
          });
        })
      },
    },
}
</script>

// ESTILOS

<style>
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