<template>
    <div class="content">
        <h5 class="text-h6"><v-icon size="1.5rem">mdi-tag</v-icon> Disciplinas</h5>
        <v-alert v-if="dbStore.load">
            Carregando...
        </v-alert>
        <v-list class="pa-0 ma-0" v-else>
            <v-list-item 
                v-for="item, i in dbStore.readDisciplinas" :key="i" class="bg-grey-lighten-4 mb-1" link>
                <v-list-item-title>{{ item.nome }}</v-list-item-title>
            </v-list-item>
        </v-list>
    </div>
</template>

<script setup>
    import  { useDbStore } from '@/store/dbStore'
    const dbStore = useDbStore()
</script>

<style lang="scss" scoped>
.content{
    min-height: 65vh;
    min-width: 300px;
    padding: 1rem;
    border: 1px solid rgb(220, 219, 219);
    border-radius: 3px;
    display: flex;
    flex-direction: column;
}

</style>