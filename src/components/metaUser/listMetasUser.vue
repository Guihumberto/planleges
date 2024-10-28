<template>
    <div v-if="metaStore.selected">
        <v-alert v-if="metaStore.readLoad">Carregando...</v-alert>
        <div v-else>
            <v-list v-if="list_metas.length">
                <v-list-item 
                    v-for="item, i in list_metas" :key="i" 
                    class="mb-1 bg-indigo-lighten-4" link
                    :class="item?.meta_done ? 'bg-blue-grey-lighten-4' : 'bg-blue-grey-darken-1'"
                    @click="$router.push(`/metas/user/${item.id}`)"
                >
                    <template v-slot:prepend>
                        <v-icon v-if="item?.meta_done">mdi-check-all</v-icon>
                        <v-icon v-else>mdi-format-list-bulleted</v-icon>
                    </template>
                    <template v-slot:append>
                        <div class="d-flex align-center">
                           <v-icon title="Concluído" v-if="item?.meta_done" color="success">mdi-check-bold</v-icon>
                           <v-icon v-else>mdi-progress-helper</v-icon>
                        </div>
                    </template>
                    <span :class="item.meta_done ? 'taxado' : ''">{{ item.meta }} </span>
                </v-list-item>
            </v-list>
            <v-alert class="mt-5" type="info" variant="outlined"v-else>
                <p>Não há metas adicionadas.</p>
            </v-alert>
            <All_subjects />
        </div>
    </div>
</template>

<script setup>
    import { computed } from 'vue'

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
.taxado {
  text-decoration: line-through;
}
</style>