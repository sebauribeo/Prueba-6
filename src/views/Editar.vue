<template>
    <div class="container my-5">

<!-- HEADER -->

        <h1>
            <span>E</span>
            <span>d</span>
            <span>i</span>
            <span>t</span>
            <span>a</span>
            <span>r</span>
        </h1>

<!-- CARD EDITOR DE JUGUETES -->

        <h2 class="text-center text-white mt-4">Editando a: <strong>{{nombre}}</strong></h2>
        <div class="card mt-3">
            <form class="text-white container" @submit.prevent="editarStock">
                <div class="mb-2">
                    <label for="codigo" class="form-label">Codigo</label>
                    <input type="text" class="form-control" id="codigo" v-model="codigo">
                </div>
                <div class="mb-2">
                    <label for="nombre" class="form-label">Nombre</label>
                    <input type="text" class="form-control" id="nombre" v-model="nombre">
                </div>
                <div class="mb-2">
                    <label for="imagen" class="form-label">Imagen URL</label>
                    <input type="text" class="form-control" id="imagen" v-model="imagen">
                </div>
                <div class="mb-2">
                    <label for="stock" class="form-label">Stock </label>
                    <input type="number" class="form-control" id="stock" v-model="stock">
                </div>
                <div class="mb-2">
                    <label for="precio" class="form-label">Precio</label>
                    <input type="number" class="form-control" id="precio" v-model="precio">
                </div>
                <div class="text-center my-2">
                    <button type="submit" class="btn btn-success m-3 rounded-pill btn-outline-light">Guardar</button>
                    <button type="button" class="btn btn-danger m-3 rounded-pill btn-outline-light" @click="$router.go(-1)">Regresar</button>
                </div>
            </form>
        </div>
    </div>
</template>

// SCRIPTS

<script>
import { mapGetters } from "vuex";

export default {
    name: 'Editando',
    props: ['id'],
    data() {
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

// EDITAR JUGUETE

        editarStock(){
            this.$confirm('¿Estás seguro que deseas editar el juguete seleccionado?', {
                confirmButtonText: 'Si',
                cancelButtonText: 'Cancel',
                type: 'warning',
                center: true
        }).then(() => {
            if (this.codigo && this.nombre && this.imagen && this.stock >= 0 && this.precio > 0) {
                let datos = {
                    codigo: this.codigo,
                    nombre: this.nombre,
                    imagen: this.imagen,
                    stock: this.stock,
                    precio: this.precio,
                    idDoc: this.id,
                };
                this.$store.dispatch('editarStock',datos);
                setTimeout(()=>{
                    this.$router.push({name: 'Administracion'});
                },1000);
            } else {
                console.log("No se puede editar los datos");
                this.$notify.error({
                title: 'Error de Ingreso',
                message: 'Ingresa solo números positivos',
                position: 'top-right',
            });
            }
        })
        },

    },
    mounted() {
        let datos = this.enviandoStock.find(stock => stock.idDoc === this.id);
        if(datos !== undefined){
            this.codigo = datos.codigo;
            this.nombre = datos.nombre;
            this.imagen = datos.imagen;
            this.stock = datos.stock;
            this.precio = datos.precio;
        }else {
            console.log("No hay datos");
            setTimeout(()=>{
                this.$router.push({name: 'Administracion'});
            },1000);
        }
    }

}
</script>

// ESTILOS

<style scoped>
h1 {
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
.card{
  border-radius: 25px;
  background: rgba(0, 0, 0, 0.767);
  color: white;
}
</style>