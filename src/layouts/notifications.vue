<template>
     <v-menu
      transition="slide-x-transition"
    >
      <template v-slot:activator="{ props }">
        <v-btn
          v-bind="props"
          variant="text"
          icon="mdi-bell-outline"
          @click="notificacaoStore.viewNotificacoes()"
        >
          <v-badge color="error" content="1" v-if="notificacaoStore.readUsuario?.notificacoes">
            <v-icon>mdi-bell-outline</v-icon>
          </v-badge>
          <v-icon v-else>mdi-bell-outline</v-icon>
        </v-btn>
      </template>

      <v-card class="pa-0 ma-0">
        <v-card-text class="pa-0 ma-0">
            <v-alert icon="mdi-information" v-if="!listNotificaceos.length">
              Suas notificações aparecerão por aqui!
            </v-alert>
            <v-list v-else class="py-0 my-0 bg-grey">
              <v-list-item
                class="py-0 mb-1 bg-white"
                v-for="(item, i) in listNotificaceos"
                :key="item.id"
                link
                :to="`/metas/user/${item.url}`"
              >
                 <template v-slot:prepend>
                  <v-icon>
                    mdi-information
                  </v-icon>
                 </template>
                 <v-list-item-title>{{ item.title }}</v-list-item-title>
                <v-list-item-subtitle>{{ item.subtitle }} <small>{{ useDateNowFormat(item.date_created) }}</small> </v-list-item-subtitle>
              </v-list-item>
            </v-list>
        </v-card-text>
      </v-card>

    </v-menu>

</template>

<script setup>
  import { useDateNowFormat } from '@/composables/useDateNowFormat';
  import { useNotificacaoStore } from '@/store/useNotificacaoStore';
  const notificacaoStore = useNotificacaoStore()

  import { computed } from 'vue';

  const listNotificaceos = computed(() => {
    return notificacaoStore.readNotificacoes.sort((a, b) => b.date_created - a.date_created)
  })

  
</script>

<style lang="scss" scoped>

</style>