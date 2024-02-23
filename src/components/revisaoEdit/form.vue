<template>
    <div class="form">
      <v-form @submit.prevent="saveConteudo()" ref="form">
        <v-radio-group label="Tipo da Revisão" inline class="border mb-2 pt-2" v-model="conteudo.type">
          <v-radio :label="type" :value="type" v-for="type, t in listype" :key="t"></v-radio>
        </v-radio-group>
        <v-text-field
          label="Título"
          placeholder="Digite um título curto"
          variant="outlined"
          density="compact"
          v-model.trim="conteudo.title"
          :rules="[rules.required, rules.minname]"
        ></v-text-field>
        <v-textarea
          label="Texto"
          variant="outlined"
          density="compact"
          v-model.trim="conteudo.textrev"
          :rules="[rules.required, rules.minname]"
        ></v-textarea>
        <v-btn flat color="primary" type="submit">Salvar</v-btn>
      </v-form>
      <vueQuillEditor />
    </div>
</template>

<script>
  import vueQuillEditor from "../elements/vueQuillEditor.vue";
  import { useRevStore } from "@/store/revStore";
  const revStore = useRevStore()

    export default {
    components: {
      vueQuillEditor
    },
     data(){
      return{
        conteudo:{
          type: 'comentario',
          questions: [],
          textrev: '',
          title: '',
          idVinculado: this.$route.params.id
        },
        rules:{
            required: (value) => !!value || "Campo obrigatório",
            email: (v) => /.+@/.test(v) || "Deve ser um e-mail válido",
            minname: (v) => (v||'').length >= 3 || "Mínimo 4 caracteres",
        },
      }
     },
     computed:{
      listype(){
        return revStore.readTypes
      }
     },
     methods:{
      async saveConteudo(){
        const { valid } = await this.$refs.form.validate()
        if(valid){
          revStore.addRev(this.conteudo)
          this.clearForms()
        }
      },
      clearForms(){
        this.conteudo = {
          type: '',
          questions: [],
          textrev: '',
          title: '',
          idVinculado: this.$route.params.id
       }
      }
     }
    }
</script>

<style lang="scss" scoped>

</style>