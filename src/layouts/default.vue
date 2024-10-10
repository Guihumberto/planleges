<template>
  <v-app>
    <HeaderONe class="ocultar-impressao" />
    <DefaultView v-if="true" />
    <div v-else>Loading</div>
    <FooterONe class="ocultar-impressao" />
  </v-app>
</template>

<script setup>
  import { onMounted } from 'vue';

  import DefaultView from './View.vue'
  import HeaderONe from './Header.vue'
  import FooterONe from './Footer.vue'

  import { useDbStore } from '@/store/dbStore'
  const dbStore = useDbStore()
  import { useRegisterStore } from '@/store/useRegisterStore'
  const userStore = useRegisterStore()

  if ('navigation' in window && 'onpageshow' in window) {
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
      location.reload();  // Recarrega a página ao sair do bfcache
    }
  });
}

  onMounted(async()=> {
    await userStore.loadUserData()
    if(userStore.user){
      await dbStore.getConteudo()
      await dbStore.getDisciplinas()
      // dbStore.getConcursos()
    }
  })
</script>

<style>
  @media print {
    .ocultar-impressao {
        display: none;
    }
}
</style>
