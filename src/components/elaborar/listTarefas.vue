<template>
    <div>
        <h3 class="d-flex justify-space-between align-center">
            Lista de tarefas
            <div>
                <v-btn :append-icon="reordenar? 'mdi-pencil':''"
                variant="text" class="text-capitalize" @click="move = !move, filterDisciplina = null, selected = []">Mover</v-btn>
                <v-btn :append-icon="reordenar? 'mdi-pencil':''"
                variant="text" class="text-capitalize" @click="reordenar = !reordenar">Ordenar</v-btn>
                <v-btn :append-icon="concluidas? 'mdi-check':''" 
                variant="text" density="compact" class="text-capitalize" @click="concluidas = !concluidas">ocultar concluídas</v-btn>
            </div>
        </h3>
        <v-select
            label="Disciplina"
            variant="outlined"
            density="compact"
            placeholder="Escolha a disciplina"
            prepend-inner-icon="mdi-alpha-d-box"
            hide-details
            :items="listDisciplinas"
            item-title="name"
            item-value="id"
            v-model="filterDisciplina"
            clearable
            v-if="!move"
        ></v-select>
        <div v-if="move && selected.length" class="d-flex align-center">
            <span>Mover para ({{ selected.length }}): &nbsp;</span> 
            <v-select
                label="Disciplina"
                variant="outlined"
                density="compact"
                placeholder="Escolha a disciplina"
                prepend-inner-icon="mdi-alpha-m-box"
                hide-details
                :items="metaStore.metas.sort(useOrderName)"
                item-title="meta"
                item-value="id"
                v-model="selectedMeta"
                clearable
                style="max-width: 500px;"
            >
            <template v-slot:append>
                <v-btn :disabled="!selectedMeta" color="primary" variant="flat" @click="moverTasks()">
                    Mover
                </v-btn>
            </template>
            <v-btn>Mover</v-btn>
            </v-select>
        </div>
        <p v-if="metaStore.readLoad">Aguarde...</p>
        <v-list>
            <v-list-item
                v-for="item, i in tasks" :key="i" link
                class="mb-1"
                @click.stop="item.details = !item.details"
                :class="item.task_done ? 'bg-blue-grey-lighten-4':'bg-blue-grey-lighten-5'"
                :id="item.nro_task"
            >
                <template v-slot:prepend>
                    <div v-if="move && !concluidas">
                        <v-checkbox hide-details @click.stop="move ? selectForMove(item) : item.details = !item.details"></v-checkbox>
                    </div>
                    <div style="max-width: 40px;" v-if="reordenar && !concluidas" @keyup.enter="metaStore.editar_task(item)">
                        <input type="number" v-model="item.nro_task" style="width: 30px;" />
                    </div>
                    <div class="d-flex align-center flex-column mr-3" v-if="reordenar && !concluidas">
                        <v-btn @click.stop="reord_up(item)" 
                            :disabled="i == 0"
                            color="success" density="compact" variant="text" 
                            icon="mdi-arrow-up-bold-box"></v-btn>
                        <v-btn @click.stop="reord_down(item)" 
                            :disabled="i == tasks.length - 1"
                            color="success" density="compact" variant="text" icon="mdi-arrow-down-bold-box"></v-btn>
                    </div>
                    <v-icon size="2rem">{{get_stydy(item.type)?.icon}}</v-icon>
                </template>
                <template v-slot:append>
                    <div class="d-flex align-center justify-center">
                        <AddTarefa :taskEdit="item" />
                        <DialogConfirm :id="item.id" :dialogText="dialogText" />
                        <!-- <v-checkbox @click="concluirTask(item)" title="concluir" color="success" v-model="item.task_done" hide-details></v-checkbox> -->
                        <!-- <v-checkbox @click="concluirRev(item)" title="revisão" v-if="item.task_done" color="error" v-model="item.rev_done" hide-details></v-checkbox> -->
                    </div>
                </template>
                <h3> Tarefa {{i+1}} - <span :class="item.task_done ? 'taxado' : ''"> {{ get_disciplina(item.id_disciplina) }}</span></h3>
                <span :class="item.task_done ? 'taxado' : ''">{{ item.subject }}</span> <br>
                <div class="mt-3" v-if="item.details">
                    <div v-if="item.type == 4" class="mb-5">
                        <p v-if="item.caderno_qtoes"><span class="font-weight-bold">Caderno de Questões: </span><a :href="item.caderno_qtoes" target="_blank" rel="noopener noreferrer">Clique aqui</a></p>
                        <p v-if="item.qtd_questoes"><span class="font-weight-bold">Quantidade de Questões:</span> {{ item.qtd_questoes }}</p>
                        <p v-if="item.banca"><span class="font-weight-bold">Banca/Tipo de Questões:</span> {{ item.banca }}/{{ item.tipo_qtoes }}</p>
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
import { computed, onMounted, ref, provide, onUnmounted } from 'vue'
import { useRoute } from 'vue-router';

