<template>
    <div class="container">
      <voltar link="/" />
      <h1 class="text-h5 ml-4 mb-3"> <v-icon size="1.7rem" class="mr-2">mdi-finance</v-icon>Metas</h1>
      <router-link class="ml-4" to="/conteudo">Add Conteúdo</router-link>
      <div class="content">
        <forms />
        <listMetas />
      </div>
    </div>
</template>

<script>
    export default {
        
    }
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