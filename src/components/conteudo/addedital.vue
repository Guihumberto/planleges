<template>
    <div class="my-10">
       <v-btn prepend-icon="mdi-plus" class="mb-5" variant="outlined" :color="show ? '#01003F' : 'grey'"  :append-icon="show ? 'mdi-chevron-down' : 'mdi-chevron-right'" @click="show = !show">Novo Concurso</v-btn>
       <v-form ref="forms" @submit.prevent="addConcurso" v-if="show">
        <v-text-field
            label="Concurso"
            density="compact"
            variant="outlined"
            placeholder="Digite o nome do concurso"
            v-model="form.concurso"
            clearable
            :rules="[rules.required]"
        ></v-text-field>
        <div class="d-flex justify-space-between my-3">
            <v-select
                label="Banca"
                density="compact"
                :items="metaStore.readBancas"
                item-title="name"
                item-value="id"
                variant="outlined"
                v-model="form.banca"
                :rules="[rules.required]"
                class="mr-2"
                clearable
            ></v-select>
            <v-select
                label="Ano"
                density="compact"
                :items="metaStore.readPeriodos"
                variant="outlined"
                v-model="form.ano"
                :rules="[rules.required]"
                clearable
            ></v-select>
        </div>
        <div class="d-flex justify-space-between">
            <v-radio-group
                v-model="form.tipo"
                inline
                density="compact"
                :rules="[rules.required]"
            >
                <v-radio
                    label="Multipla Escolha"
                    value="1"
                ></v-radio>
                <v-radio
                    label="Certo e Errado"
                    value="2"
                ></v-radio>
            </v-radio-group>
            <v-btn color="success" variant="flat" type="submit">Salvar</v-btn>
        </div>
       </v-form>
    </div>
</template>

<script setup>
import { ref } from 'vue'

import { useMetaStore } from '@/store/useMetaStore'
const metaStore = useMetaStore()

import { useConteudoStore } from '@/store/useConteudoStore'
const conteudoStore = useConteudoStore()

const show = ref(false)
const forms = ref(null)
const form = ref({
        concurso: '',
        banca: '', 
        ano: '',
        tipo: 1 
})

const rules = {
    required: value => !!value || "campo obrigatório", 
    minfield: (v) => (v||'').length >= 3 || "Mínimo 4 caracteres",
}

const addConcurso = async () => {
    const { valid } = await forms.value.validate()
        if(valid){
            conteudoStore.addConcurso(form.value)
        }
}

</script>

<style scoped>

</style>