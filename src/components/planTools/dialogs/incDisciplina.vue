<template>
  <div class="text-center">
    <v-btn
      variant="text"
      flat
    >
        <v-icon size="1.5rem">mdi-plus</v-icon>
      <v-dialog
        v-model="dialog"
        activator="parent"
        width="auto"
      >
      <v-card width="500" title="Adicionar">

        <v-card-text class="pa-5">
          <v-form @submit.prevent="emitEvent">
            <v-text-field
                :label="tipoName.name"
                :placeholder="tipoName.placeholder"
                density="compact"
                v-model.trim="name"
            ></v-text-field>
            <v-btn type="submit" color="primary">Adicionar</v-btn>
          </v-form>
        </v-card-text>
        <v-card-actions>
            <v-btn color="primary" block @click="dialog = false">Fechar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-btn>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        dialog: false,
        name: ""
      }
    },
    props:{
      tipo: String
    },
    computed:{
      tipoName(){
        return this.tipo == 1
        ? {name: "Disciplina", placeholder: "Digite o nome da disciplina"}
        : {name: "Concurso", placeholder: "Digite o nome do concurso"}
      }
    },
    methods:{
      emitEvent() {
        const temp = this.name
        this.$emit('insert', temp);
        this.dialog = false
        this.name = ""
      }
    }
  }
</script>
<style lang="scss" scoped>

</style>