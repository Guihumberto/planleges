<template>
    <div class="forms">
        <v-select
            :items="listDisciplinas"
            label="Disciplina"
            variant="outlined"
            density="compact"
            style="width: 400px;"
            v-model.trim="disciplina"
            clearable
        >
            <template v-slot:append-inner>
                <dialogD tipo="1" @insert="insertD($event)" />
            </template>
        </v-select>
    </div>
</template>

<script>
    import { useDbStore } from '@/store/dbStore'
    const dbStore = useDbStore()
    import dialogD from "@/components/planTools/dialogs/incDisciplina.vue"
    export default {
        components:{
            dialogD
        },
        data(){
            return{
                dialog: false,
                disciplina: '',
            }
        },
        watch:{
            disciplina(novo, antigo){
                dbStore.disciplinaSel(novo)
                this.$router.push(`/config?disciplina=${novo}`)

                if(this.$route.query.disciplina == 'null'){
                    this.$router.push('/config')
                    this.disciplina = null
                }
            }
        },
        methods:{
            insertD(item){
                dbStore.addDisciplina(item)
                this.disciplina = item
                dbStore.disciplinaSel(item)
            },
            setDisciplina(){
                this.disciplina = this.$route.query.disciplina ? this.$route.query.disciplina : ''
            }
        },
        computed:{
            disciplinas(){
                return dbStore.readDisciplinas
            },
            listDisciplinas(){
                let list = this.disciplinas.map(x => x.nome)
                return list
            }
        },
        created(){
            this.setDisciplina()
        }
    }
</script>

<style lang="scss" scoped>

</style>