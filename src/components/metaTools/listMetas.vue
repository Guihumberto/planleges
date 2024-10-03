<template>
    <div v-if="selectUser">
        <h2>Lista das Metas</h2>
        <v-list>
            <v-list-item 
                v-for="item, i in list_metas" :key="i" 
                class="mb-1 bg-indigo-lighten-4" link
                @click="selected = item.id"
            >
                <template v-slot:prepend>
                    <v-icon>mdi-account</v-icon>
                </template>
                <template v-slot:append>
                   <v-btn variant="text" color="primary" icon="mdi-chevron-right" @click="$router.push(`/metas/elaborar/${item.id}`)"></v-btn>
                </template>
                {{ item.meta }} 
            </v-list-item>
        </v-list>
    </div>
</template>

<script setup>
    import { computed, ref } from 'vue'

    import  { useMetaStore  } from '@/store/useMetaStore'
    const metaStore = useMetaStore()

    const selected = ref('')

    const list_metas = computed(()=> {
        return metaStore.metas.sort((a, b) => { a.meta - b.meta})
    })

    const selectUser = computed(()=> {
        return metaStore.selected
    })
</script>

<style lang="scss" scoped>

</style>