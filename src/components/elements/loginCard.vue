<template>
    <v-card class="cardLogin" variant="flat" max-width="400px">
        <v-card-text v-if="!userStore.readUser?.uid">
            <h1 class="text-h5">{{ isLogin.title }}</h1>
            <v-form @submit.prevent="createUser" class="mt-5" ref="form">
                <v-expand-transition>
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
                </v-expand-transition>
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
                    <v-btn :disabled="userStore.load" :loading="userStore.load" flat :color="isLogin.color" type="submit" block>{{ isLogin.title }}</v-btn>
                    <v-btn class="mt-5" variant="flat" color="var(--main-color)" @click="login = !login">{{ login ? 'Criar Conta' : 'Login' }}</v-btn>
                </div>
            </v-form>
            <v-alert variant="text" type="error" class="mt-5" v-if="userStore.readMsgError">
                {{ userStore.readMsgError }}
            </v-alert>
        </v-card-text>
        <v-card-text class="text-center" v-else>
            Você está conectado! <br><br>
            <v-btn color="primary" @click="$router.push('/home')">Entrar</v-btn>
        </v-card-text>
    </v-card>
</template>

<script setup>
    import { ref, computed } from 'vue'

    import { useRegisterStore } from '@/store/useRegisterStore'
    const userStore = useRegisterStore()


    const login = ref(true)

    const user = ref({
        name: '',
        email: '',
        password: ''
    })

    const show = ref(false)

    const form = ref(null)

    const rules = ref({
        required: value => !!value || "campo obrigatório", 
        minfield: (v) => (v||'').length >= 3 || "Mínimo 4 caracteres",
    })
        
    
    const isLogin = computed(() => {
            return login.value
                ? {title: "Entrar", color:'success'}
                : {title: "Criar Conta", color:'primary'}
    })

    const createUser = async () => {
        const { valid } = await form.value.validate()
        if(valid) {
            if(login.value){
                await userStore.loginUser(user.value)
            } else {
                await userStore.registerUser(user.value)
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