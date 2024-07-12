<template>
    <div>
        <div class="my-5 d-flex align-center justify-space-between mx-1">
            <h1>Home</h1>
            <v-autocomplete
                :items="listDisciplinas"
                label="Filtro"
                variant="outlined"
                density="compact"
                style="max-width: 350px;"
                v-model="disciplina"
                hide-details
                clearable
            ></v-autocomplete>
        </div>
        <div class="content">
            <listDisciplinas class="listDisciplinas" />
            <div class="groupBox">
                <div class="box" v-for="item, i in conteudo" :key="i" v-if="conteudo.length">
                    <h2 class="d-flex align-center"> <v-icon size="x-small" class="mr-1">mdi-arrow-right-thick</v-icon>{{ item.disciplina }}</h2>
                    <p class="ml-7" :title="item.name"> {{ item.name }} </p>
                </div>
                <alerta text="Não há conteúdo cadastrado nesta disciplina" v-else />
            </div>
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
    color: #212121;
    gap: .5rem;
}
.listDisciplinas{
    transition: 1s ease;
}
@media (max-width: 1100px) {
    .listDisciplinas{
        display: none;
    }
    .groupBox{
        width: 100%;
        justify-content: center;
    }
    .content{
        justify-content: center;
    }
}
.groupBox{
    width: 80%;
    display: flex;
    justify-content: left;
    align-items:flex-start;
    flex-wrap: wrap;
    gap: .5rem;
    
}
.box{
    display: flex;
    justify-content: end;
    flex-direction: column;
    padding: .5rem;
    border: 1px solid rgb(220, 219, 219);
    border-radius: 3px;
    width: min(99vw, 270px);
    height: 8rem;
    transition:.5s ease-in-out;
    animation: appear linear;
    animation-timeline: view();
    animation-range: entry 0% cover 15%;
}
.box:hover{
    border: 1px solid rgb(113, 111, 111);
    box-shadow: 2px 2px 2px #888888;
}
.box h2{
    font-size: 1.1rem;
}
.box p{
    font-size: 0.8rem;
}
p{
    max-width: 50ch;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
@keyframes appear {
    from{
        opacity: 0;
        clip-path: inset(100% 100% 0 0);
    }
    to {
        opacity: 1;
        clip-path: inset(0 0 0 0);
    }
}
</style>