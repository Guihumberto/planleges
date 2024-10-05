<template>
    <v-card color="blue-grey-lighten-5" class="cardLogin pb-5" flat variant="flat" max-width="400px">
        <v-card-title class="d-flex justify-space-between my-5 appear">
            <h3 v-text="isLogin.title"></h3>
            <v-btn variant="text" @click="login = !login">{{ login ? 'Criar Conta' : 'Login' }}</v-btn>
        </v-card-title>
        <v-card-text>
            <v-form @submit.prevent="createUser">
                <v-text-field
                    label="Nome"
                    placeholder="Digite seu nome completo"
                    density="compact"
                    variant="outlined"
                    class="appear"
                    prepend-inner-icon="mdi-account"
                    v-model.trim="user.name"
                    clearable
                    v-if="!login"
                ></v-text-field>
                <v-text-field
                    label="E-mail"
                    placeholder="Digite seu e-mail"
                    density="compact"
                    variant="outlined"
                    prepend-inner-icon="mdi-email"
                    v-model.trim="user.email"
                    clearable
                ></v-text-field>
                <v-text-field
                    label="Senha"
                    density="compact"
                    placeholder="digite sua senha"
                    variant="outlined"
                    prepend-inner-icon="mdi-lock"
                    v-model.trim="user.password"
                    :type="show ? 'text' : 'password'"
                >
                <template v-slot:append-inner>
                    <v-icon @click="show = !show">{{show ? 'mdi-eye':'mdi-eye-off'}}</v-icon>
                </template>
                </v-text-field>
                <v-btn :disabled="loadUser" :loading="loadUser" flat :color="isLogin.color" type="submit" block>{{ isLogin.title }}</v-btn>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script>
    import { useRegisterStore } from '@/store/useRegisterStore'
    const userStore = useRegisterStore()

    export default {
        data(){
            return{
                login: true,
                user:{
                    name: '',
                    email: '',
                    password: ''
                },
                show: false
            }
        },
        computed:{
            isLogin(){
                return this.login
                    ? {title: "Entrar", color:'success'}
                    : {title: "Criar Conta", color:'primary'}
            },
            loadUser(){
                return userStore.load
            }
        },
        methods:{
            async createUser(){
                if(this.login){
                    await userStore.loginUser(this.user)
                } else {
                    await userStore.registerUser(this.user)
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
.cardLogin{
    width: min(95vw, 500px);
    transition: .5s ease all;
}
.appear{
    transition: .5s ease all;
}
</style>