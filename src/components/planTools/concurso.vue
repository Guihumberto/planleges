<template>
    <div class="concurso">
          <v-autocomplete
            label="Concurso"
            variant="outlined"
            placeholder="selecione uma opção"
            density="compact"
            style="max-width: 400px;"
            :items="concursos"
            item-title="nome"
            item-value="nome"
            v-model="concurso"
          >
          <template v-slot:append-inner>
            <dialogD tipo="2" @insert="insertC($event)"  />
          </template>
          </v-autocomplete>
    </div>
</template>

<script>
    import { useDbStore } from '@/store/dbStore'
    const dbStore = useDbStore()
    import dialogD from "@/components/planTools/dialogs/incDisciplina.vue"

    export default {
        components:{
            dialogD,
        },
        data(){
          return{
            concurso: '',
          }
        },
        computed:{
          concursos(){
            return dbStore.readConcursos
          }
        },
        methods: {
          insertC(item){
            dbStore.addConcurso(item)
            this.concurso = item
          }
        },
    }
</script>

<style lang="scss" scoped>

</style>