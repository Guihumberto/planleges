<template>
  <v-app>
    <HeaderONe class="ocultar-impressao" />
    <DefaultView v-if="true" />
    <div v-else>Loading</div>
    <FooterONe class="ocultar-impressao" />
  </v-app>
</template>

<script setup>
  import DefaultView from './View.vue'
  import HeaderONe from './Header.vue'
  import FooterONe from './Footer.vue'

  import { useDbStore } from '@/store/dbStore'
  const dbStore = useDbStore()
  import { useRegisterStore } from '@/store/useRegisterStore'
  const userStore = useRegisterStore()

  dbStore.getDisciplinas()
  dbStore.getConcursos()
  dbStore.getConteudo()
  userStore.loadUserData()
</script>

<style>
  @media print {
    .ocultar-impressao {
        display: none;
    }
}
</style>
