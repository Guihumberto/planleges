<template>
    <div class="text-center pa-4">
      <v-btn variant="text" @click="dialog = true" icon="mdi-information">
      </v-btn>
  
      <v-dialog
        v-model="dialog"
        width="auto"
      >
        <v-card
          max-width="400"
          prepend-icon="mdi-pin"
          text="Confira seu local de votação."
          title="Local de Votação"
          color="purple-lighten-4"
        >
        <v-card-text class="bg-purple-lighten-5">
            <span class="font-weight-bold">Zona:</span> 37 <br>
            <span class="font-weight-bold">Seção:</span> {{ local.secao }}<br>
            <span class="font-weight-bold">Local:</span> {{ local.local }} <br>
        </v-card-text>
          <template v-slot:actions>
            <v-btn
              class="ms-auto"
              text="Fechar"
              @click="dialog = false"
            ></v-btn>
          </template>
        </v-card>
      </v-dialog>
    </div>
  </template>
  <script>
  export default {
    data () {
      return {
        dialog: false,
      }
    },
    props:{
        local: Object
    }
  }
</script>