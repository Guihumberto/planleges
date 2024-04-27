<template>
  <div class="container">
    <voltar class="ocultar-impressao" />
    <div class="content" v-if="!revStore.readLoad">
      <listRev v-if="true" />
    </div>
    <loading v-else />
  </div>
</template>

<script setup>
  import titleBar from "@/components/revisaoPrint/titleBar.vue"
  import listRev from "@/components/revisaoPrint/listRev.vue"
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
@keyframes appear {
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
}
@media print {
    .ocultar-impressao {
        display: none;
    }
}
.content{
  font-family: Arial, sans-serif;
  padding: 1rem;
  animation: 1s ease appear;
}

</style>
