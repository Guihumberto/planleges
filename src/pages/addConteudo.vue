<template>
    <div class="container">
      <v-btn variant="text" class="ml-n3" prepend-icon="mdi-arrow-left" @click="$router.push('/metas')">voltar</v-btn>
        <h1>Conteúdo</h1>
        <div class="content">
            <addedital />
            <listedital />
        </div>
    </div>
</template>

<style scoped>
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