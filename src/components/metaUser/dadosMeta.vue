<template>
    <div class="mb-5" v-if="!load">
        <h1 class="text-h5"><v-icon class="mr-2" size="1.8rem">mdi-calendar</v-icon>{{ metaStore.meta.meta }}</h1>
        <p>Período: {{ formatDate(metaStore.meta.date_start) }} a {{ formatDate(metaStore.meta.data_end) }}</p>
        <p>Data: {{ metaStore.meta.date_created }}</p>
        <div class="my-2">
            <h3>Texto Inicial</h3>
            <p v-html="metaStore.meta.text_init"></p>
        </div>
        
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router';

const route = useRoute()
const load = ref(true)

import  { useMetaStore  } from '@/store/useMetaStore'
const metaStore = useMetaStore()

onMounted(async ()=>{
    await metaStore.getMeta(route.params.id)
    setTimeout(()=> {
        load.value = false
    }, 2000) 
})

const formatDate =(data) => {
    try {
        const partes = data.split('-'); // Divide a data em partes
    const dia = partes[2]; // Dia
    const mes = partes[1]; // Mês
    const ano = partes[0]; // Ano
    
    return `${dia}/${mes}/${ano}`; // Retorna no formato DD/MM/AAAA
    } catch (erro) {
        return ''
    }
    
}



</script>