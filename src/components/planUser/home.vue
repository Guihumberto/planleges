<template>
    <div class="mb-15 pa-2 border bg-blue-grey-lighten-5">
        <div v-if="userStore.readUserDados.planmain">
            <h3>Progressão dos estudos</h3>
            {{ conteudoStore.readListEdital.find(x => x.idU == conteudoStore.readPlanMain?.id_concurso)?.concurso }}<br>
            {{ conteudoStore.readCargos.find(x => x.id == conteudoStore.readPlanMain?.id_cargo)?.name  }}<br><br>
          
            <v-divider class="mt-5"></v-divider>
            <ListEmentaDisciplinasUser v-if="conteudoStore.readPlanMain.disciplinas.length" :disciplinas="conteudoStore.readPlanMain.disciplinas" />
           
        </div>
        <div v-else>
            <h1>Conteúdo Edital</h1>
            <v-alert class="my-5 pa-2 border" type="info">
                <p>Agora é possível escolher um edital para direcionar seus estudos</p>
            </v-alert>
            <div class="d-flex" v-if="!confirm">
                <v-list class="pa-0 bg-transparent">
                    <v-list-item link v-for="item, i in conteudoStore.readListEdital" :key="i" 
                        variant="plain"
                        @click.stop="selectCargo(item.idU)" :title="item.concurso">
                        <template v-slot:prepend><v-icon>mdi-list-box-outline</v-icon></template>
                    </v-list-item>
                </v-list>
                <div>
                    <v-list class="pa-0 bg-transparent" v-if="concurso">
                        <v-list-item 
                            variant="plain"
                            link v-for="item, i in conteudoStore.readCargos" :key="i" @click ="selectDisciplinas(item.id)" :title="item.name">
                            <template v-slot:prepend><v-icon>mdi-account</v-icon></template>
                        </v-list-item>
                    </v-list>
                </div>
                <div class="flex-grow" v-if="cargoSelect">
                    <v-list class="pa-0 bg-transparent" v-model:selected="settingsSelection" select-strategy="leaf">
                        <v-list-subheader>Disciplinas</v-list-subheader>
                        <v-list-item link v-for="item, i in conteudoStore.readDisciplinas" 
                            :key="i" :title="metaStore.readDisciplinas.find(x => x.id == item.name ).name"
                            :subtitle="item.tipo == 2 ? 'Conhecimentos Específicos' : 'Conhecimentos Gerais'"
                            :value="item.id"
                        >
                            <template v-slot:prepend="{ isSelected }">
                                <v-list-item-action start>
                                    <v-checkbox-btn :model-value="isSelected"
                                        hide-details
                                    ></v-checkbox-btn>
                                </v-list-item-action>
                            </template>
                        </v-list-item>
                        <div class="text-right pa-2" v-if="conteudoStore.readDisciplinas.length">
                            <v-btn variant="text" prepend-icon="mdi-list-box" color="primary" @click="importAll">Importar todas</v-btn>
                            <v-btn variant="text" prepend-icon="mdi-check-all" color="success" @click="importSelect" :disabled="!settingsSelection.length">Importar Selecionadas</v-btn>
                        </div>
                    </v-list>
                </div>
            </div>
            <div v-else>
                {{ conteudoStore.readListEdital.find(x => x.idU == concurso).concurso }}<br>
                {{ conteudoStore.readCargos.find(x => x.id == cargoSelect).name  }}<br><br>
                <h4 class="mb-5">Disciplinas</h4>
                
                <ListEmentaDisciplinas :modo="true" v-if="disciplinasSelect.length" :disciplinas="disciplinasSelect" />
                <div class="text-right pa-2">
                    <v-btn variant="text" prepend-icon="mdi-list-box" color="grey" @click="confirm = false">Cancelar</v-btn>
                    <v-btn variant="flat" prepend-icon="mdi-check-all" color="success" @click="salvePlan">Salvar</v-btn>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, ref } from 'vue';

    import { useConteudoStore } from '@/store/useConteudoStore'
    const conteudoStore = useConteudoStore()

    import { useMetaStore } from '@/store/useMetaStore';
    import ListEmentaDisciplinas from '../EmentaCargos/listEmentaDisciplinas.vue';
    const metaStore = useMetaStore()
    
    import { useRegisterStore } from '@/store/useRegisterStore';
    const userStore = useRegisterStore()

    onMounted(async () => {
        await conteudoStore.getConcursos()
        if(userStore.readUserDados?.planmain){
            conteudoStore.getPlanMain()
        }
    })

    const confirm = ref(false)
    const concurso = ref(null)
    const cargoSelect = ref(null)
    const settingsSelection = ref([])
    const disciplinasSelect = ref([])

    const selectCargo = async (item) => {
        concurso.value = item
        conteudoStore.disciplinas = []
        await conteudoStore.getCargos(item)
    }

    const selectDisciplinas = async (item) => {
        cargoSelect.value = item
        await conteudoStore.getDisciplinasEmenta(item)
    }

    const importAll = () => {
        disciplinasSelect.value = conteudoStore.readDisciplinas
        confirm.value = true
    }

    const importSelect = () => {
        disciplinasSelect.value = conteudoStore.readDisciplinas.filter(x => settingsSelection.value.includes(x.id))
        confirm.value = true
    }

    const salvePlan = async () => {
        const objeto = {
            id_cargo: cargoSelect.value,
            id_concurso: concurso.value,
            disciplinas: disciplinasSelect.value
        }

        await conteudoStore.savePlanUser(objeto)
        await conteudoStore.getPlanMain()

        clear()
    }

    const clear = () => {
        confirm.value = false
        concurso.value = null
        cargoSelect.value = null
        settingsSelection.value = []
    }

</script>

<style scoped>
.flex-grow {
  flex-grow: 1;
}

</style>