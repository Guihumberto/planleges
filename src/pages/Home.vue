<template>
    <div class="container">
        <box />
    </div>
</template>

<script setup>
    import { onMounted, ref } from 'vue';

    import { useDbStore } from '@/store/dbStore'
    const dbStore = useDbStore()

    import { useRegisterStore } from '@/store/useRegisterStore'
    const userStore = useRegisterStore()

    import  { useMetaStore  } from '@/store/useMetaStore'
    const metaStore = useMetaStore()

    import  { useRevStore  } from '@/store/revStore'
    const revStore = useRevStore()

    const load = ref(true)

    onMounted(async()=> {
        await userStore.loadUserData()
        if(userStore.user){
            await dbStore.getDisciplinas()
            await dbStore.getConteudo()
            await metaStore.selectedUser(userStore.user?.uid)
            load.value = false
        }
    })
</script>

<style lang="scss" scoped>
.container{
  width: min(98%, 1080px);
  margin: 0.5rem;
  margin-inline: auto;
  margin-top: 5rem;
}
.cardLogin{
    width: min(95vw, 500px);
}
.appear, .cardLogin{
    transition: .5s ease all;
}
.dots{
    letter-spacing: 3px;
    font-weight: 600;
}
.dots::after {
    content: '';
    animation: dots 1.5s steps(3, end) infinite;
}
@keyframes dots {
    0% { content: ''; }
    33% { content: '.'; }
    66% { content: '..'; }
    100% { content: '...'; }
}
@media (max-width: 500px) {
    .container{
        margin-top: 6rem;
    }
}
</style>