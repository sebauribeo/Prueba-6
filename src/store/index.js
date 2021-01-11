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
    traerStock({commit}){
      firebase.firestore().collection("datos").orderBy("codigo", "asc").onSnapshot(result =>{
        let datosStock = [];
        result.forEach(element => {
          datosStock.push({
            idDoc: element.id,
            codigo: element.data().codigo,
            nombre: element.data().nombre,
            stock: element.data().stock,
            precio: element.data().precio,
          })
        });
        commit('mutandoStock',datosStock);
      })
    },
    cargandoUsuario({commit},userData){
      commit('mutandoUser',userData);
    },
    agregandoStock(context,stock){
      return firebase.firestore().collection('datos').add({...stock});
    },
    borrandoStock(context, id){
      firebase.firestore().collection("datos").doc(id).delete()
      .then(()=>console.log("Datos borrado")).catch(error => console.error(error));
    },

    editarStock(context, item) {
      console.log(item)
      firebase.firestore().collection('datos').doc(item).update({...item})
  },
    
  },    
})
