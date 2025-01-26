<template>
    <div>
        <v-form @submit.prevent="saveCargo()" ref="form">
            <v-text-field
                label="Cargo"
                variant="outlined"
                density="compact"
                v-model="cargo.name"
                :rules="[rules.required, rules.minfield]"
                clearable
            ></v-text-field>
            <v-select
                label="Nível"
                variant="outlined"
                :items="nivel"
                item-value="id"
                item-title="name"
                density="compact"
                v-model="cargo.nivel"
                :rules="[rules.required]"
                class="my-3"
                clearable
            ></v-select>

            <v-text-field
                label="Formação"
                variant="outlined"
                density="compact"
                v-model="cargo.formacao"
                :rules="[rules.required, rules.minfield]"
                clearable
            ></v-text-field>

            <div class="text-right">
                <v-btn color="success" type="submit">Salvar</v-btn>
            </div>
        </v-form>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import { useConteudoStore } from '@/store/useConteudoStore';
    const conteudoStore = useConteudoStore()

    import { useRoute } from 'vue-router';
    const route = useRoute()

    const form = ref(null)

    const rules = {
        required: value => !!value || "campo obrigatório", 
        minfield: (v) => (v||'').length >= 3 || "Mínimo 4 caracteres",
    }

    const cargo = ref({
        name: '', 
        nivel: null,
        formacao: '',
        gerais: [],
        especificas: []
    })

    const textoEmenta = ref(null)

    const nivel = [
        {id:1, name: 'Ensino Fundamental'},
        {id:2, name: 'Ensino Médio'},
        {id:3, name: 'Ensino Superior'},
    ]

    const saveCargo = async () => {
        const { valid } = await form.value.validate()
        if(valid){
            cargo.value.id_concurso = route.params.id
            conteudoStore.addCargo(cargo.value)
        }
    }

</script>

<style scoped>

</style>