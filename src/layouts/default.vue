<template>
  <v-app>
    <HeaderONe />
    <DefaultView v-if="true" />
    <div v-else>Loading</div>
    <FooterONe />
  </v-app>
</template>

<script setup>
  import DefaultView from './View.vue'
  import HeaderONe from './Header.vue'
  import FooterONe from './Footer.vue'

  import { useDbStore } from '@/store/dbStore'
  const dbStore = useDbStore()

  dbStore.getDisciplinas()
  dbStore.getConcursos()
  dbStore.getConteudo()
</script>
