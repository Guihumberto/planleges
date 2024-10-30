<template>
    <div class="container">
      <voltar link="/" class="ml-3"/>
      <h1 class="text-h5 ml-4"> <v-icon size="1.7rem" class="mr-2">mdi-finance</v-icon>Metas</h1>
      <div class="content">
        <v-alert v-if="useStore.load">Carregando</v-alert>
        <listMetasUser v-else />
      </div>
    </div>
</template>

<script setup>
  import  { useMetaStore  } from '@/store/useMetaStore'
  const metaStore = useMetaStore()

  import { useRegisterStore } from '@/store/useRegisterStore'
  const useStore = useRegisterStore()

  // const carregarMetaUser = () => {
  //   metaStore.selectedUser(useStore.user?.uid)
  // }

  // carregarMetaUser()
  
</script>

<style lang="scss" scoped>
.container{
  width: min(100vw, 1080px);
  margin-inline: auto;
  animation: apper 1s ease;
  margin-top: 5rem;
}
.conteudo{
  animation: apper 1s ease;
}
@keyframes apper {
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
}
.content{
  padding: 1rem;
}
</style>