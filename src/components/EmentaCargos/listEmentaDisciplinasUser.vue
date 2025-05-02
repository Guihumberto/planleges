<template>
    <div>
        <div v-if="conteudoStore.readLoad">Carregando...</div>
        <v-expansion-panels class="mb-6">
            <v-expansion-panel
                 v-for="item, i in disciplinas"
                :key="i"
            >
                <v-expansion-panel-title expand-icon="mdi-menu-down">
                    <div class="d-flex justify-space-between align-center w-100">
                        {{  metaStore.readDisciplinas.find(x => x.id == item.name ).name  }}
                    </div>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                    <div class="my-5 ml-10">
                        <div v-for="item, i in item.ementa" :key="i" class="mb-3">
                            <p class="d-flex align-center justify-start">
                                <v-checkbox
                                    hide-details
                                    v-model="item.complete"
                                    color="success"
                                    class="mx-5"
                                     @click="updateComplete()"
                                ></v-checkbox>
                                <span class="font-weight-medium pa-2" :class="item.complete ? 'text-decoration-line-through' : ''">{{ item.topico }} - {{ item.texto }}</span>
                            </p>
                            <ul class="ml-10 mb-5" v-if="item.items">
                                <li v-for="list, l in item.items" class="font-weight-thin d-flex align-center">
                                    <div class="d-flex ga-10">
                                        <v-checkbox
                                            hide-details
                                            v-model="list.complete"
                                             @click="updateComplete()"
                                         ></v-checkbox>
                                         <div :class="list.complete ? 'text-decoration-line-through' : ''">{{ list.text }}</div>    
                                    </div>
                                </li>
                            </ul>
                            <div v-if="item.subtopicos.length">
                                <ul v-for="sub, s in item.subtopicos" :key="s" class="ml-10">
                                    <p class="d-flex align-center">
                                        <v-checkbox
                                            hide-details
                                            v-model="sub.complete"
                                            color="primary"
                                             @click="updateComplete()"
                                        ></v-checkbox>
                                        <span :class="sub.complete ? 'text-decoration-line-through' : ''"> <v-icon>mdi-menu-right</v-icon>{{ sub.subtitulo }}</span>
                                    </p>
                                    <li v-for="si, is in sub.items" :key="is" v-if="sub.items.length" class="ml-15 font-weight-thin d-flex align-center">
                                        <v-checkbox
                                            hide-details
                                            v-model="si.complete"
                                            @click="updateComplete()"
                                        ></v-checkbox>
                                        <span :class="si.complete ? 'text-decoration-line-through' : ''"> {{ si.text }}</span>
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

    const props = defineProps({
        disciplinas: Object
    })

    const updateComplete = async () => {
        await conteudoStore.updatePlanUser(props.disciplinas)
    }

</script>

<style scoped>

</style>