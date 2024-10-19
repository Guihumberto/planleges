<template>
    <div>
        <h3 class="d-flex justify-space-between align-center">
            Lista de tarefas
            <div>
                <v-btn :append-icon="reordenar? 'mdi-pencil':''"
                variant="text" class="text-capitalize" @click="reordenar = !reordenar">Ordenar</v-btn>
                <v-btn :append-icon="concluidas? 'mdi-check':''" 
                variant="text" density="compact" class="text-capitalize" @click="concluidas = !concluidas">ocultar concluídas</v-btn>
            </div>
        </h3>
        <div class="filter">
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
            ></v-select>
            <p class="pa-2 border text-center"> {{ total_concluidas }} / {{ metaStore.tarefas.length }} concluídas</p>    
        </div>
        <p v-if="metaStore.readLoad">Aguarde...</p>
        <p v-if="load && !metaStore.readLoad">Carregando...</p>
        <v-list v-else>
            <v-list-item
                v-for="item, i in tasks" :key="i" link
                class=" mb-1"
                :class="item.task_done ? 'bg-blue-grey-lighten-4':'bg-blue-grey-lighten-5'"
                @click.stop="item.details = !item.details"
                :id="item.nro_task"
            >
                <template v-slot:prepend>
                    <div style="width: 20px;" v-if="reordenar && !concluidas">
                        {{ item.nro_task }}
                    </div>
                    <div class="d-flex align-center flex-column mr-3" v-if="reordenar && !concluidas">
                        <v-btn @click.stop="reord_up(item)" 
                            :disabled="i == 0 || metaStore.readLoad"
                            color="success" density="compact" variant="text" 
                            icon="mdi-arrow-up-bold-box"></v-btn>
                        <v-btn @click.stop="reord_down(item)" 
                            :disabled="i == tasks.length - 1 || metaStore.readLoad"
                            color="success" density="compact" variant="text" icon="mdi-arrow-down-bold-box"></v-btn>
                    </div>
                    <v-icon size="2rem">{{get_stydy(item.type)}}</v-icon>
                </template>
                <template v-slot:append>
                    <div class="d-flex align-center justify-center">
                        <VincularRev :task="item" />
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
const concluidas = ref(false)
const reordenar = ref(false) 
const filterDisciplina = ref(null)

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

    if(filterDisciplina.value){
        return metaStore.tarefas.filter(x => x.id_disciplina == filterDisciplina.value).sort((a, b) => a.nro_task - b.nro_task)
    }
    return concluidas.value 
    ? metaStore.tarefas.filter(x => !x.task_done).sort((a, b) => a.nro_task - b.nro_task)
    : metaStore.tarefas.sort((a, b) => a.nro_task - b.nro_task)
})

const total_concluidas = computed(() => {
    return metaStore.tarefas.filter(x=> x.task_done).length
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
    verifica_finalizacao(item)
}

const verifica_finalizacao = (item) => {
    if(total_concluidas.value + 1 == tasks.value.length){
        if(!item.task_done) metaStore.concluirMeta(route.params.id, true)
    } else {
        metaStore.concluirMeta(route.params.id, false)
    }
}

const concluirRev = (item) => {
    metaStore.concluirRev(item)
}

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
    removeClassTop(item.nro_task)
    addClassDown(task_desce.nro_task)
}

const addClassTop = (id) => {
    document.getElementById(id).classList.add('effectTop');
    
}

const addClassDown = (id) => {
    document.getElementById(id).classList.add('effectDown');
}

const removeClassTop = (id) => {
    setTimeout(()=> {
        document.getElementById(id).classList.remove('effectTop');
    }, 1000)
}

const removeClassDown = (id) => {
    setTimeout(()=> {
        document.getElementById(id).classList.remove('effectDown');
    }, 1000)
}

</script>

<style lang="scss" scoped>
.taxado {
  text-decoration: line-through;
}
.filter{
    display: flex;
    justify-content: space-around;
    gap: 1rem;
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
    .titleTask{
        font-size: 1em;
    }
    .hidden{
        display: none;
    }
    .filter{
        flex-direction: column-reverse;
    }
}
</style>