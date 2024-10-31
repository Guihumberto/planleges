<template>
    <v-card class="cardLogin" variant="flat" max-width="400px">
        <v-card-text>
            <v-form @submit.prevent="createUser" class="mt-5" ref="form">
                <v-text-field
                    label="Nome"
                    placeholder="Digite seu nome completo"
                    density="compact"
                    variant="outlined"
                    class="appear mb-2"
                    prepend-inner-icon="mdi-account"
                    v-model.trim="user.name"
                    clearable
                    v-if="!login"
                    :rules="[rules.required, rules.minfield]"
                ></v-text-field>
                <v-text-field
                    label="E-mail"
                    placeholder="Digite seu e-mail"
                    density="compact"
                    variant="outlined"
                    prepend-inner-icon="mdi-email"
                    v-model.trim="user.email"
                    clearable
                    :rules="[rules.required, rules.minfield]"
                    class="mb-2"
                ></v-text-field>
                <v-text-field
                    label="Senha"
                    density="compact"
                    placeholder="digite sua senha"
                    variant="outlined"
                    prepend-inner-icon="mdi-lock"
                    v-model.trim="user.password"
                    :type="show ? 'text' : 'password'"
                    :rules="[rules.required, rules.minfield]"
                    clearable
                    class="mb-2"
                >
                <template v-slot:append-inner>
                    <v-icon @click="show = !show">{{show ? 'mdi-eye':'mdi-eye-off'}}</v-icon>
                </template>
                </v-text-field>
                <div class="text-center">
                    <v-btn :disabled="loadUser" :loading="loadUser" flat :color="isLogin.color" type="submit" block>{{ isLogin.title }}</v-btn>
                    <v-btn class="mt-5" variant="flat" color="var(--main-color)" @click="login = !login">{{ login ? 'Criar Conta' : 'Login' }}</v-btn>
                </div>
            </v-form>
            <v-alert variant="text" type="error" class="mt-5" v-if="msgError">
                {{ msgError }}
            </v-alert>
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
                show: false,
                rules: {
                required: value => !!value || "campo obrigatório", 
                minfield: (v) => (v||'').length >= 3 || "Mínimo 4 caracteres",
                }
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
            },
            msgError(){
                return userStore.readMsgError
            }
        },
        methods:{
            async createUser(){
                const { valid } = await this.$refs.form.validate()
                if(valid) {
                    if(this.login){
                        await userStore.loginUser(this.user)
                    } else {
                        await userStore.registerUser(this.user)
                    }
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