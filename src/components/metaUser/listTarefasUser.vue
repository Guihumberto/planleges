<template>
    <div>
        <h3>Lista de tarefas</h3>
        <p v-if="load">Carregando...</p>
        <v-list v-else>
            <v-list-item
                v-for="item, i in tasks" :key="i" link
                class=" mb-1"
                :class="item.task_done ? 'bg-blue-grey-lighten-4':'bg-blue-grey-lighten-5'"
                @click.stop="item.details = !item.details"
            >
                <template v-slot:prepend>
                    <v-icon size="2rem">{{get_stydy(item.type)}}</v-icon>
                </template>
                <template v-slot:append>
                    <div class="d-flex align-center justify-center">
                        <v-btn @click.stop="item.details = !item.details" icon="mdi-information" color="grey-lighten-1" variant="text"></v-btn>
                        <v-checkbox @click.stop="concluirTask(item)" title="concluir" color="success" v-model="item.task_done" hide-details></v-checkbox>
                        <v-checkbox @click.stop="concluirRev(item)" title="revisão" v-if="item.task_done" color="error" v-model="item.rev_done" hide-details></v-checkbox>
                    </div>
                </template>
                <h3 class="titleTask"> Tarefa {{i+1}} - <span :class="item.task_done ? 'taxado' : ''"> {{ get_disciplina(item.id_disciplina) }}</span></h3>
                <span :class="item.task_done ? 'taxado' : ''">{{ item.subject }}</span> <br>
                <div class="mt-3" v-if="item.details">
                    <div v-if="item.type == 4" class="mb-5">
                        <p v-if="item.caderno_qtoes"><span class="font-weight-bold">Caderno de Questões: </span><a :href="item.caderno_qtoes" target="_blank" rel="noopener noreferrer">Clique aqui</a></p>
                        <p v-if="item.qtd_questoes"><span class="font-weight-bold">Quantidade de Questões:</span> {{ item.qtd_questoes }}</p>
                        <p v-if="item.banca"><span class="font-weight-bold">
                            Banca/Tipo de Questões:</span> {{ get_banca(item.banca) }} - {{ get_tipo_qtoes(item.tipo_qtoes) }}</p>
                    </div>
                    <div>
                        <span v-if="item.task_description" ><span class="font-weight-bold">Atividade:</span> {{ item.task_description }}</span> <br v-if="item.task_description" />
                        <span v-if="item.law" ><span class="font-weight-bold">Norma/Lei:</span> {{ item.law }}</span> <br v-if="item.law" />
                        <span v-if="item.link"><span class="font-weight-bold">Link do arquivo: </span> <a :href="item.link" target="_blank" rel="noopener noreferrer">Clique aqui</a></span>
                    </div>
                    <div v-if="item.text_orientacao" class="mt-3">
                        <h3>Orientação</h3>
                        <p v-html="item.text_orientacao"></p>
                    </div>
                </div>
            </v-list-item>
        </v-list>
    </div>
</template>

<script setup>
import { computed, onMounted, ref, provide } from 'vue'
import { useRoute } from 'vue-router';

const route = useRoute()

const tipo = 2
const load = ref(true)

provide('tipo', tipo)

import  { useMetaStore  } from '@/store/useMetaStore'
const metaStore = useMetaStore()

onMounted( () => {
    metaStore.tarefas = []
    metaStore.getTask(route.params.id)
    setTimeout(()=> {
        load.value = false
    }, 1000)
})

const tasks = computed(() => {
    return metaStore.tarefas.sort((a, b) => a.nro_task - b.nro_task);
})


const get_disciplina = (id) => {
    return metaStore.disciplinas.find(x => x.id == id).name
}

const get_stydy = (id) => {
    return metaStore.type_study.find(x => x.id == id).icon
}

const get_banca = (id) => {
    return metaStore.bancas.find(x => x.id == id).name
}

const get_tipo_qtoes = (id) => {
    return metaStore.type_questoes.find(x => x.id == id).name
}

const concluirTask = (item) => {
    metaStore.concluirTask(item)
}

const concluirRev = (item) => {
    metaStore.concluirRev(item)
}

</script>

<style lang="scss" scoped>
.taxado {
  text-decoration: line-through;
}
@media (max-width:500px) {
    .titleTask{
        font-size: 1em;
    }
    .hidden{
        display: none;
    }
}
</style>