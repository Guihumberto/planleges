<template>
  <div class="container">
    <voltar />
    <h1> <v-icon size="1.7rem" class="mr-2">mdi-tools</v-icon>Configurações</h1>
    <div class="content">
      <disciplina />
      <concurso />
      <conteudo v-if="dbStore.readDisciplinaSel" />
      <alerta v-else text="Selecione uma disciplina" />
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
  width: min(80vw, 1080px);
  margin-inline: auto;
}
.content{
  padding: 1rem;
}
</style>
