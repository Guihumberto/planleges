<template>
    <div class="container">
        <div class="" style="min-height: 60vh;">
            <div>
                <h1>Home</h1>
            </div>
            <box />
        </div>
    </div>
</template>

<script>
    import box from '@/components/home/box'
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
.container{
  width: min(100vw, 1080px);
  margin: 0.5rem;
  margin-inline: auto;
  border: 1px solid grey;
  border-radius: 10px;
  padding: 1rem;
}
.cardLogin{
    width: min(95vw, 500px);
}
.appear, .cardLogin{
    transition: .5s ease all;
}

</style>