<template>
    <div>
        <h3>Lista de tarefas</h3>
        <p>vincular com a revisao</p>
        <v-list>
            <v-list-item
                v-for="item, i in tasks" :key="i" link
                class=" mb-1"
                :class="item.task_done ? 'bg-blue-grey-lighten-4':'bg-blue-grey-lighten-5'"
            >
                <template v-slot:prepend>
                    <v-icon size="2rem">{{get_stydy(item.type)}}</v-icon>
                </template>
                <template v-slot:append>
                    <div class="d-flex align-center justify-center">
                        <v-btn @click="item.details = !item.details" icon="mdi-information" variant="text"></v-btn>
                        <v-checkbox @click="concluirTask(item)" title="concluir" color="success" v-model="item.task_done" hide-details></v-checkbox>
                        <v-checkbox @click="concluirRev(item)" title="revisão" v-if="item.task_done" color="error" v-model="item.rev_done" hide-details></v-checkbox>
                    </div>
                </template>
                <h3> Tarefa {{i+1}} - <span :class="item.task_done ? 'taxado' : ''"> {{ get_disciplina(item.id_disciplina) }}</span></h3>
                <span :class="item.task_done ? 'taxado' : ''">{{ item.subject }}</span> <br>
                <div class="mt-5" v-if="item.details">
                    <span v-if="item.link" ><span class="font-weight-bold">Atividade:</span> {{ item.task_description }}</span> <br v-if="item.link" />
                    <span v-if="item.link"><span class="font-weight-bold">Link do arquivo:</span> {{ item.link }}</span>
                    <div v-if="item.type == 4" class="mb-5">
                        <p v-if="item.caderno_qtoes"><span class="font-weight-bold">Caderno de Questões:</span> {{ item.caderno_qtoes }}</p>
                        <p v-if="item.caderno_qtoes"><span class="font-weight-bold">Quantidade de Questões:</span> {{ item.qtd_questoes }}</p>
                        <p v-if="item.caderno_qtoes"><span class="font-weight-bold">Banca/Tipo de Questões:</span> {{ item.banca }}/{{ item.tipo_qtoes }}</p>
                    </div>
                    <div v-if="item.text_orientacao">
                        <h3>Orientação</h3>
                        <p v-html="item.text_orientacao"></p>
                    </div>
                </div>
            </v-list-item>
        </v-list>
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router';

const route = useRoute()

import  { useMetaStore  } from '@/store/useMetaStore'
const metaStore = useMetaStore()

const details = ref(false)

onMounted( () => {
    metaStore.getTask(route.params.id)
})

const tasks = computed(() => {
    return metaStore.tarefas 
})

const disciplinas = computed(()=> {
    return metaStore.disciplinas
})

const get_disciplina = (id) => {
    return disciplinas.value.find(x => x.id == id).name
}

const type_study = computed(()=> {
    return metaStore.type_study
})

const get_stydy = (id) => {
    return type_study.value.find(x => x.id == id).icon
}

const concluirTask = (item) => {
    metaStore.concluirTask(item)
}

const concluirRev= (item) => {
    metaStore.concluirRev(item)
}

</script>

<style lang="scss" scoped>
.taxado {
  text-decoration: line-through;
}
</style>