<template>
    <div class="container">
      <voltar link="/metas/user" />
      <div class="content">
        <DadosMeta />
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