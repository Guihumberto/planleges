<template>
    <div class="container">
        <box />
    </div>
</template>

<script setup>
    import { useRegisterStore } from '@/store/useRegisterStore'
    const userStore = useRegisterStore()

</script>

<style lang="scss" scoped>
.container{
  width: min(98%, 1080px);
  margin: 0.5rem;
  margin-inline: auto;
  margin-top: 5rem;
  background: rgb(247, 246, 246);
}
.cardLogin{
    width: min(95vw, 500px);
}
.appear, .cardLogin{
    transition: .5s ease all;
}
@media (max-width: 500px) {
    .container{
        margin-top: 6rem;
    }
}
</style>