<template>
  <v-app>
    <DefaultView v-if="true" />
    <div v-else>Loading</div>
  </v-app>
</template>

<script setup>
  import DefaultView from './View.vue'

  import { useDbStore } from '@/store/dbStore'
  const dbStore = useDbStore()

  // dbStore.getDisciplinas()
  dbStore.getConcursos()
  dbStore.getConteudo()
</script>

<style>
  @media print {
    .ocultar-impressao {
        display: none;
    }
}
</style>