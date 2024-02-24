<template>
    <div class="container">
        <router-link to="/login"> <v-icon size="15" class="mr-1">mdi-login</v-icon>Login</router-link>
        <div class="d-flex justify-center align-center" style="min-height: 60vh;">
            <div>
                <h1>Home</h1>
            </div>
        </div>
    </div>
</template>

<script>
    import { useRegisterStore } from '@/store/useRegisterStore'
    const userStore = useRegisterStore()

    export default {
        data(){
            return{
                login: true,
                user:{
                    name: 'João Humberto Silva Ribeiro Júnior',
                    email: 'juninho.joao@hotmail.com',
                    password: '123456'
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
.container{
  width: min(100vw, 1080px);
  margin-inline: auto;
}
.cardLogin{
    width: min(95vw, 500px);
}
.appear, .cardLogin{
    transition: .5s ease all;
}
</style>