<template>
     <v-btn 
        @click="dialog = true" 
        icon="mdi-plus-box-multiple-outline"
        variant="text"
        class="ml-2"
    >
    </v-btn>

    <v-dialog
      v-model="dialog"
      width="auto"
    >
      <v-card
        width="600"
        prepend-icon="mdi-plus-box-multiple-outline"
        title="Adicionar Multiplas Tarefas"
      >
        <v-card-text>
            <v-form @submit.prevent="addTask()" ref="form">
                <v-form @submit.prevent="addTask()" ref="form">
                        <v-row>
                            <v-col cols="12">
                                <v-select
                                    label="Disciplina"
                                    variant="outlined"
                                    density="compact"
                                    placeholder="Escolha a disciplina"
                                    v-model="selectDisciplina"
                                    :items="disciplinas"
                                    item-value="id"
                                    item-title="name"
                                    :rules="[rules.required]"
                                ></v-select>
                            </v-col>
                        </v-row>
                        <div v-for="item, i in listTask" :key="i">
                            <v-radio-group
                                v-model="item.type"
                                inline
                                class="border pa-2 mb-4"
                                hide-details
                                :rules="[rules.required]"
                            >
                                <v-radio
                                    density="compact"
                                    v-for="type, t in type_study" :key="t"
                                    :label="type.name"
                                    :value="type.id"
                                    :color="type.color"
                                ></v-radio>
                            </v-radio-group>
                            <v-row>
                                <v-col cols="2">
                                    <v-text-field
                                        label="Tarefa"
                                        variant="outlined"
                                        density="compact"
                                        placeholder="Digite o Nome da Tarefa. ex: Tarefa 01"
                                        v-model.number="item.nro_task"
                                        type="number"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="10">
                                    <v-text-field
                                        label="Assunto"
                                        variant="outlined"
                                        density="compact"
                                        placeholder="Digite o assunto a ser estudado. Ex: atos administrativos p1"
                                        v-model="item.subject"
                                        clearable
                                        :rules="[rules.required, rules.minfield]"
                                    >
                                    <template v-slot:append>
                                        <v-btn 
                                           @click="listTask.push({...task})" 
                                           color="success"
                                           v-if="i == (listTask.length - 1)" density="compact" variant="text" icon="mdi-plus">
                                        </v-btn>
                                        <v-btn v-else
                                           @click="listTask.splice(i, 1)"
                                           density="compact"
                                           icon="mdi-minus"
                                           color="error"
                                           variant="text"
                                        ></v-btn>
                                    </template>
                                </v-text-field>
                                </v-col>
                            </v-row>   
                        </div>
                        
                        <v-btn variant="text" @click="dialog = false">Cancelar</v-btn>
                        <v-btn type="submit" variant="flat" color="success" class="ml-2">Salvar</v-btn>
                </v-form>
            </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
</template>

<script setup>
    import { ref } from 'vue';
    import { useRoute } from 'vue-router';
    const route = useRoute()
    const dialog = ref(false)
    const form = ref(null)

    const rules = {
        required: value => !!value || "campo obrigatório", 
        minfield: (v) => (v||'').length >= 3 || "Mínimo 4 caracteres",
    }

    const qtdListTask = ref(1)

    import  { useMetaStore  } from '@/store/useMetaStore'
    const metaStore = useMetaStore()

    const nro_task = computed(()=> {
        let nro = metaStore.tarefas.length + qtdListTask.value
        return nro
    })

    const disciplinas = computed(()=> {
        return metaStore.disciplinas
    })

    const type_study = computed(()=> {
        return metaStore.type_study
    })

    const task = ref({
        nro_task: 0,
        subject: null,
        type: 0,
        priority: 2,
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

    const selectDisciplina =  ref(0)

    const listTask = ref([
     {
        nro_task: nro_task.value,
        subject: null,
        type: 0,
        priority: 2,
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
    ])

    const clear = () => {
        listTask.value = [
            {
                nro_task: nro_task.value,
                subject: null,
                type: 0,
                priority: 2,
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
        ]
    }

    const addTask = async () => {
        const { valid } = await form.value.validate()
            if(valid){

                listTask.value.forEach(async x => {
                    x.id_meta = route.params.id
                    x.uid = metaStore.meta.user
                    x.id_disciplina = selectDisciplina.value,
                     
                    await metaStore.addTask(x);

                })
                clear()
                dialog.value = false
            }
    }

</script>

<style lang="scss" scoped>

</style>