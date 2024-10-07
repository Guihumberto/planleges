<template>
    <div class="forms">
        <v-select
            :items="listDisciplinas"
            label="Disciplina"
            item-title="nome"
            item-value="nome"
            variant="outlined"
            density="compact"
            style="max-width: 400px;"
            v-model.trim="disciplina"
            clearable
        >
        </v-select>
    </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';

const disciplina = ref('')

import { useDbStore } from '@/store/dbStore'
const dbStore = useDbStore()

const listDisciplinas = computed(() => {
    return dbStore.disciplinas
})

watch(disciplina, (newSelected) => {
    dbStore.disciplinaSel(newSelected)
})



   
</script>

<style lang="scss" scoped>

</style>