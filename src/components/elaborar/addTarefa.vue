<template>
    <div>
        <v-btn color="grey-darken-1" variant="text" icon="mdi-pencil" v-if="tipo == 2" @click="dialog = true"></v-btn>
        <v-btn v-else color="success" variant="flat" @click="dialog = true" prepend-icon="mdi-plus">
            Adicionar Tarefa
        </v-btn>
        <v-dialog
            v-model="dialog"
            width="800px"
        >
            <v-card>
                <v-card-title>Adicionar Tarefa</v-card-title>
                <v-card-text>
                    <v-form @submit.prevent="addTask()" ref="form">
                        <v-row>
                            <v-col cols="3">
                                <v-text-field
                                    label="Tarefa"
                                    variant="outlined"
                                    density="compact"
                                    placeholder="Digite o Nome da Tarefa. ex: Tarefa 01"
                                    v-model="nro_task"
                                    type="number"
                                    readonly
                                ></v-text-field>
                            </v-col>
                            <v-col cols="9">
                                <v-select
                                    label="Disciplina"
                                    variant="outlined"
                                    density="compact"
                                    placeholder="Escolha a disciplina"
                                    v-model="task.id_disciplina"
                                    :items="disciplinas"
                                    item-value="id"
                                    item-title="name"
                                    :rules="[rules.required]"
                                ></v-select>
                            </v-col>
                        </v-row>
                        <v-text-field
                            label="Assunto"
                            variant="outlined"
                            density="compact"
                            placeholder="Digite o assunto a ser estudado. Ex: atos administrativos p1"
                            v-model="task.subject"
                            clearable
                            :rules="[rules.required, rules.minfield]"
                        ></v-text-field>
                        <v-radio-group
                            v-model="task.type"
                            inline
                            class="border pa-2 mb-4"
                            hide-details
                            :rules="[rules.required]"
                        >
                            <v-radio
                                v-for="type, t in type_study" :key="t"
                                :label="type.name"
                                :value="type.id"
                                :color="type.color"
                            ></v-radio>
                        </v-radio-group>
                        <div v-if="task.type == 4">
                            <h3 class="mb-5"> <v-icon>{{ typeSelect.icon }}</v-icon> {{ typeSelect.name }}</h3>
                            <v-text-field
                                label="Link caderno de questões"
                                variant="outlined"
                                density="compact"
                                placeholder="Informe o link do caderno de questões"
                                v-model="task.caderno_qtoes"
                                :rules="[rules.required]"
                            ></v-text-field>
                            <v-text-field
                                label="Qtde Questões"
                                variant="outlined"
                                density="compact"
                                placeholder="Informe a quantidade de questões"
                                v-model.number="task.qtd_questoes"
                                :rules="[rules.required]"
                                type="number"
                            ></v-text-field>
                            <v-select
                                label="Banca"
                                variant="outlined"
                                density="compact"
                                placeholder="Informe a banca do concurso"
                                v-model="task.banca"
                                :items="bancas"
                                item-value="id"
                                item-title="name"
                                :rules="[rules.required]"
                            ></v-select>
                            <v-radio-group
                                v-model="task.tipo_qtoes"
                                inline
                                class="border pa-2 mb-4"
                                hide-details
                                :rules="[rules.required]"
                            >
                                <v-radio
                                    v-for="type, t in type_questoes" :key="t"
                                    :label="type.name"
                                    :value="type.id"
                                    :color="type.color"
                            ></v-radio>
                            </v-radio-group>
                            <orientacoes @text_orientacao="add_orientacao" />
                            <div v-if="text_orientacao?.id" class="my-5">
                                <h3 class="mb-2">Orientação:</h3>
                                <p v-html="text_orientacao.text"></p>
                            </div>
                        </div>
                        <div v-if="task.type && task.type != 4">
                            <h3 class="mb-5"> <v-icon>{{ typeSelect.icon }}</v-icon> {{ typeSelect.name }}</h3>
                            <v-text-field
                                label="Descrição da Tarefa"
                                variant="outlined"
                                density="compact"
                                placeholder="Ler artigo, assistir video, ler pdf, etc"
                                v-model="task.task_description"
                                :rules="[rules.required]"
                            ></v-text-field>
                            <v-text-field
                                label="Normativo"
                                variant="outlined"
                                density="compact"
                                placeholder="Informe o nº do normativo"
                                v-model="task.law"
                                v-if="task.type == 3"
                                :rules="[rules.required, rules.minfield]"
                            ></v-text-field>
                            <v-text-field
                                label="Link do arquivo"
                                variant="outlined"
                                density="compact"
                                placeholder="Informe o link do arquivo se houver"
                                v-model="task.link"
                            ></v-text-field>
                            <orientacoes @text_orientacao="add_orientacao" />
                            <div v-if="text_orientacao?.id" class="my-5">
                                <h3 class="mb-2">Orientação:</h3>
                                <p v-html="text_orientacao.text"></p>
                            </div>
                        </div>
                        <v-btn variant="text" @click="dialog = false">Cancelar</v-btn>
                        <v-btn type="submit" variant="flat" color="primary" class="ml-2">Salvar</v-btn>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script setup>
