<template>
    <div class="container">
      <voltar link="/metas" />
      <h1 class="text-h5 ml-4"> <v-icon size="1.7rem" class="mr-2">mdi-finance</v-icon>Elaborar Metas</h1>
      <div class="content">
        <FormInit />
        <ListTarefas />
      </div>
    </div>
</template>

<script setup>
  import { useMetaStore } from '@/store/useMetaStore';
  const metaStore = useMetaStore()

</script>

<style lang="scss" scoped>
.container{
  width: min(100vw, 1080px);
  margin-inline: auto;
  animation: apper 1s ease;
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