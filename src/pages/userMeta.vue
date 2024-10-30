<template>
    <div class="container">
      <voltar link="/metas/user" class="ml-3" />
      <div class="content">
        <DadosMeta />
        <ListTarefasUser />
      </div>
    </div>
</template>

<script setup>
  import { onMounted } from 'vue';

  import { useDbStore } from '@/store/dbStore'
  const dbStore = useDbStore()

  onMounted(()=> {
    dbStore.getDisciplinas()
  })

</script>

<style lang="scss" scoped>
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