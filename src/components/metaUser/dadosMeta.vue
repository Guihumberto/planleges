<template>
    <div class="mb-5" v-if="metaStore.meta?.meta">
        <h1 class="text-h5"><v-icon class="mr-2" size="1.8rem">mdi-calendar</v-icon>{{ metaStore.meta.meta }}</h1>
        <p>Período: {{ formatDate(metaStore.meta.date_start) }} a {{ formatDate(metaStore.meta.data_end) }}</p>
        <p>Data da elaboração: {{ formatarDataTimestamp(metaStore.meta.date_created) }}</p>
        <div class="my-2">
            <h3>Texto Inicial</h3>
            <p v-html="metaStore.meta.text_init"></p>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router';
import { useDateFormat } from '@/composables/useDateFormat'
import { useDateNow } from '@/composables/useDateNow'

const route = useRoute()
const load = ref(true)

import  { useMetaStore  } from '@/store/useMetaStore'
const metaStore = useMetaStore()

onMounted(async ()=>{
    await metaStore.getMeta(route.params.id)
    setTimeout(()=> {
        load.value = false
    }, 1000) 
})

const formatDate = (item) => useDateFormat(item)
const formatarDataTimestamp = (timestamp) => useDateNow(timestamp)



</script>