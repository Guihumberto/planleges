<template>
    <div class="container">
      <voltar/>
      <h1 class="text-h5 ml-4"> <v-icon size="1.7rem" class="mr-2">mdi-finance</v-icon>Elaborar Metas</h1>
      <Nav_metas class="ml-4" />
      <div class="content">
        <FormInit />
        <ListTarefas />
      </div>
    </div>
</template>

<script setup>


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