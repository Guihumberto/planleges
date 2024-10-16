<template>
     <v-menu
      transition="slide-x-transition"
    >
      <template v-slot:activator="{ props }">
        <v-btn
          v-bind="props"
          icon="mdi-information"
          variant="text"
        >
        </v-btn>
      </template>

      <v-card>
        <v-card-text>
            <v-alert icon="mdi-information" v-if="!listNotificaceos.length">
              Suas notificações aparecerão por aqui!
            </v-alert>
            <v-list v-else class="pa-a ma-0">
              <v-list-item
                class="pa-a ma-0"
                v-for="(item, i) in listNotificaceos"
                :key="i"
                link
                :to="`/metas/user/${item.url}`"
              >
                 <template v-slot:prepend>
                  <v-icon>
                    mdi-information
                  </v-icon>
                 </template>
                 <v-list-item-title>{{ item.title }}</v-list-item-title>
                <v-list-item-subtitle>{{ item.subtitle }}</v-list-item-subtitle>
              </v-list-item>
            </v-list>
        </v-card-text>
      </v-card>

    </v-menu>

</template>

<script setup>
  import { useNotificacaoStore } from '@/store/useNotificacaoStore';
  const notificacaoStore = useNotificacaoStore()

  import { computed } from 'vue';

  const listNotificaceos = computed(() => {
    return notificacaoStore.readNotificacoes.sort((a, b) => a.date_created - b.date_created)
  })

  
</script>

<style lang="scss" scoped>

</style>