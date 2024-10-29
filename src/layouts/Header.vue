<template>
    <div class="wrapperHeader">
        <div class="container">
            <h2 class="title" @click="$router.push('/')">Estudo da Lei</h2>
            <div class="d-flex align-center">
                <div class="links" v-if="!!useStore.user">
                    <!-- <router-link to="/config" class="link">Criar</router-link> -->
                    <router-link to="/config" class="link">Revisar</router-link>
                    <router-link to="/metas/user" class="link">Metas</router-link>
                    <Notifications />
                </div>
                <div>
                    <v-btn v-if="!!useStore.user" @click="logout" flat variant="text" title="sair" icon="mdi-logout"></v-btn>
                    <router-link class="link" v-else to="/login"> <v-icon size="15" class="mr-1">mdi-login</v-icon>Login</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { useRegisterStore } from '@/store/useRegisterStore'
import Notifications from './notifications.vue';
    const useStore = useRegisterStore()

    const logout = () => {
        useStore.logoutUser()
    }
</script>

<style lang="scss" scoped>
.wrapperHeader{
    display: flex;
    justify-content: center;
    color: #fff;
}
.container{
    display: flex;
    justify-content: space-between;
    background-color: #23424a;
    margin: 0.5rem 0.1rem;
    padding: 0.3rem 1rem  ;
    border-radius: 20px;
    align-items: center;
    width: min(100vw, 1080px);
}
.title{
    transition: all .5s ease;
}
.title:hover{
    color: grey;
    cursor: pointer;
}
.link{
    text-decoration: none;
    color: #fff;
    transition: 1s ease;
}
.link:hover{
    color: rgb(172, 172, 238);
}
.links{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
}
@media (max-width:500px) {
    .title{
        font-size: 1rem;
    }
}
</style>