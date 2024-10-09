<template>
    <div class="content">
        <h5 class="text-h6 mb-5"><v-icon size="1.5rem">mdi-tag</v-icon> Disciplinas</h5>
        <v-alert v-if="dbStore.load">
            Carregando...
        </v-alert>
        <v-list class="pa-0 ma-0" v-else>
            <v-list-item 
                :class="idDelete == item.idU ? 'bg-error' : '' "
                v-for="item, i in dbStore.readDisciplinas" :key="i" class="bg-grey-lighten-4 mb-1" link>
                <v-list-item-title>{{ item.nome }} ({{ qdtCaderno(item.nome) }})</v-list-item-title>
                <template v-slot:append>
                    <v-btn title="Excluir disciplina" variant="text" icon="mdi-delete" color="error" v-if="excluir && idDelete != item.idU" @click.stop="idDelete = item.idU"></v-btn>
                    <div v-else>
                        <div v-if="idDelete == item.idU">
                            <v-btn color="orange" variant="flat" class="mr-2" @click.stop="confirmation(item.idU)">Sim</v-btn>
                            <v-btn variant="text" class="pa-0" density="compact" @click.stop="idDelete = null">cancelar</v-btn>
                        </div>
                    </div>
                </template>
            </v-list-item>
        </v-list>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import  { useDbStore } from '@/store/dbStore'
    const dbStore = useDbStore()

    const props = defineProps({
        excluir: Boolean
    })

    const idDelete = ref(null)

    const confirmation = async (id) => {
        await dbStore.deleteDisciplina(id)
        idDelete.value = null
    }

    const resultado = dbStore.readConteudo.reduce((acc, item) => {
        const disciplinaExistente = acc.find(obj => obj.disciplina === item.disciplina);
        
        if (disciplinaExistente) {
            disciplinaExistente.qtd++;
        } else {
            acc.push({ disciplina: item.disciplina, qtd: 1 });
        }
        
        return acc;
    }, []);

    const qdtCaderno = (id) => {
        const qtd = resultado.find( x => x.disciplina == id)
        return qtd?.qtd
        ? qtd?.qtd
        : 0
    }

</script>

<style lang="scss" scoped>
.content{
    min-height: 50vh;
    min-width: 300px;
    padding: 1rem;
    border: 1px solid rgb(220, 219, 219);
    border-radius: 3px;
    display: flex;
    flex-direction: column;
}

</style>