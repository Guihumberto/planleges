<template>
    <div class="conteudo">
        <div v-if="loadCrud && !idDelete" class="text-center">
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
        </div>
        <div v-for="item, i in listRev" :key="i" class="w-100 border pa-2 my-5 postRev" v-if="listRev.length">
          <div v-show="idEdit == item.idU">
            <h2>{{ item.title }}</h2>
              <v-text-field
                label="Título"
                density="compact"
                variant="outlined"
                style="max-width: 500px;"
                v-model.trim="topicoEditText.title"
                class="mt-5"
                clearable
              ></v-text-field>
              <textEdit 
              :texto="topicoEditText.textrev" 
              @insertNew="topicoEditText.textrev = $event, editRegistro(item, topicoEditText)" 
              @cancel="idEdit =null, topicoEditText.title = null" 
              />
          </div>
          <div v-if="idEdit != item.idU">
            <h2>{{ item.title }}</h2>
            <p v-html="item.textrev"></p>
          </div>
          <div v-if="idDelete == item.idU" class="d-flex justify-center align-center border-t mt-5 pt-2" :class=" idDelete ? 'bg-red' : 'bg-grey'">
            <div v-if="loadCrud" class="text-center mb-2">
              <v-progress-circular
                indeterminate
                color="primary"
              ></v-progress-circular>
            </div>
            <div v-else class="mb-2">
              Apagar registro? 
              <v-btn class="ml-2" variant="outlined"  flat @click.stop="deleteRegistro(item.idU)">Apagar</v-btn>
              <v-btn variant="text" class="ml-1" flat @click.stop="idDelete =null">cancelar</v-btn>
            </div>
          </div>
          <div v-else class="d-flex justify-space-between align-center border-t mt-5 pt-2">
            <div>
              {{ item.type }} | {{ formatteDate(item.dateCreated) }}
            </div>
            <div>
              <v-btn flat>Incluir no caderno</v-btn>
              <v-btn variant="text" flat><v-icon>mdi-star</v-icon></v-btn>
              <v-menu>
                <template v-slot:activator="{ props }">
                  <v-btn class="ml-1" flat variant="text" icon="mdi-dots-vertical" v-bind="props"></v-btn>
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
        </div>
        <alerta text="Não há comentários da revisão cadastrados." variant="outlined" v-else />
    </div>
</template>

<script>
  import { useRevStore } from "@/store/revStore";
  const revStore = useRevStore()

  import alerta from "@/components/planTools/Alert.vue"

  import moment from 'moment'
  import 'moment/locale/pt-br'

  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import Quill from 'quill'

    export default {
        data(){
          return{
            idURev: this.$route.params.id,
            options: [
              {id:1, title: 'Editar' },
              {id:2, title: 'Apagar' },
            ],
            idDelete: null,
            idEdit: null,
            topicoEditText:{title: null, textrev: null},
            reverse: false,
            quill: null,
            editor:'',
          }
        },
        components:{
          alerta
        },
        computed:{
          listRev(){
            return revStore.readListRevs.sort(this.orderDateCreate)
          },
          dadosRev(){
            return revStore.readDadosRev
          },
          loadCrud(){
            return revStore.readLoadCrud
          }
        },
        methods:{
          actionSelect(opt, idu){
            if(opt == 2){
              this.idDelete = idu.idU
              this.idEdit = null
            } else {
              this.idDelete = null
              this.idEdit = idu.idU
              this.topicoEditText.title = idu.title
              this.topicoEditText.textrev = idu.textrev
            }
          },
          deleteRegistro(item){
            revStore.deleteRev(item)
            if(!this.loadCrud){
              this.idDelete = null;
            }
          },
          editRegistro(item, nameEdit){
            revStore.editRev(item, nameEdit)
            this.idEdit = null
          },
          orderDateCreate(a, b){
              return this.reverse
                  ? a.dateCreated -  b.dateCreated
                  : b.dateCreated -  a.dateCreated
          },
          formatteDate(item){
            return moment(item).locale('pt-br').format('DD/MM/YYYY')
          }
        },
        mounted(){
          this.quill = new Quill(this.$refs.editor, {
              theme: 'snow', // 'snow' é um tema popular
              modules: {
                  toolbar: [
                      [{ header: [1, 2, false] }],
                      ['bold', 'italic', 'underline'],
                      ['image', 'code-block'],
                      [{ list: 'ordered' }, { list: 'bullet' }],
                      ['link'],
                  ],
              },
          });
      }
    }
</script>

<style lang="scss" scoped>
p{
  margin-left: 1rem;
  margin-top: .5rem;
}
.postRev, .conteudo{
  animation: appear 1s ease;
  transition: all 1s ease;
}
@keyframes appear {
  0%{
    opacity: 0;
    background: rgb(185, 185, 234);
  }
  100%{
    opacity: 100%;
    background: #fff;
  }
} 
</style>