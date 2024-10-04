<template>
    <div>
        <h3>{{ get_meta.meta }}</h3>

        <div v-if="get_meta?.date_created && !edit">
            <h3>Período: {{ get_meta.date_start }} a {{ get_meta.data_end }} 
                <v-btn @click="editMetas()" color="primary" variant="text" density="compact" icon="mdi-pencil"></v-btn>
            </h3>
            <p>Criado dia: {{ formatarDataTimestamp(get_meta.date_created) }}</p>
            <div class="bg-grey pa-2 my-2">
                <p>{{ get_meta.text_init }}</p>
            </div>
        </div>
        <v-form @submit.prevent="save()" class="my-5 border pa-5" v-else>
            <v-row>
                <v-col cols="6" sm="3">
                    <v-text-field
                        label="Início"
                        placeholder="Data de Início"
                        type="date"
                        variant="outlined"
                        density="compact"
                        v-model="init_meta.date_start"
                    ></v-text-field>
                </v-col>
                <v-col cols="6" sm="3">
                    <v-text-field
                        label="Final"
                        placeholder="Data de Final"
                        type="date"
                        variant="outlined"
                        density="compact"
                        v-model="init_meta.data_end"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-textarea
                label="Texto inicial"
                placeholder="Digite um texto inicial"
                variant="outlined"
                density="compact"
                 v-model="init_meta.text_init"
            ></v-textarea>
            <v-btn variant="text" @click="edit = false" v-if="get_meta?.date_created">Cancelar</v-btn>
            <v-btn variant="flat" type="submit" color="yellow" v-if="get_meta?.date_created">Editar</v-btn>
            <v-btn variant="flat" type="submit" color="primary" v-else>Salvar</v-btn>
        </v-form>
        
        <AddTarefa />
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router';

const route = useRoute()

import  { useMetaStore  } from '@/store/useMetaStore'
const metaStore = useMetaStore()

const get_meta = computed(()=>{
    return metaStore.meta || ''
})

const edit = ref(false)
const init_meta = ref({
    date_start: '', 
    data_end: '',
    text_init: null,
    name_meta: '',
    show: false,
    tasks: []
})

onMounted(async ()=>{
    await metaStore.getMeta(route.params.id)
})

const save = () => {
    metaStore.editMeta(init_meta.value);
    clear()
}

const editMetas = () => {
    edit.value = true
    init_meta.value = {...get_meta.value}
}

const clear = () => {
    init_meta.value = {
        date_start: '', 
        data_end: '',
        text_init: null,
        name_meta: '',
        show: false,
        tasks: []
    }
}

const formatarDataTimestamp = (timestamp) => {
    const data = new Date(timestamp); // Cria um objeto Date com o timestamp

    const dia = String(data.getDate()).padStart(2, '0'); // Obtém o dia e garante que tenha 2 dígitos
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // Obtém o mês (0-11) e adiciona 1
    const ano = data.getFullYear(); // Obtém o ano
    const horas = String(data.getHours()).padStart(2, '0'); // Obtém as horas
    const minutos = String(data.getMinutes()).padStart(2, '0'); // Obtém os minutos

    return `${dia}/${mes}/${ano} ${horas}:${minutos}`; // Retorna a data formatada
}


</script>

<style lang="scss" scoped>

</style>