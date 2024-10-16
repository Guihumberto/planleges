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
            <v-alert icon="mdi-information" v-if="true">
              Suas atualizações aparecerão por aqui!
            </v-alert>
            <v-list v-else>
              <v-list-item
                v-for="(item, i) in items"
                :key="i"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
        </v-card-text>
      </v-card>

    </v-menu>

</template>

<script>
  export default {
    data: () => ({
      items: [
        { id: 1, title: 'Click Me', url: '',  new: false},
        { id: 1, title: 'Click Me', url: '',  new: false},
        { id: 1, title: 'Click Me', url: '',  new: false},
        { id: 1, title: 'Click Me', url: '',  new: false},
      ],
    }),
  }
</script>

<style lang="scss" scoped>

</style>