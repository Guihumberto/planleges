<template>
    <div class="listConteudo">
        <h2 class="mb-2">Conteúdo</h2>
        <v-form ref="form" @click.prevent="insertTopico">
          <v-text-field
              label="Conteúdo"
              placeholder="Digite o tópico do conteúdo"
              variant="outlined"
              density="compact"
              v-model.trim="topico"
              clearable
              @keyup.enter="insertTopico"
              :rules="[rules.required, rules.minfield]"
          >
            <template v-slot:append>
              <v-btn flat color="primary" type="submit">Inserir</v-btn>
            </template>
          </v-text-field>
        </v-form>
        <v-list lines="two" class="py-0" v-if="!!conteudo.length">
          <v-list-item 
            :value="item.idU" v-for="item, i in conteudo" ::key="i" 
            class="border-b"
            :class="idDelete == item.idU ? 'bg-error' : ''"
          >
            <template v-slot:prepend="{ isActive }">
              <v-icon>mdi-notebook</v-icon>
            </template>
            <div v-if="idDelete == item.idU">
              <v-list-item-title>Deseja apagar este Registro?</v-list-item-title>
              <v-list-item-subtitle>
                {{ item.name }}
              </v-list-item-subtitle>
            </div>
            <div v-else>
              <div v-if="idEdit == item.idU">
                <v-list-item-title>
                  <v-text-field
                    label="Tópico"
                    density="compact"
                    variant="outlined"
                    style="max-width: 500px;"
                    v-model="topicoEditText"
                    class="mt-5"
                    clearable
                  ></v-text-field>
                </v-list-item-title>
              </div>
              <div v-else>
                <v-list-item-title>{{item.name}}</v-list-item-title>
                <v-list-item-subtitle>
                  {{ item.disciplina }}
                </v-list-item-subtitle>
              </div>
            </div>
            <template v-slot:append>
              <div v-if="idDelete == item.idU">
                <v-btn variant="outlined" flat @click.stop="deleteRegistro(item.idU)">Apagar</v-btn>
                <v-btn variant="text" class="ml-1" flat @click.stop="idDelete =null">cancelar</v-btn>
              </div>
              <div v-else>
                <div v-if="idEdit == item.idU">
                  <v-btn variant="outlined" color="success" flat @click.stop="editRegistro(item, topicoEditText)">Editar</v-btn>
                  <v-btn variant="text" class="ml-1" flat @click.stop="idEdit =null, topicoEditText = null">cancelar</v-btn>
                </div>
                <div v-else>
                  <v-btn title="Inserir comentário" icon="mdi-square-edit-outline" variant="tonal" density="comfortable" @click.stop="goTO(item.idU)"></v-btn>
                  <v-menu>
                    <template v-slot:activator="{ props }">
                      <v-btn class="ml-1" flat variant="text" density="comfortable" icon="mdi-dots-vertical" v-bind="props"></v-btn>
                    </template>
  
                    <v-list>
                      <v-list-item
                        v-for="(opt, o) in options"
                        :key="o"
                        @click.stop="actionSelect(opt.id, item)"
                      >
                        <v-list-item-title>{{ opt.title }}</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </div>
              </div>            
            </template>
          </v-list-item>
        </v-list>
        <alerta text="Não há conteúdos cadastrados nesta disciplina." v-else/>
    </div>
</template>

<script>
    import { useDbStore } from '@/store/dbStore'
    const dbStore = useDbStore()
    import alerta from "@/components/planTools/Alert.vue"
    
    export default {
        components:{
          alerta
        },
        data(){
          return{
            topico: '',
            options: [
              {id:1, title: 'Editar' },
              {id:2, title: 'Apagar' },
            ],
            idDelete: null,
            idEdit: null,
            topicoEditText: null,
            rules: {
              required: value => !!value || "campo obrigatório", 
              minfield: (v) => (v||'').length >= 3 || "Mínimo 4 caracteres",
            }
          }
        },
        computed:{
          conteudo(){
            const disciplina = dbStore.readDisciplinaSel
            let listDisciplinas = dbStore.readConteudo 
            listDisciplinas = listDisciplinas.filter(x => x.disciplina == disciplina)

            return listDisciplinas
          }
        },
        methods: {
          async insertTopico(){
            const { valid } = await this.$refs.form.validate()
            if(valid){   
              dbStore.addConteudo(this.topico)
              this.topico = ''
            }
          },
          goTO(id){
            this.$router.push(`/revisao/${id}`)
          },
          actionSelect(opt, idu){
            if(opt == 2){
              this.idDelete = idu.idU
              this.idEdit = null
            } else {
              this.idDelete = null
              this.idEdit = idu.idU
              this.topicoEditText = idu.name
            }
          },
          deleteRegistro(item){
            dbStore.deleteConteudo(item)
            this.idDelete = null;
          },
          editRegistro(item, nameEdit){
            dbStore.editConteudo(item, nameEdit)
            this.idEdit = null
            console.log("editar");
          },
        },
    }
</script>

<style lang="scss" scoped>

</style>