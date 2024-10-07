<template>
    <div class="text-center pa-4">
      <v-dialog
        v-model="dialog"
        width="auto"
      >
        <v-card
          max-width="400"
          prepend-icon="mdi-update"
          text="Deseja realmente vincular esse caderno de revisão a esta tarefa?"
          title="Confirmação"
        >

          <template v-slot:actions>
            <v-btn
              class="ms-auto"
              text="Cancelar"
              @click="dialog = false"
            ></v-btn>
            <v-btn
              class="ms-auto"
              variant="flat"
              color="primary"
              text="Confirmo"
              @click="enviarConfirmacao()"
            ></v-btn>
          </template>
        </v-card>
      </v-dialog>
    </div>
  </template>

<script setup>
    import {  inject } from 'vue';

    const dialog = inject("dialog")

    const props = defineProps({
        idVinc: String
    })

    const emit = defineEmits(['confirmacao'])

    const enviarConfirmacao = () => {
        emit('confirmacao', props.idVinc)
    }

</script>

<style lang="scss" scoped>

</style>