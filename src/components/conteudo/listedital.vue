<template>
    <div>
        <v-list class="pa-0 bg-transparent">
            <v-list-item link v-for="item, i in conteudoStore.readListEdital" :key="i" >
                <template v-slot:prepend>
                    <v-icon>mdi-book-open-outline</v-icon>
                </template>
                <template v-slot:append>
                    <div v-if="idDelete == item.idU">
                        <v-btn
                            variant="flat"
                            color="error"
                            @click.stop="deleteItem(item.idU)"
                        >Apagar</v-btn>
                        <v-btn variant="text" @click.stop="idDelete = null">cancelar</v-btn>
                    </div>
                    <div v-else>
                        <router-link :to="`conteudo/${item.idU}`">Ver</router-link>      
                        <v-btn
                            color="primary"
                            variant="text"
                            icon
                            
                        >
                            <v-icon>mdi-dots-vertical</v-icon>
    
                            <v-menu activator="parent">
                                <v-list class="pa-0">
                                    <v-list-item
                                        v-for="(action, index) in items"
                                        :key="index"
                                        :value="index"
                                        @click="selectAction(action.id, item.idU)"
                                    >
                                        <template v-slot:prepend>
                                            <v-icon>
                                                {{action.icon}}
                                            </v-icon>
                                        </template>
                                        <v-list-item-title>{{ action.title }}</v-list-item-title>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </v-btn>
                    </div>
                </template>
                <div>
                    {{ item.concurso }}
                </div>
            </v-list-item>
        </v-list>
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import { useConteudoStore } from '@/store/useConteudoStore'
    const conteudoStore = useConteudoStore()

    conteudoStore.getConcursos()

    const  items = [
        {id:1, title: 'Editar', icon:'mdi-pencil' },
        {id:2, title: 'Apagar', icon: 'mdi-delete' }
      ]

      const idEdit = ref(null)
      const idDelete = ref(null)

      const selectAction = (item, id) => {
        if(item == 1) idEdit.value = id
        if(item == 2) idDelete.value = id
      }

      const deleteItem = (item) => {
        conteudoStore.deleteConcurso(item)
      }

</script>

<style scoped>

</style>