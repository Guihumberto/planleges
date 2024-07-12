<template>
  <div class="container">
    <voltar link="/" />
    <h1> <v-icon size="1.7rem" class="mr-2">mdi-tools</v-icon>Configurações</h1>
    <div class="content">
      <div>
        <disciplina />
        <concurso />
      </div>
      <conteudo v-if="dbStore.readDisciplinaSel" class="conteudo" />
      <alerta v-else text="Selecione uma disciplina" variant="outlined" />
    </div>
  </div>
</template>

<script setup>
  import { useDbStore } from '@/store/dbStore'
  const dbStore = useDbStore()
  import disciplina from "@/components/planTools/disciplina.vue"
  import alerta from "@/components/planTools/Alert.vue"
  import conteudo from "@/components/planTools/conteudo.vue"
  import concurso from "@/components/planTools/concurso.vue"
  //
</script>

<style scoped>
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
