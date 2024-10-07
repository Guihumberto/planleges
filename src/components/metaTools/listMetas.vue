<template>
    <div v-if="selectUser">
        <h2>Lista das Metas</h2>
        <v-list v-if="list_metas.length">
            <v-list-item 
                v-for="item, i in list_metas" :key="i" 
                class="mb-1 bg-indigo-lighten-4" link
                @click="$router.push(`/metas/elaborar/${item.id}`)"
            >
                <template v-slot:prepend>
                    <v-icon>mdi-account</v-icon>
                </template>
                <template v-slot:append>
                   <v-switch @click="liberarMeta(item)" color="success" v-model="item.show" hide-details label="Liberar"></v-switch>
                   <DialogConfirm :id="item.id" :dialogText="dialogText" />
                </template>
                {{ item.meta }} 
            </v-list-item>
        </v-list>
        <v-alert class="mt-5" type="info" variant="outlined"v-else>
            <p>Não há metas adicionadas.</p>
        </v-alert>
    </div>
</template>

<script setup>
    import { computed, ref } from 'vue'

    import  { useMetaStore  } from '@/store/useMetaStore'
    const metaStore = useMetaStore()

    const selected = ref('')

    const list_metas = computed(()=> {
        return metaStore.metas.sort((a, b) => {
            if (a.meta < b.meta) return 1;
            if (a.meta > b.meta) return -1;
            return 0;
        })
    })

    const selectUser = computed(()=> {
        return metaStore.selected
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

<style lang="scss" scoped>

</style>