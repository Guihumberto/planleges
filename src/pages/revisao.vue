<template>
  <div class="container">
    <voltar />
    <h1> <v-icon size="1.7rem" class="mr-2">mdi-book</v-icon>Revisão</h1>
    <div class="content" v-if="!revStore.readLoad">
      <titleBar />
      <formD />
      <listRev v-if="true" />
      <alerta text="Não há comentários da revisão cadastrados." v-else />
    </div>
    <loading v-else />
  </div>
</template>

<script setup>
  import titleBar from "@/components/revisaoEdit/titleBar.vue"
  import alerta from "@/components/planTools/Alert.vue"
  import formD from "@/components/revisaoEdit/form.vue"
  import listRev from "@/components/revisaoEdit/listRev.vue"
  import voltar from "@/components/elements/voltar.vue"
  import loading from "@/components/elements/loading.vue"

  import router from '@/router'

  import { useRevStore } from "@/store/revStore";
  const revStore = useRevStore()

  const idURev = router.currentRoute._value.params.id

  revStore.getDadosRev(idURev)
  revStore.getRev(idURev)

  
</script>

<style scoped>
.container{
  width: min(100vw, 1080px);
  margin-inline: auto;
}
.content{
  padding: 1rem;
}
</style>
