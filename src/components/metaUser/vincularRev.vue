<template>
    <v-btn color="primary"@click.stop="dialog = true" title="Vincular a Revisão" variant="text" density="comfortable" icon="mdi-alpha-r-box"></v-btn>
    <v-dialog
      v-model="dialog"
      width="auto"
    >
      <v-card
        max-width="500"
        prepend-icon="mdi-alpha-r-box"
        title="Vincular Tarefa a Revisão"
      >
        <v-card-text v-if="!task.notebook">
            <div v-if="!nbExist">
                <p>Selecione uma disciplina e escola ou crie um caderno para vincular a tarefa a revisão.</p>
                <p class="my-5"><span class="font-weight-bold">Disciplina: </span>{{ get_disciplina(task.id_disciplina) }}</p>
                <v-text-field
                  label="Tópico"
                  variant="outlined"
                  density="compact"
                  placeholder="Digite o nome do tópico."
                  v-model="task.subject"
                  hide-details
                ></v-text-field>
            </div>
            <div class="btns">
                <v-btn v-if="!nbExist" :loading="load" variant="flat" color="primary" @click="createNotebook()">Criar caderno </v-btn>
                <v-btn variant="text" color="primary" @click="nbExist = !nbExist">Escolher um caderno existente <span v-if="nbExist"> - (X)</span> </v-btn>
            </div>
            <div v-if="nbExist" class="mt-5">
                <p class="mb-5">Selecione uma disciplina e um caderno existente:</p>
                <disciplinaListMeta />
                <conteudoListMeta :task="task" />
            </div>
        </v-card-text>
        <v-card-text v-else>
            <div>
                <p>Esta tarefa já possui um caderno de revisão vinculado a ela.</p>
                <router-link target="blank" :to="`/revisao/${task.notebook}`">Ir para o caderno de revisão vinculado</router-link>

            </div>
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
    import { ref } from 'vue';

    import  { useMetaStore  } from '@/store/useMetaStore'
    const metaStore = useMetaStore()

    import  { useDbStore  } from '@/store/dbStore'
    const dbStore = useDbStore()

    const dialog = ref(false)
    const load = ref(false)
    const nbExist = ref(false)

    const props = defineProps({
        task: Object
    })

    const get_disciplina = (id) => {
        return metaStore.disciplinas.find(x => x.id == id).name
    }

    const createNotebook = async () => {
        load.value = true
        await dbStore.disciplinaSel(get_disciplina(props.task.id_disciplina))
        const id_nb = await dbStore.addConteudo(props.task.subject)
        props.task.notebook = id_nb
        metaStore.editar_task(props.task)
        load.value = false
    }
</script>

<style lang="scss" scoped>
.btns{
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
}
</style>