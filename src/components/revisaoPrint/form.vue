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
        <div class="mb-5">
          <div ref="editor"></div>
        </div>
        <v-btn flat color="primary" type="submit">Salvar</v-btn>
      </v-form>
    </div>
</template>

<script>
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import Quill from 'quill'
  
  import { useRevStore } from "@/store/revStore";
  const revStore = useRevStore()

    export default {
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
        editor:'',
        quill: null,
      }
     },
     computed:{
      listype(){
        return revStore.readTypes
      },
     },
     methods:{
      async saveConteudo(){
        const { valid } = await this.$refs.form.validate()
        if(valid){
          this.conteudo.textrev = this.quill.root.innerHTML;
          revStore.addRev(this.conteudo)
          this.clearForms()
          this.quill.root.innerHTML = ''
        }
      },
      clearForms(){
        this.conteudo = {
          type: 'comentario',
          questions: [],
          textrev: '',
          title: '',
          idVinculado: this.$route.params.id
       }
      }
     },
     mounted(){
        this.quill = new Quill(this.$refs.editor, {
            theme: 'snow', // 'snow' é um tema popular
            modules: {
                toolbar: [
                    [{ header: [1, 2, false] }],
                    ['blockquote'],  
                    ['bold', 'italic', 'underline'],
                    [{ 'color': [] }, { 'background': [] }], 
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    ['link'],
                    [{ 'indent': '-1' }, { 'indent': '+1' }],   
                    ['clean']  
                ],
            },
        });
     }
    }
</script>

<style lang="scss" scoped>

</style>