<template>
    <div class="mb-5">
        <v-btn 
            @click="show_orientacao =  !show_orientacao"
            density="compact" class="pa-0" variant="text" 
            :append-icon="show_orientacao ? 'mdi-chevron-down' : 'mdi-chevron-right'">
        Adicionar orientação</v-btn>
        <div v-if="show_orientacao" class="mt-3">
            <v-form @submit.prevent="save()" ref="form">
                <v-text-field
                    label="Título"
                    placeholder="Título da da orientação"
                    variant="outlined"
                    density="compact"
                    v-model="orientacao.title"
                    :rules="[rules.required, rules.minfield]"
                ></v-text-field>
                <v-textarea
                    label="Texto da orientação"
                    placeholder="Digite um texto da orientação"
                    variant="outlined"
                    density="compact"
                    v-model="orientacao.text"
                    :rules="[rules.required, rules.minfield]"
                ></v-textarea>
                <v-checkbox v-model="save_next" @click="save_next = !save_next" label="Salvar texto"></v-checkbox>
                <v-btn variant="text" @click="show_orientacao = false">Cancelar</v-btn>
                <v-btn type="submit" class="ml-2" color="success" variant="flat">Adicionar</v-btn>
            </v-form>
            <div>
                <v-list>
                    <h3 class="mb-5">Lista de orientações</h3>
                    <v-list-item
                        link @click="copyText(item)"
                        class="bg-blue-lighten-5 mb-1"
                        v-for="item, i in list_orientacoes" :key="item"
                    >
                        <h3 class="text-h6">{{ item.title }}</h3>
                        <p v-html="item.text"></p>
                    </v-list-item>
                </v-list>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';

const form = ref(null)

const rules = {
    required: value => !!value || "campo obrigatório", 
    minfield: (v) => (v||'').length >= 3 || "Mínimo 4 caracteres",
}

import  { useMetaStore  } from '@/store/useMetaStore'
const metaStore = useMetaStore()


onMounted(async() => {
    await metaStore.getOrientacoes()
})

const list_orientacoes = computed(()=> {
    return metaStore.orientacoes
})

const show_orientacao = ref(false)

const save_next = ref(true)

const orientacao = ref({
    title: null,
    text: null,
})

const clear = () => {
    orientacao.value = {
        title: null,
        text: null,
    }
}

const copyText = item => {
    orientacao.value = {...item}
    save_next.value = false
}

const emit = defineEmits(['text_orientacao'])

const enviaOrientacao = (objeto) => {
    emit('text_orientacao', objeto)
}

const save = async () => {
    const { valid } = await form.value.validate()
    if(valid){
        enviaOrientacao(orientacao.value)
        if(save_next.value) await saveDB()
        clear()
        show_orientacao.value = false
    }
}

const saveDB = () => {
    metaStore.addOrientacao(orientacao.value)
}
    
</script>

<style lang="scss" scoped>

</style>