import { useOrderName } from '@/composables/useOrderName';

const route = useRoute()

const move = ref(false)
const selected = ref([])
const selectedMeta =  ref(null)
const concluidas = ref(false)
const reordenar = ref(false) 
const filterDisciplina = ref(null)
const tipo = 2

provide('tipo', tipo)

const url = ref(route.params.id)


import  { useMetaStore  } from '@/store/useMetaStore'
const metaStore = useMetaStore()

onMounted( () => {
    carregarMeta()
})

const carregarMeta = () => {
    metaStore.getTask(url.value)
} 

const tasks = computed(() => {

    if(filterDisciplina.value){
        return metaStore.tarefas.filter(x => x.id_disciplina == filterDisciplina.value).sort((a, b) => a.nro_task - b.nro_task)
    }
    return concluidas.value 
    ? metaStore.tarefas.filter(x => !x.task_done).sort((a, b) => a.nro_task - b.nro_task)
    : metaStore.tarefas.sort((a, b) => a.nro_task - b.nro_task)
})

const listDisciplinas = computed(()=> {
    let list = metaStore.tarefas.map( x => x.id_disciplina)
    list = [...new Set(list)]
    const newList = []
    list.forEach(x => {
        const objeto = {
            id: x,
            name: get_disciplina(x)
        }
        newList.push(objeto)
    })
    return newList
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
    return type_study.value.find(x => x.id == id)
}

// const concluirTask = (item) => {
//     metaStore.concluirTask(item)
// }

// const concluirRev = (item) => {
//     metaStore.concluirRev(item)
// }

const dialogText = ref({
        title: 'Apagar Tarefa',
        text: 'Confirmar a remoção da tarefa?',
        color: 'red',
        icon: 'mdi-delete',
        type: 2
})

const reord_up = async (item) => {
    const task_desce = tasks.value.find(t => t.nro_task == item.nro_task - 1)
    task_desce.nro_task++
    item.nro_task--
    addClassDown(item.nro_task)
    addClassTop(task_desce.nro_task)
    await metaStore.editar_task(item)
    await metaStore.editar_task(task_desce)
}

const reord_down = async (item) => {
    const task_desce = tasks.value.find(t => t.nro_task == item.nro_task + 1)
    task_desce.nro_task--
    item.nro_task++
    addClassTop(item.nro_task)
    addClassDown(task_desce.nro_task)
    await metaStore.editar_task(item)
    await metaStore.editar_task(task_desce)
}

const addClassTop = (id) => {
    document.getElementById(id).classList.add('effectTop');
}

const addClassDown = (id) => {
    document.getElementById(id).classList.add('effectDown');
}

const selectForMove = (item) => {
    if(!selected.value.includes(item.id)){
        selected.value.push(item.id)
    } else {
        selected.value = selected.value.filter( x => x != item.id)
    }
}

const moverTasks = async () => {
    selected.value.forEach(async x => {
        const task = {
         id: x,
         id_meta: selectedMeta.value
        }
        await metaStore.editar_task(task)
    })
    move.value = false
    selected.value = []
}

// onUnmounted(() => {
//     metaStore.tarefas = []
// })

</script>

<style lang="scss" scoped>
.taxado {
  text-decoration: line-through;
}
.effectTop {
    animation: slideTop 1s ease;
}
.effectDown {
    animation: slideDown 1s ease;
}
@keyframes slideTop {
    from{
        opacity: 0;
        transform: translateY(-100px);
    }
    to{
        opacity: 1;
        transform: translateY(0);
    }
}
@keyframes slideDown {
    from{
        opacity: 0;
        transform: translateY(100px);
    }
    to{
        opacity: 1;
        transform: translateY(0);
    }
}
@media (max-width:500px) {
    .hidden{
        display: none;
    }
}
</style>