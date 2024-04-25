<template>
    <div class="text-center pa-4">
      <v-btn flat @click="dialog = true"> <v-icon>mdi-plus</v-icon>Questão</v-btn>  
      <v-dialog
        v-model="dialog"
        width="auto"
      >
        <v-card
          width="600"
          prepend-icon="mdi-plus"
          title="Questão"
        >
          <template v-slot:actions>
            <v-btn
              class="ms-auto"
              text="Fechar"
              @click="dialog = false"
            ></v-btn>
          </template>
          <v-card-item>
            <h3>Add Questões</h3>
            <v-form class="mt-5" @submit.prevent="saveQuestion()" ref="form">
              <v-text-field
                label="Questão"
                variant="outlined"
                density="compact"
                v-model.trim="formQuestion"
                :rules="[rules.required, rules.minname]"
              ></v-text-field>
              <div class="d-flex justify-end">
                <v-btn variant="outlined" type="submit">Incluir</v-btn>
              </div>
            </v-form>
          </v-card-item>
          <v-card-item v-if="listQuestions.length">
            <h3>Lista de Questões</h3>
            <div class="mt-5">
              <div v-for="item, i in listQuestions" :key="i" class="d-flex align-center">
                <a class="mr-2" :href="item" target="_blank">Questão {{ i+1 }}</a> 
                <v-btn title="Excluir" @click="deleteQuestion(i)" density="compact" flat icon="mdi-close"></v-btn>
              </div>
            </div>
          </v-card-item>
        </v-card>
      </v-dialog>
    </div>
  </template>
  <script>
    import { useRevStore } from "@/store/revStore";
    const revStore = useRevStore()
    
    export default {
      data () {
        return {
          dialog: false,
          formQuestion: '',
          rules:{
              required: (value) => !!value || "Campo obrigatório",
              minname: (v) => (v||'').length >= 3 || "Mínimo 4 caracteres",
          },
        }
      },
      props:{
        revItem: Object
      },
      computed:{
        listQuestions(){
          return this.revItem.questions
        }
      },
      methods:{
        async saveQuestion(){
          const { valid } = await this.$refs.form.validate()
          if(valid){
            let question = this.formQuestion
            this.revItem.questions.push(question)
            revStore.editRevTagQuestion(this.revItem)
            this.formQuestion = ""
          }
        },
        deleteQuestion(item){
          this.revItem.questions.splice(item, 1);
          console.log(item);
          revStore.editRevTagQuestion(this.revItem)
        }
      }
  }
</script>