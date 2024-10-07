<template>
    <div class="content">
        <h5>Meus Cadernos</h5>
        <v-list class="pa-0 ma-0">
            <v-list-item v-for="item, i in dbStore.readConteudo.slice(0, 15)" :key="i" class="bg-grey-lighten-4 mb-1" link>
                <v-list-item-title>{{ item.name }}</v-list-item-title>
                <v-list-item-subtitle>{{ item.disciplina }}</v-list-item-subtitle>
            </v-list-item>
            <v-btn block @click="$router.push('/config')">VEr todos</v-btn>
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
    max-width: 300px;
    padding: 1rem;
    border: 1px solid rgb(220, 219, 219);
    border-radius: 3px;
    display: flex;
    flex-direction: column;
}

</style>