<template>
    <div class="mt-10">
        <div v-if="conteudoStore.readLoad">
            Carregando
        </div>
        <v-list class="pa-0">
            <v-list-item v-for="item, i in conteudoStore.readCargos" link :to="`cadementa/${item.id}`">
                <template v-slot:prepend>
                    <v-icon>
                        mdi-account
                    </v-icon>
                </template>
                <div>{{ item.name }}</div>
            </v-list-item>
        </v-list>
    </div>
</template>

<script setup>
  import { onBeforeMount } from 'vue';
  import { useConteudoStore } from '@/store/useConteudoStore'
  const conteudoStore = useConteudoStore()

  onBeforeMount(() => {
        conteudoStore.clearCargo()
  })

</script>

<style scoped>

</style>