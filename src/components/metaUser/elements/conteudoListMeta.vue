<template>
    <div>
        <h1 class="text-h6">Cadernos de Revisão</h1>
        <v-list v-if="listConteudo.length" density="compact">
            <v-list-item 
                @click="confirm(item.idU)"
                v-for="item, i in listConteudo" :key="i" link class="bg-grey-lighten-2 mb-1">
                <template v-slot:append>
                    <v-icon>mdi-link</v-icon>
                </template>
                {{ item.name }}
            </v-list-item>
        </v-list>
        <v-alert v-else>
            Selecione uma disciplina.
        </v-alert>
        <ConfirmationVinc :idVinc="idVinc" @confirmacao="vincularTask" />
    </div>
</template>

<script setup>
    import { ref, computed, provide } from 'vue'

    import  { useMetaStore  } from '@/store/useMetaStore'
    const metaStore = useMetaStore()

    const idVinc = ref('')
    const dialog = ref(false)
    provide('dialog', dialog)

    import { useDbStore } from '@/store/dbStore'
    import ConfirmationVinc from './confirmationVinc.vue';
    const dbStore = useDbStore()

    const listConteudo = computed(() => {
        const disciplina = dbStore.readDisciplinaSel
        let listDisciplinas = dbStore.readConteudo 
        listDisciplinas = listDisciplinas.filter(x => x.disciplina == disciplina)

        return listDisciplinas
    })

    const props = defineProps({
        task: Object
    })

    const confirm = (id) => {
        idVinc.value = id
        dialog.value = true

    }

    const vincularTask = (evento) =>{
        props.task.notebook = evento
        metaStore.editar_task(props.task)
        dialog.value = false
    }

</script>

<style lang="scss" scoped>

</style>