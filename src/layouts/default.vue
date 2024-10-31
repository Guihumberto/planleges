<template>
  <v-app>
    <HeaderONe class="ocultar-impressao" />
    <DefaultView v-if="true" />
    <div v-else>Loading</div>
    <FooterONe class="ocultar-impressao" />
    <!-- {{ metaStore.readAllMetasAllUsers.sort(useOrderDateCreated) }} -->
  </v-app>
</template>

<script setup>
  import { onMounted } from 'vue';

  // import { useOrderDateCreated } from '@/composables/useOrderDateCreated';

  import DefaultView from './View.vue'
  import HeaderONe from './Header.vue'
  import FooterONe from './Footer.vue'

  import { useDbStore } from '@/store/dbStore'
  const dbStore = useDbStore()
  import { useRegisterStore } from '@/store/useRegisterStore'
  const userStore = useRegisterStore()
  import  { useMetaStore  } from '@/store/useMetaStore'
  const metaStore = useMetaStore()

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
      metaStore.selectedUser(userStore.user?.uid)
      // dbStore.getConcursos()
      metaStore.getAllMetasAllUsers()
    }
  })
</script>

<style>
  :root{
    --second-color: #01003f;
    --main-color: #42c1e8;
    --background-color: #f9fafb;
  }
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
  }
  *::-webkit-scrollbar{
    width: 8px;
    height: 0.4rem;
  }
  
  *::-webkit-scrollbar-track{
    background: rgb(232, 224, 224);
    border-radius: 8px;
  }

  *::-webkit-scrollbar-thumb{
    background: rgb(138, 135, 135);
    border-radius: 20px;
  }

  @media (max-width: 600px) {
    html{
      font-size: 75%;
    }
  }

  @media print {
    .ocultar-impressao {
        display: none;
    }
}
</style>
