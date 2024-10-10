<template>
    <h1 class="ml-1 mb-2 text-h6"><v-icon size="1.5rem">mdi-card-bulleted</v-icon> Cadernos</h1>
    <div class="wrapper">
        <v-alert v-if="dbStore.load">
            Carregando...
        </v-alert>
        <div v-else class="wrapper-list">
            <v-list class="pa-0 ma-0 list">
                <v-list-item 
                    v-if="dbStore.readConteudo.length"
                    @click="revisaoAction(item)"
                    v-for="item, i in conteudo" :key="i" class="bg-grey-lighten-4 mb-1" link>
                    <template v-slot:prepend>
                        <v-icon>
                            mdi-content-paste
                        </v-icon>
                    </template>
                    <v-list-item-title>{{ item.name }}</v-list-item-title>
                    <v-list-item-subtitle>{{ item.disciplina }}</v-list-item-subtitle>
                    <dialogRevisar :item="item" />
                </v-list-item>
                <v-alert v-else>Você ainda não criou nenhum caderno de revisão.</v-alert>
            </v-list>
        </div>
    </div>
</template>

<script setup>
    import { computed, ref, provide } from 'vue';

    import { useRevStore } from "@/store/revStore";
    const revStore = useRevStore()

    const dialog = ref(false)
    const caderno = ref(null)

    provide('dialogRevisar', dialog)
    provide('caderno', caderno)

    import { useDbStore } from '@/store/dbStore';
    const dbStore = useDbStore()

    const conteudo = computed(()=> {
        const disciplina = dbStore.readDisciplinaSel
        const listDisciplinas = dbStore.readConteudo 
        return !!disciplina
        ? listDisciplinas.filter(x => x.disciplina == disciplina)
        : listDisciplinas
    }) 

    const revisaoAction = async (item) => {
        caderno.value = item
        if(!dbStore.readDisciplinaSel){
            dbStore.disciplinaSel(item.diciplina, false)
        }
        await revStore.getRev(item.idU)
        dialog.value = true
    }

</script>

<style lang="scss" scoped>
.wrapper{
    min-width: 100%;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    gap: .5rem;
    min-height: 200px;
    border: 1px solid rgb(210, 202, 202);
    border-radius: 8px;
    padding: 1rem;
}
.wrapper-list{
    position: relative;
    height: 78vh;
    width: 100%;
    overflow-y: auto; /* exibe a barra de rolagem vertical se necessário */
}
.list {
    position: absolute;
    background: rgb(69, 70, 68);
    width: 100%;
}

</style>