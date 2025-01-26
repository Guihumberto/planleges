<template>
    <div class="container">
     <v-btn variant="text" class="ml-n3" prepend-icon="mdi-arrow-left" @click="$router.go(-1)">voltar</v-btn>
       <h1>Cadastrar Ementa</h1>
       {{ conteudoStore.radConcurso?.concurso }}
       <div class="content">
            <CadDisciplina />
            <listEmentaDisciplinas :disciplinas="conteudoStore.readDisciplinas" />
       </div>
   </div>
</template>

<script setup>
   import { useRoute } from 'vue-router';
   const route = useRoute()

   import { useConteudoStore } from '@/store/useConteudoStore'
   const conteudoStore = useConteudoStore()

   conteudoStore.getDisciplinasEmenta(route.params.id)

   
</script>

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