import { computed, onMounted, ref, inject } from 'vue'
import { useRoute } from 'vue-router';

const route = useRoute()

const tipo = inject("tipo")

const form = ref(null)

const rules = {
    required: value => !!value || "campo obrigatório", 
    minfield: (v) => (v||'').length >= 3 || "Mínimo 4 caracteres",
}

import  { useMetaStore  } from '@/store/useMetaStore'
const metaStore = useMetaStore()

const dialog = ref(false)

const props = defineProps({
    taskEdit: Object
})

onMounted( async () => {
    if(tipo == 2){
        task.value = { ...props.taskEdit }
    }
})

const typeSelect = computed(() => {
    return type_study.value.find(x => x.id == task.value.type)   
})

const text_orientacao = ref({})

const add_orientacao = (evento) => {
    text_orientacao.value = evento
}   

const nro_task = computed(()=> {
    // let nro = metaStore.metas.value.length
    let nro = metaStore.tarefas.length + 1
    return nro
})

const disciplinas = computed(()=> {
    return metaStore.disciplinas
})

const bancas = computed(()=> {
    return metaStore.bancas
})
const type_study = computed(()=> {
    return metaStore.type_study
})

const type_questoes = computed(()=> {
    return metaStore.type_questoes
})

const task = ref({
    nro_task: null,
    id_disciplina: 0,
    subject: null,
    type: 0,
    task_description: null,
    link: null,
    law: null, 
    caderno_qtoes: null,
    qtd_questoes: 0,
    banca: null, 
    tipo_qtoes: 0,
    task_done: false, 
    date_done: null, 
    rev_done: false, 
    date_rev: null
})

const clear = () => {
    task.value = {
        name_task: null,
        id_disciplina: 0,
        subject: null,
        type: 0,
        task_description: null,
        link: null,
        law: null, 
        caderno_qtoes: null,
        qtd_questoes: 0,
        banca: null, 
        tipo_qtoes: 0,
        task_done: false, 
        date_done: null, 
        rev_done: false, 
        date_rev: null
    }
}

const editar_task  = () => {
    metaStore.editar_task(task.value)
    dialog.value = false
    clear()
}

const addTask = async () => {
    const { valid } = await form.value.validate()
        if(valid){
            if(tipo == 2) {
                editar_task()
                return
            } 
            task.value.id_meta = route.params.id
            task.value.nro_task = nro_task.value
        
            if(text_orientacao.value.id){
                task.value.text_orientacao = text_orientacao.value.text
            }
            metaStore.addTask(task.value);
            text_orientacao.value = {}
            nro_task.value++
            clear()
        }
}
</script>

<style lang="scss" scoped>

</style>