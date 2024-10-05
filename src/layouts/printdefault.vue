<template>
  <v-app :theme="dark">
    <v-app-bar
        class="fixed-bar"
        color="primary"
        density="compact"
        sticky
        app
      >
        <template v-slot:prepend>
          <v-icon>mdi-home</v-icon>
        </template>

        <v-app-bar-title>Eleições 2024</v-app-bar-title>

        <template v-slot:append>
          <v-btn icon="mdi-theme-light-dark" @click="theme = !theme"></v-btn>
        </template>
      </v-app-bar>

    <DefaultView v-if="true" />
    <div v-else>Loading</div>
  </v-app>
</template>

<script setup>
  import { computed, ref } from 'vue';
  import DefaultView from './View.vue'

  import { useDbStore } from '@/store/dbStore'
  const dbStore = useDbStore()

  const theme = ref(false)

  const dark = computed(()=> {
    return theme.value
    ? 'dark'
    : 'light'
  })

  // dbStore.getDisciplinas()
  dbStore.getConcursos()
  dbStore.getConteudo()
</script>

<style>
.fixed-bar {
  position: sticky;
  position: -webkit-sticky; /* for Safari */
  top: 6em;
  z-index: 2;
}
  @media print {
    .ocultar-impressao {
        display: none;
    }
}
</style>