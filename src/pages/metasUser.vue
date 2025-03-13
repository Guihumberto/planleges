<template>
    <div class="container">
      <voltar link="/home" class="ml-3"/>
      <h1 class="text-h5 ml-4"> <v-icon size="1.7rem" class="mr-2">mdi-finance</v-icon>Metas</h1>
      <div class="content">
        <v-alert v-if="useStore.load">Carregando</v-alert>
        <listMetasUser v-else />
        <All_subjects />
      </div>
    </div>
</template>

<script setup>
  import { useRegisterStore } from '@/store/useRegisterStore'
  const useStore = useRegisterStore()
  
</script>

<style lang="scss" scoped>
.container{
  width: min(100vw, 1080px);
  margin-inline: auto;
  animation: appear 1s ease;
  margin-top: 5rem;
}
.conteudo{
  animation: apper 1s ease;
}

.content{
  padding: 1rem;
}
</style>