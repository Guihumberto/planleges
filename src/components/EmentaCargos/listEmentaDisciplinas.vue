<template>
    <div>
        <v-expansion-panels class="mb-6">
            <v-expansion-panel
                 v-for="item, i in disciplinas"
                :key="i"
            >
                <v-expansion-panel-title expand-icon="mdi-menu-down">
                    <div class="d-flex justify-space-between align-center w-100">
                        {{  metaStore.readDisciplinas.find(x => x.id == item.name ).name  }}
                        <v-btn v-if="!modo" @click.stop="deleteItem(item.id)" variant="text" icon="mdi-delete" color="error"></v-btn>
                    </div>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                    <div class="my-5 ml-10">
                        <div v-for="item, i in item.ementa" :key="i" class="mb-3">
                            <span class="font-weight-medium">{{ item.topico }} - {{ item.texto }}</span>
                            <ul class="ml-10 mb-5" v-if="item.items">
                                <li v-for="list, l in item.items" class="font-weight-thin">
                                    {{ list.text }}
                                </li>
                            </ul>
                            <div v-if="item.subtopicos.length">
                                <ul v-for="sub, s in item.subtopicos" :key="s" class="ml-10">
                                    <span> <v-icon>mdi-menu-right</v-icon>{{ sub.subtitulo }}</span>
                                    <li v-for="si, is in sub.items" v-if="sub.items.length" class="ml-15 font-weight-thin">
                                        {{ si.text }}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
    </div>
</template>

<script setup>
    import { onBeforeUnmount } from 'vue'
    import { useConteudoStore } from '@/store/useConteudoStore'
    const conteudoStore = useConteudoStore()

    import { useMetaStore } from '@/store/useMetaStore';
    const metaStore = useMetaStore()

    onBeforeUnmount(() => {
        conteudoStore.clearDisciplinasEmenta()
    }) 

    const deleteItem = (item) => {
        conteudoStore.deleteDiciplinaEmenta(item)
    }

    const props = defineProps({
        disciplinas: Object,
        modo: Boolean
    })

</script>

<style scoped>

</style>