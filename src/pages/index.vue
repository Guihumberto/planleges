<template>
    <div class="container">
        <box />
    </div>
</template>

<script setup>
    import { onMounted } from 'vue';

    import { useRegisterStore } from '@/store/useRegisterStore'
    const userStore = useRegisterStore()

    import { useRouter } from 'vue-router'
    const router = useRouter()

    onMounted(async() => {
        if(userStore.user) router.push('/home')
    })

</script>

<style lang="scss" scoped>
    .container{
        width: min(100%, 1080px);
        margin: 0.5rem;
        margin-inline: auto;
        margin-top: 4rem;
    }
    @media (max-width: 768px) {
        .container{
            height: calc(100vh - 56px);
            display: flex;
            align-items: center;
        }
    }
</style>