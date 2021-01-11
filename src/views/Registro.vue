<template>
    <b-container class="my-5">
        <h2 class="text-center text-white">Registrate como Usuario</h2>
        <div>
            <b-card style="max-width: 22rem;" class="text-center mx-auto mt-4">
                <b-form @submit.prevent="registrouser" @reset="onReset(form.uid)" v-if="showFormReg">
                    
                    <b-form-group id="input-group-2" label="Correo Electrónico:" label-for="input-2" description="Tú información no será compartida.">
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
                    <b-button type="submit" variant="primary" class="mx-3">Registrar</b-button>
                    <b-button type="reset" variant="danger" @click="$router.push('/login')">Volver</b-button>
                </b-form>

            </b-card>
        </div>
    </b-container>
</template>

<script>
import firebase from 'firebase';

export default {
    name: 'Registro',
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
        registrouser(){
            if (this.form.email && this.form.password.length > 4) {
                firebase.auth().createUserWithEmailAndPassword(this.form.email, this.form.password)
                .then((respuesta) => {
                    return respuesta.user.updateProfile({
                    }).then(() => {
                        this.form.email = ""; 
                        this.form.password = "";

                        this.$notify({
                            title: 'Success',
                            message: 'Usuario Registrado con exito',
                            type: 'success'
                        });
                        this.$router.push({name: 'Administracion'}); 
                    }).catch((error) => {
                        console.error(error);
                        this.$notify.error({
                            title: 'Error',
                            message: 'No haz logrado el registro'
                        })
                    });
                })
                .catch((error) => {
                    console.log(error.code);
                    console.log(error.message);
                    this.$notify.error({
                        title: 'Error',
                        message: 'No se puede registrar. Revisa los valores del formulario',
                        duration: 5000
                    })
                });
            } else {
                this.$notify.error({
                    title: 'Error',
                    message: 'No se puede registrar. Revisa los valores del formulario',
                    duration: 5000
                })
            }
        },
        onReset(event){
            event.preventDefault()
            this.form.email = '';
            this.form.password = '';

        // Trick to reset/clear native browser form validation state
            this.showFormReg = false
            this.$nextTick(() => {
                this.showFormReg = true
            });
        }
    },
    computed: {
      validation() {
        return this.form.password.length > 4 && this.form.password.length < 11
      }
    }
}
</script>

<style>

</style>