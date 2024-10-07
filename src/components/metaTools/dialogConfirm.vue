<template>
    <div class="text-center">
      <v-btn @click.stop="dialog = true" variant="text" color="red" icon="mdi-delete"></v-btn>
      <v-dialog
        v-model="dialog"
        width="auto"
      >
        <v-card
          max-width="500"
          :prepend-icon="dialogText.icon"
          :text="dialogText.text"
          :title="dialogText.title"
        >
          <template v-slot:actions>
            <div>
                <v-btn
                  class="ms-auto"
                  text="Cancelar"
                  @click="dialog = false"
                ></v-btn>
                <v-btn color="error" @click="apagar()" variant="tonal">Apagar</v-btn>
            </div>
          </template>
        </v-card>
      </v-dialog>
    </div>
</template>
<script setup>
    import { ref } from 'vue';

    import  { useMetaStore  } from '@/store/useMetaStore'
    const metaStore = useMetaStore()

    const props = defineProps({
        id: String,
        dialogText: Object
    })

    const dialog = ref(false)

    const apagar = () => {
        if(props.dialogText.type == 1) metaStore.deleteMeta(props.id)
        if(props.dialogText.type == 2) metaStore.deleteTask(props.id)
        dialog.value = false
    }

</script>

<style lang="scss" scoped>

</style>