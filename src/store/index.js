import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase';


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    stock: [],
    user: null,
  },
  getters: {
    enviandoStock(state){
      return state.stock;
    },
    enviandoUser(state){
      return state.user;
    }
  },
  mutations: {
    mutandoStock(state, datosStock){
      state.stock = datosStock;
    },
    mutandoUser(state,userData){
      state.user = userData;
    }
  },
  actions: {

//USUARIO 

    user({commit},userData){
      commit('mutandoUser', userData)
    },

// TRAER DATOS

    traerStock({commit}){
      firebase.firestore().collection("datos").orderBy("codigo", "asc").onSnapshot(result =>{
        let datosStock = [];
        result.forEach(element => {
          datosStock.push({
            idDoc: element.id,
            codigo: element.data().codigo,
            imagen: element.data().imagen,
            nombre: element.data().nombre,
            stock: element.data().stock,
            precio: element.data().precio,
          })
        });
        commit('mutandoStock',datosStock);
      })
    },

//CARGAR USUARIO

    cargandoUsuario({commit},userData){
      commit('mutandoUser',userData);
    },

// AGREGAR JUGUETE

    agregandoStock(context,stock){
      console.log(stock)
      return firebase.firestore().collection('datos').add({...stock});
    },

// BORRAR JUGUETE

    borrandoStock(context, id){
      console.log(id)
      firebase.firestore().collection("datos").doc(id).delete()
      .then(()=>console.log("Datos borrado")).catch(error => console.error(error));
    },

// EDITAR JUGUETE

    editarStock(context, item) {
      console.log(item)
      firebase.firestore().collection('datos').doc(item.idDoc).update({
          codigo: item.codigo,
          nombre: item.nombre,
          imagen: item.imagen,
          stock: item.stock,
          precio: item.precio,
         })
         .then(() => console.log('Edición completa'))
         .catch(error => console.error(error))
         console.log('Datos actualizados');
    },
  },    
})
