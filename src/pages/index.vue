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
  border: 1px solid rgb(224, 215, 215);
  border-radius: 10px;
  padding: 1rem;
  margin-top: 5rem;
  background-color: #01003f;
}
.cardLogin{
    width: min(95vw, 500px);
}
.appear, .cardLogin{
    transition: .5s ease all;
}

</style>