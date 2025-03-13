<template>
     <div v-if="selected">
        <h1 class="text-h5"> <v-icon size="1.7rem" class="mr-2">mdi-finance</v-icon>Lista de Metas</h1>
        <div class="ml-9">Mentorado: {{ $route.query?.name }}</div>
        <v-list v-if="metaStore.readMetas.length">
            <v-list-item 
                v-for="item, i in metaStore.readMetas.sort((a, b) => b.meta.localeCompare(a.meta))" :key="i" 
                class="mb-1 bg-indigo-lighten-4" link
                @click="$router.push(`/metas/elaborar/${item.id}`)"
            >
                <template v-slot:prepend>
                    <v-icon>mdi-format-list-bulleted</v-icon>
                </template>
                <template v-slot:append>
                   <v-switch @click.stop="liberarMeta(item)" color="success" v-model="item.show" hide-details label="Liberar"></v-switch>
                   <DialogConfirm :id="item.id" :dialogText="dialogText" />
                </template>
                {{ item.meta }} 
            </v-list-item>
        </v-list>
        <v-alert class="mt-5" type="info" variant="outlined"v-else>
            <p v-if="metaStore.readLoadMetas">Carregando...</p>
            <p v-else>Não há metas adicionadas.</p>
        </v-alert>
    </div>
</template>

<script setup>
    import { ref } from 'vue'

    import  { useMetaStore  } from '@/store/useMetaStore'
    const metaStore = useMetaStore()

    const props = defineProps({
        selected: {
            type: String,
            default: false
        }
    })

    const liberarMeta = (item) => {
        metaStore.liberarMeta(item)
    }

    const dialogText = ref({
        title: 'Apagar Meta',
        text: 'Confirmar a remoção da meta?',
        color: 'red',
        icon: 'mdi-delete',
        type: 1
    })


</script>

<style scoped>

</style>