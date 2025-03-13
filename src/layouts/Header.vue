<template>
    <div class="wrapperHeader">
        <div class="container">
            <h2 class="title" @click="$router.push('/home')">EL - Estudo da Lei</h2>
            <div class="d-flex align-center">
                <div class="links" v-if="!!useStore.user">
                     <!-- <router-link to="/config" class="link">Criar</router-link> -->
                     <router-link to="/config" class="link link_rev">Revisar</router-link>
                     <router-link to="/metas/user" class="link link_meta">Metas</router-link>
                    <Notifications />
                </div>
                <div>
                    <v-btn class="logout" v-if="!!useStore.user" @click="logout" flat variant="text" title="sair" icon="mdi-logout"></v-btn>
                    <router-link class="link" v-else to="/login"> <v-icon size="15" class="mr-1">mdi-login</v-icon>Login</router-link>
                </div>
                <v-btn class="btn-menu" v-if="!!useStore.user" variant="text" @click="side_bar = !side_bar" :icon="side_bar ? 'mdi-close' : 'mdi-menu'"></v-btn>
            </div>
            <div class="mobile_menu" v-if="side_bar">
                <ul>
                    <li v-for="item, i in list_menu" :key="i"> 
                        <a :class="item.url == idNameActiveSelect ? 'active':''"  @click="linkto(item.url)">{{ item.name }} </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>

</template>

<script setup>
    import { useRegisterStore } from '@/store/useRegisterStore'
    const useStore = useRegisterStore()
   
    import { useRouter } from 'vue-router';
    const router = useRouter()
    
    import Notifications from './notifications.vue';

    const side_bar = ref(false)
    const idNameActiveSelect = ref('home')

    const list_menu = [
        {name: 'Início', icon: 'mdi-home', url: '/home'},
        {name: 'Revisar', icon: 'mdi-home', url: '/config'},
        {name: 'Metas', icon: 'mdi-home', url: '/metas/user'},
        {name: 'Sair', icon: 'mdi-home', url: 'logout'}
    ]

    const linkto = (url) => {
        if(url == 'logout') {
            logout()
        } else {
            router.push(url)
        }
        side_bar.value = false
    }

    const logout = () => {
        useStore.logoutUser()
    }
</script>

<style lang="scss" scoped>
.wrapperHeader{
    position: fixed;
    display: flex;
    justify-content: center;
    color: #fff;
    margin-inline: 0 auto;
    width: 100%;
    background: var(--background-color);
    z-index: 99;
    transition: .5s;
}
.container{
    position: relative;
    display: flex;
    justify-content: space-between;
    background-color: var(--second-color);
    margin: 0.5rem 0.1rem ,5rem;
    padding: 0.3rem 1rem;
    border-radius: 6px;
    align-items: center;
    width: min(100vw, 1080px);
}
.title{
    transition: all .5s ease;
}
.title:hover{
    color:var(--main-color);
    cursor: pointer;
}
.link{
    text-decoration: none;
    color: #fff;
    transition: .5s;
}
.link:hover{
    color:var(--main-color);
}
.links{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
}
.mobile_menu, .btn-menu {
    display: none;
}
.mobile_menu ul{
    display: flex;
    flex-direction: column;
    align-items: center;
    font-weight: 700;
    gap: 1rem;
    list-style: none;
    cursor: pointer;
}

@media (max-width: 800px) {
    .btn-menu{
        display: block;
    }
    .mobile_menu{
        position: fixed;
        top: 5.2rem;
        left: 0;
        display: flex;
        justify-content: center;
        flex-direction: column;
        gap: 1rem;
        background: var(--main-color);
        width: 100%;
        min-height: 20vh;
        padding: 2rem;
        color: white;
        transition: 1s;
        animation: appear .3s ease-in forwards;
        opacity: 0;
    }
    .logout, .link_rev, .link_meta{
        display: none
    }
}
@keyframes appear {
    from{
        opacity: 0;
        translate: 100px;
    }
    to{
        opacity: 1;
    }
}
</style>