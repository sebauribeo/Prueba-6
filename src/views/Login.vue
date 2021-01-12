<template>
    <div>

<!-- HEADER -->

        <b-container class="my-5">
            <h1>
                <span>¡</span>
                <span>B</span>
                <span>i</span>
                <span>e</span>
                <span>n</span>
                <span>v</span>
                <span>e</span>
                <span>n</span>
                <span>i</span>
                <span>d</span>
                <span>o</span>
                <span>!</span>
            </h1>

<!-- FORM INICIO SESION -->
            
            <h2 class="text-center text-white">Ingresa a tu sesion.</h2>
            <div>
                <b-card style="max-width: 20rem;" class="text-center mx-auto mt-4" bg-variant="light" border-variant="secondary">
                    <b-avatar></b-avatar>
                    <b-form @submit.prevent="login" @reset="onReset" v-if="showFormReg">
                        <b-form-group id="input-group-2" label="Correo Electrónico:" label-for="input-2">
                            <b-form-input id="input-2" v-model="form.email" type="email" placeholder="Ingresa tu correo electrónico" required ></b-form-input>
                        </b-form-group>
                        <b-form-group id="input-group-3" label="Password:" label-for="input-3">
                            <b-form-input v-model="form.password" :state="validation" id="feedback-user" type="password"></b-form-input>
                                <b-form-invalid-feedback :state="validation">
                                    Ingresa entre 5 y 10 caracteres.
                                </b-form-invalid-feedback>
                                <b-form-valid-feedback :state="validation">
                                    ¡Bien hecho!.
                                </b-form-valid-feedback>
                        </b-form-group>
                        <b-button type="submit" variant="success">Login</b-button>
                        <p class="text-center m-2">¿No estas registrado?</p>
                        <b-button type="reset" variant="info" class="" @click="$router.push('/registro')">Registrate</b-button>
                    </b-form>
                </b-card>
            </div>
        </b-container>
    </div>
</template>

// SCRIPTS

<script>
import firebase from 'firebase';

export default {
    name: 'Login',
    data() {
        return {
            form: {
                email: '',
                password: '',
            },
            showFormReg: true
        }
    },
    methods: {
        login(){
            if (this.form.password.length > 5 && this.form.email) {
                firebase.auth().signInWithEmailAndPassword(this.form.email, this.form.password)
                .then(() => {
                    this.$notify({
                        title: '¡Completado!',
                        message: 'Haz iniciado sesion',
                        type: 'success'
                    });
                    this.$router.push({name: 'Administracion'})
                })
                .catch(() => {
                    this.$notify.error({
                        title: 'Error de Ingreso',
                        message: 'Error en los datos ingresados',
                        position: 'top-right',
                    });
                });
            } else {
                this.$notify.error({
                    title: 'Error de Ingreso',
                    message: 'Error en los datos ingresados',
                    position: 'top-right',
                });
            }
        },
        onReset(event){
            event.preventDefault()
            this.form.email = '';
            this.form.password = '';
            this.showFormReg = false
            this.$nextTick(() => {
                this.showFormReg = true
            });
        },
    },
    computed: {
        validation() {
            return this.form.password.length > 4 && this.form.password.length < 11
        }
    }
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