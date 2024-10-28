<template>
    <div class="conteudo" id="top">
        <div v-if="loadCrud && !idDelete" class="text-center">
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
        </div>
        <div class="border pa-3 mt-5 bg-blue-lighten-5">
            <h5 class="ml-2 text-h6">Filtrar</h5>
            <div class="d-flex">
              <v-checkbox
                v-for="item, i in filtros" :key="i"
                v-model="item.select"
                color="red"
                :label="item.name"
                value="red"
                hide-details
              ></v-checkbox>
            </div>
        </div>
        <div v-if="!readLoad">
          <listTopics :topics="listRev" @findIndice="findPage($event)" />
          <div v-if="listRev.length" v-for="item, i in listRev" :key="i" class="w-100 border pa-2 my-5 postRev" 
             :id="item.idU">
            <div v-show="idEdit == item.idU" spellcheck="true" lang="pt-BR" class="px-3"> 
              <h2>{{ item.title }}</h2>
                <v-text-field
                  label="Título"
                  density="compact"
                  variant="outlined"
                  style="max-width: 500px;"
                  v-model.trim="topicoEditText.title"
                  class="mt-5"
                  clearable
                  spellcheck="true" lang="pt-BR"
                ></v-text-field>
                <textEdit 
                  :texto="topicoEditText.textrev" 
                  @insertNew="topicoEditText.textrev = $event, editRegistro(item, topicoEditText)" 
                  @cancel="idEdit =null, topicoEditText.title = null" 
                />
            </div>
            <div v-if="idEdit != item.idU" class="boxTextoRevisao">
              <h2>{{ item.title }}</h2>
              <div v-html="item.textrev" class="quill-content"></div>
              <div class="mt-5">
                <small>Data da criação: {{ formatteDate(item.dateCreated) }}</small>
              </div>
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
            <div v-if="idEdit != item.idU && idDelete != item.idU" class="barraAcoes">
              <div>
                 <barraPost :revItem="item" />
              </div>
              <div class="questoes">
                <addQuestion :revItem="item" />
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
            <addTag :revItem="item" />
            <v-btn v-if="tela" class="upBtn" color="success" variant="elevated" icon="mdi-arrow-up"  @click="findPage('top')"></v-btn>
          </div>
          <alerta text="Não há comentários da revisão cadastrados." variant="outlined" v-if="!listRev.length" />
        </div>
        <v-alert v-else>Carregando...</v-alert>
    </div>
</template>

<script>
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import { useRevStore } from "@/store/revStore";
  const revStore = useRevStore()

  import alerta from "@/components/planTools/Alert.vue"
  import addQuestion from "@/components/revisaoEdit/addQuestion.vue"
  import addTag from "@/components/revisaoEdit/addTag.vue"
  import listTopics from "@/components/revisaoEdit/listTopics.vue"

  import moment from 'moment'
  import 'moment/locale/pt-br'

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
            tela: false,
            filtros:[
              {name:'Marcados para Revisão', select: false},
              {name:'Favoritos', select: false}
            ]
          }
        },
        components:{
          alerta, addQuestion, addTag, listTopics
        },
        computed:{
          listFav(){
                const list = revStore.readFavList
                return list
          },
          listRevMark(){
              return revStore.readRevMarkList
          },
          listRev(){
            const list = revStore.readListRevs.sort(this.orderDateCreate)
            let newList = []

            list.forEach(x => {
              this.listFav.forEach(f => {
                if(x.idU == f.id){
                  x.fav = f.active
                }
              })
              this.listRevMark.forEach(r => {
                if(x.idU == r.id){
                  x.revMark = r.active
                }
              })
              newList.push(x)
            })

            if(this.filtros[0].select){
              newList = newList.filter(x => x.revMark)
            }

            if(this.filtros[1].select){
              newList = newList.filter(x => x.fav)
            }

            return newList
          },
          dadosRev(){
            return revStore.readDadosRev
          },
          loadCrud(){
            return revStore.readLoadCrud
          },
          readLoad(){
            return revStore.readLoad
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
          },
          findPage(item){
              const element = document.getElementById(item)
              element.scrollIntoView({behavior: "smooth"})
          },
          handleScroll() {
            this.tela = window.scrollY > 0;
          }
        },
        mounted(){
          window.addEventListener('scroll', this.handleScroll);
        },
        beforeDestroy() {
          window.removeEventListener('scroll', this.handleScroll);
        }
    }
</script>

<style>

.quill-content blockquote{
  color: grey;
  border-left: 5px solid rgb(135, 130, 130);
  padding-left: .8rem
}

.quill-content ol, ul {
  margin-left: 2rem;
}

.boxTextoRevisao{
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

.postRev{
  position: relative;
}
.upBtn{
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
}
.barraAcoes{
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px rgb(219, 209, 209) solid;
  margin: 0 .8rem;
  margin-top: 1em;
  padding: .2em;
  transition: 1s ease;
}
.questoes{
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 1s ease;
}

@media (max-width: 600px) {
  .barraAcoes{
    flex-direction: column-reverse;
    align-items: flex-start;
  }
  .questoes{
    justify-content: space-between;
    width: 100%;
  }
}
</style>