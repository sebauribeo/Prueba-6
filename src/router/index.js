import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase';


Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "Home" */ '../views/Home.vue')
  },
  {
    path: '/administracion',
    name: 'Administracion',
    component: () => import(/* webpackChunkName: "Administracion" */ '../views/Administracion.vue'),
    meta: {
      requiresAuth: true 
    }
  },
  {
    path: '/registro',
    name: 'Registro',
    component: () => import(/* webpackChunkName: "Registro" */ '../views/Registro.vue'),
  },
  {
    path: '/editar/:id',
    name: 'Editar',
    props: true,
    component: () => import(/* webpackChunkName: "Editar" */ '../views/Editar.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/Login.vue')
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "NotFound" */ '../views/NotFound.vue')
  },
  {
    path: '*',
    redirect: '/404'
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to,from,next)=>{
  let usuario = firebase.auth().currentUser;
  let login = to.matched.some(result => result.meta.requiresAuth);

  if (!usuario && login) {
    next({name: 'Login'})
  } else if(usuario && !login) {
    next();
  } else {
    next();
  }
});

export default router
