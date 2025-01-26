<template>
     <div class="container">
      <v-btn variant="text" class="ml-n3" prepend-icon="mdi-arrow-left" @click="$router.push('/conteudo')">voltar</v-btn>
        <h1>Ementa Cargo</h1>
        {{ conteudoStore.radConcurso?.concurso }}
        <div class="content">
         <AddCargo />
         <listCargos />
        </div>
    </div>
</template>

<script setup>
    import AddCargo from '@/components/EmentaCargos/addCargo.vue';

    import { useRoute } from 'vue-router';
    const route = useRoute()

    import { useConteudoStore } from '@/store/useConteudoStore'
    const conteudoStore = useConteudoStore()

    conteudoStore.getConcurso(route.params.id)
    conteudoStore.getCargos(route.params.id)

    
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