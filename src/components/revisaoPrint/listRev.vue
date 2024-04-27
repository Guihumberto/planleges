<template>
    <div class="conteudo">
        <div v-if="loadCrud && !idDelete" class="text-center">
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
        </div>
        <div class="ocultar-impressao">
          <v-text-field density="compact" v-model="namePDF" style="max-width: 500px;">
            <template v-slot:append>
              <v-btn color="red" variant="outlined" @click.prevent="generatePDF">
                <v-icon color="red">mdi-file-pdf-box</v-icon>
                PDF
              </v-btn>
            </template>
          </v-text-field>
        </div>
        <div v-if="listRev.length" ref="pdfContent" id="pdf-content">
          <titlePrint />
          <listTopicsPrint :topics="listRev" />
          <div v-for="item, i in listRev" :key="i" class="w-100 border pa-2 my-5 postRev" >
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
          </div>
          <div class="mt-15">
            João Humberto - Revisão
          </div>
        </div>
        <alerta text="Não há comentários da revisão cadastrados." variant="outlined" v-else />
    </div>
</template>

<script>
  import { useRevStore } from "@/store/revStore";
  const revStore = useRevStore()

  import alerta from "@/components/planTools/Alert.vue"
  import titlePrint from "@/components/revisaoPrint/titleBarPrint.vue"
  import listTopicsPrint from "@/components/revisaoPrint/listTopicsPrint.vue"

  import jsPDF from 'jspdf';
  import html2canvas from 'html2canvas';

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
            reverse: true,
            quill: null,
            editor:'',
            namePDF: 'revisao'
          }
        },
        components:{
          alerta, listTopicsPrint, titlePrint
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
          },
          async generatePDF() {
              const doc = new jsPDF({ unit: 'pt'});
        
              const content = document.getElementById('pdf-content').innerHTML;
              
              doc.html(content, {
                callback: function (doc) {
                  doc.save('revisao.pdf');
                },
                x: 10,
                y: 10,
                width: 580,
                windowWidth: 800,
                autoPaging: true
              });
          }
        },
    }
</script>

<style lang="scss" scoped>
#pdf-content{
  font-family: Arial, sans-serif;
        max-width: 21cm; /* Largura A4 */
        height: 29.7cm;
        margin: 0 auto;
        margin-bottom: 2.5rem;
        // border: 1px black solid;
        padding: 40px 30px;
        background: #fff;
        page-break-after: always; /* Cria uma nova página após o conteúdo */
}
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