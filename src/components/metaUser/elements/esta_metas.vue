<template>
      <v-btn @click="dialog = true" prepend-icon="mdi-chart-bar" variant="text" class="text-capitalize" >
        <span class="hidden">Estatísticas</span>
      </v-btn>
  
      <v-dialog
        v-model="dialog"
        width="auto"
      >
        <v-card
          max-width="800"
          prepend-icon="mdi-chart-bar"
          text="Acompanhe seu progresso na semana."
          title="Estatísticas"
        >
            <v-card-text>
                <div class="item" :class="total_concluidas.length == metaStore.tarefas.length ? 'bg-green-lighten-5' : ''">
                    Tarefas Realizadas: {{ total_concluidas.length }} / {{ metaStore.tarefas.length }}
                </div>
                <div class="item" :class="total_concluidas.length == metaStore.tarefas.length ? 'bg-green-lighten-5' : ''">
                    Questões Respondidas: {{ totalQuestoesFeitas }} / {{ totalQuestoes }}
                </div>
                <div class="container">
                    <div class="item" v-if="totalVideo" :class="totalVideoFeito == totalVideo ? 'bg-green-lighten-5' : ''">
                        Vídeo <br>
                        {{ totalVideoFeito }} / {{ totalVideo }}
                    </div>
                    <div class="item" v-if="totalTaskQuestao" :class="totalTaskQuestaoFeitas == totalTaskQuestao ? 'bg-green-lighten-5' : ''">
                        Questões <br>
                        {{ totalTaskQuestaoFeitas }} / {{ totalTaskQuestao }}
                    </div>
                    <div class="item" v-if="totalTeoria" :class="totalTeoriaFeitas == totalTeoria ? 'bg-green-lighten-5' : ''">
                        Teoria <br>
                        {{ totalTeoriaFeitas }} / {{ totalTeoria }}
                    </div>
                    <div class="item" v-if="totalLeitura" :class="totalLeituraFeitas == totalLeitura ? 'bg-green-lighten-5' : ''">
                       Normas <br>
                       {{ totalLeituraFeitas }} / {{ totalLeitura }}
                    </div>
                    <div class="item" v-if="totalRevisao" :class="totalRevisaoFeitas == totalRevisao ? 'bg-green-lighten-5' : ''">
                        Revisao <br>
                        {{ totalRevisaoFeitas }} / {{ totalRevisao }}
                    </div>
            
                </div>
                <v-timeline align="start">
                    <v-timeline-item
                    v-for="(task, i) in tasksPorDataConcluida"
                    :key="i"
                    dot-color="primary"
                    size="small"
                    >
                    <template v-slot:opposite>
                        <div
                        class="pt-1 headline font-weight-bold text-primary"
                        v-text="task.date"
                        ></div>
                    </template>
                    <div :class="i % 2 === 0 ? 'text-left' : 'text-right'"> 
                        <h2 
                            class="mt-n1 headline font-weight-light mb-4 text-primary"
                        >
                        {{ useDiaSemana(task.date) }}
                        </h2>
                        <div>
                            <v-list class="ma-0 pa=0">
                                <v-list-item class="ma-0" link v-for="item, p in task.item" :key="p">
                                    <v-list-item-title>
                                        {{ item.subject }}
                                    </v-list-item-title>
                                    <v-list-item-subtitle>
                                        {{ get_disciplina(item.id_disciplina) }}
                                    </v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </div>
                    </div>
                    </v-timeline-item>
                </v-timeline> 
            </v-card-text>
          <template v-slot:actions>
            <v-btn
              class="ms-auto"
              text="Fechar"
              @click="dialog = false"
            ></v-btn>
          </template>
        </v-card>
      </v-dialog>
</template>
<script setup>
    import { computed, ref } from 'vue';
    import { useDateNowFormat } from '@/composables/useDateNowFormat'
    import { useDiaSemana } from '@/composables/useDiaSemana'

    const dialog = ref(false)

    const get_disciplina = (id) => {
        return metaStore.disciplinas.find(x => x.id == id).name
    }

    import  { useMetaStore  } from '@/store/useMetaStore'
    const metaStore = useMetaStore()

    const tasks = computed(() => {
         const list = metaStore.tarefas.filter( x=> x.task_done)

         list.forEach(x => {
            x.dateFormat = useDateNowFormat(x.date_done)
         })

         return list
    })

    const tasksPorDataConcluida = computed(()=> {
        const list = tasks.value.reduce((acc, item) => {
            const dataExistente = acc.find(obj => obj.date == item.dateFormat);
            if(dataExistente){
                dataExistente.item.push(item)
            } else {
                const objeto = {
                    date: item.dateFormat,
                    item: [ {...item} ]
                }
                acc.push(objeto)
            }
            return acc.sort((a, b) => a.date - b.date)

        }, [])
        return list
    })

    const total_concluidas = computed(() => {
        return metaStore.tarefas.filter(x=> x.task_done)
    })

    const totalQuestoes = computed(() => {
        const total = metaStore.tarefas.reduce((acc, item) => {
            acc += item.qtd_questoes
            console.log(item.qtd_questoes)
            return acc
        }, 0)
        return total
    })

    const totalQuestoesFeitas = computed(() => {
        const total = total_concluidas.value.reduce((acc, item) => {
            acc += item.qtd_questoes
            return acc
        }, 0)
        return total
    })

    const totalVideo = computed(() => {
        const total = metaStore.tarefas.reduce((acc, item) => {
            if(item.type == 1) acc++
            return acc
        }, 0)
        return total
    })

    const totalVideoFeito = computed(() => {
        const total = total_concluidas.value.reduce((acc, item) => {
            if(item.type == 1) acc++
            return acc
        }, 0)
        return total
    })

    const totalTeoria = computed(() => {
        const total = metaStore.tarefas.reduce((acc, item) => {
            if(item.type == 2) acc++
            return acc
        }, 0)
        return total
    })

    const totalTeoriaFeitas = computed(() => {
        const total = total_concluidas.value.reduce((acc, item) => {
            if(item.type == 2) acc++
            return acc
        }, 0)
        return total
    })

    const totalLeitura = computed(() => {
        const total = metaStore.tarefas.reduce((acc, item) => {
            if(item.type == 3) acc++
            return acc
        }, 0)
        return total
    })

    const totalLeituraFeitas = computed(() => {
        const total = total_concluidas.value.reduce((acc, item) => {
            if(item.type == 3) acc++
            return acc
        }, 0)
        return total
    })

    const totalRevisao = computed(() => {
        const total = metaStore.tarefas.reduce((acc, item) => {
            if(item.type == 5) acc++
            return acc
        }, 0)
        return total
    })

    const totalRevisaoFeitas = computed(() => {
        const total = total_concluidas.value.reduce((acc, item) => {
            if(item.type == 5) acc++
            return acc
        }, 0)
        return total
    })

    const totalTaskQuestao = computed(() => {
        const total = metaStore.tarefas.reduce((acc, item) => {
            if(item.type == 4) acc++
            return acc
        }, 0)
        return total
    })

    const totalTaskQuestaoFeitas = computed(() => {
        const total = total_concluidas.value.reduce((acc, item) => {
            if(item.type == 4) acc++
            return acc
        }, 0)
        return total
    })

</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: space-between; /* Opcional: espaço entre os itens */
}

.item {
  flex: 1; /* Todos os itens terão o mesmo tamanho */
  margin: 5px; /* Espaçamento entre os itens */
  background-color: #f0f0f0;
  text-align: center;
  padding: 10px;
  border: 1px solid #ccc;
}
@media (max-width:500px) {
    .hidden{
        display: none;
    }
}
</style>