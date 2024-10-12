<template>
    <div v-if="metaStore.selected">
        <v-alert v-if="metaStore.readLoad">Carregando...</v-alert>
        <div v-else>
            <v-list v-if="list_metas.length">
                <v-list-item 
                    v-for="item, i in list_metas" :key="i" 
                    class="mb-1 bg-indigo-lighten-4" link
                    @click="$router.push(`/metas/user/${item.id}`)"
                >
                    <template v-slot:prepend>
                        <v-icon>mdi-format-list-bulleted</v-icon>
                    </template>
                    <template v-slot:append>
                        <div class="d-flex align-center">
                           <progresso :item="item" />
                           <v-btn variant="text" color="primary" icon="mdi-chevron-right" @click="$router.push(`/metas/user/${item.id}`)"></v-btn>
                        </div>
                    </template>
                    {{ item.meta }} 
                </v-list-item>
            </v-list>
            <v-alert class="mt-5" type="info" variant="outlined"v-else>
                <p>Não há metas adicionadas.</p>
            </v-alert>
        </div>
    </div>
</template>

<script setup>
    import { computed, onMounted, ref } from 'vue'

    import  { useMetaStore  } from '@/store/useMetaStore'
    const metaStore = useMetaStore()

    const list_metas = computed(()=> {
        return metaStore.metas.filter(x => x.show).sort((a, b) => {
            if (a.meta < b.meta) return 1;
            if (a.meta > b.meta) return -1;
            return 0;
        })
    })
</script>

<style lang="scss" scoped>

</style>