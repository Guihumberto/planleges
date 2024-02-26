<template>
    <div>
        <div class="mt-5">
            <v-autocomplete
                :items="listDisciplinas"
                label="Filtro"
                variant="outlined"
                density="compact"
                style="max-width: 350px;"
                v-model="disciplina"
                clearable
            ></v-autocomplete>
        </div>
        <div class="content">
            <div class="box" v-for="item, i in conteudo" :key="i" v-if="conteudo.length">
                <h2 class="d-flex align-center"> <v-icon size="x-small" class="mr-1">mdi-arrow-right-box</v-icon>{{ item.disciplina }}</h2>
                <p class="ml-7" :title="item.name"> {{ item.name }} </p>
            </div>
            <alerta text="Não há conteúdo cadastrado nesta disciplina" v-else />
        </div>
    </div>
    
</template>

<script>
    import alerta from "@/components/planTools/Alert.vue"

    import { useDbStore } from '@/store/dbStore'
    const dbStore = useDbStore()
    

    export default {
        data(){
            return{
                disciplina: null
            }
        },
        components:{
            alerta
        },
        computed:{
            conteudo(){
                const disciplina = dbStore.readDisciplinaSel
                let listDisciplinas = dbStore.readConteudo 
                if(this.disciplina){
                    listDisciplinas = listDisciplinas.filter(x => x.disciplina == this.disciplina)
                }

                return listDisciplinas
            },
            listDisciplinas(){      
                let list = dbStore.readDisciplinas.map(x => x.nome)
                return list
            }
        }
    }
</script>

<style lang="scss" scoped>
.content{
    display: flex;
    justify-content: left;
    flex-wrap: wrap;
    gap: .5rem;
}
.box{
    display: flex;
    justify-content: end;
    flex-direction: column;
    padding: .5rem;
    border: 1px solid grey;
    border-radius: 10px;
    width: min(99vw, 343px);
    height: 8rem;
    transition:.5s ease-in-out;
}
.box:hover{
    border: 1px solid black;
    box-shadow: 5px 5px 5px #888888;
}
p{
    max-width: 50ch;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>