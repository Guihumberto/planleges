<template>
    <div>
        <div v-for="item, i in listRev" :key="i" class="w-100 border pa-2 my-5 ">
          <div v-if="idEdit == item.idU">
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
              <v-textarea
                label="Texto"
                density="compact"
                variant="outlined"
                style="max-width: 500px;"
                v-model.trim="topicoEditText.textrev"
                class="mt-5"
                clearable
              ></v-textarea>
              <v-btn variant="outlined" color="success" flat @click.stop="editRegistro(item, topicoEditText)">Editar</v-btn>
              <v-btn variant="text" class="ml-1" flat @click.stop="idEdit =null, topicoEditText.title = null">cancelar</v-btn>
          </div>
          <div v-else>
            <h2>{{ item.title }}</h2>
            <p>
              {{ item.textrev }}
            </p>
          </div>
          <div v-if="idDelete == item.idU" class="d-flex justify-center align-center border-t mt-5 pt-2">
            Apagar registro? 
            <v-btn class="ml-2" variant="text" color="red" flat @click.stop="deleteRegistro(item.idU)">Apagar</v-btn>
            <v-btn variant="text" class="ml-1" flat @click.stop="idDelete =null">cancelar</v-btn>
          </div>
          <div v-else class="d-flex justify-space-between align-center border-t mt-5 pt-2">
            <div>
              {{ item.type }} | {{item.dateCreated}}
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
    </div>
</template>

<script>
  import { useRevStore } from "@/store/revStore";
  const revStore = useRevStore()

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
            topicoEditText:{title: null, textrev: null}
          }
        },
        computed:{
          listRev(){
            return revStore.readListRevs
          },
          dadosRev(){
            return revStore.readDadosRev
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
            this.idDelete = null;
          },
          editRegistro(item, nameEdit){
            revStore.editRev(item, nameEdit)
            this.idEdit = null
          },
        },
    }
</script>

<style lang="scss" scoped>

</style>