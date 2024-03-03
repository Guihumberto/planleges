<template>
    <div class="text-center d-flex justify-center">
        <div class="container">
            <h2 class="title" @click="$router.push('/')">EL - Estudo da Lei</h2>
            <div>
                <v-btn v-if="!!useStore.user" @click="logout" flat variant="text" color="red" title="sair" icon="mdi-logout"></v-btn>
                <router-link v-else to="/login"> <v-icon size="15" class="mr-1">mdi-login</v-icon>Login</router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { useRegisterStore } from '@/store/useRegisterStore'
    const useStore = useRegisterStore()

    const logout = () => {
        useStore.logoutUser()
    }
</script>

<style lang="scss" scoped>
.container{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: min(100vw, 1080px);
}
.title{
    transition: all .5s ease;
}
.title:hover{
    color: grey;
}
</style>