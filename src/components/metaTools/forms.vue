<template>
    <div>
        <h2>Selecione o Mentorando</h2>
        <v-list>
            <v-list-item 
                v-for="item, i in list_mentorandos" :key="i" 
                class="mb-1" link
                :class="selected == item.id ? 'bg-indigo-lighten-4':'bg-indigo-lighten-5'"
                @click="selected = item.id"
            >
                <template v-slot:prepend>
                    <v-icon>mdi-account</v-icon>
                </template>
                <template v-slot:append>
                   <v-btn variant="text" color="primary" :icon="selected == item.id ? 'mdi-check':''"></v-btn>
                </template>
                {{ item.name }} - {{ item.email }}
            </v-list-item>
        </v-list>
        <v-form @submit.prevent="createMeta()" v-if="selected">
            <div class="text-h6 mb-2">Criar Meta</div>
            <v-text-field
                label="Nome da Meta"
                variant="outlined"
                density="compact"
                placeholder="Exemplo: Semana 01"
                v-model="name_meta"
                clearable
            >
            <template v-slot:append>
                <v-btn type="submit" variant="flat" color="primary">Criar</v-btn>
            </template>
            </v-text-field>
        </v-form>
    </div>
</template>

<script setup>
    import { computed, ref, watch } from 'vue'

    import  { useMetaStore  } from '@/store/useMetaStore'
    const metaStore = useMetaStore()

    metaStore.getMentorandos()

    const name_meta = ref('')
    const selected = ref('')

    const createMeta = () => {
        metaStore.addMeta({user:selected.value, meta: name_meta.value})
        name_meta.value = ''
    }

    const list_mentorandos = computed(()=> {
        return metaStore.mentorandos
    })

    watch(selected, (newSelected) => {
        metaStore.selectedUser(newSelected)
    })

</script>

<style lang="scss" scoped>

</style>