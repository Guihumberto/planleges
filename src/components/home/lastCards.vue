<template>
    <h1 class="ml-1 mb-2 text-h5"><v-icon size="1.5rem">mdi-card-bulleted</v-icon> Últimos Cartões</h1>
    <div class="wrapper">
        <v-alert v-if="dbStore.load">
            Carregando...
        </v-alert>
        <v-list class="pa-0 ma-0" v-else>
            <v-list-item 
                v-if="dbStore.readConteudo.length"
                :to="`/revisao/${item.idU}`"
                v-for="item, i in dbStore.readConteudo.slice(0, 15)" :key="i" class="bg-grey-lighten-4 mb-1" link>
                <template v-slot:prepend>
                    <v-icon>
                        mdi-content-paste
                    </v-icon>
                </template>
                <v-list-item-title>{{ item.name }}</v-list-item-title>
                <v-list-item-subtitle>{{ item.disciplina }}</v-list-item-subtitle>
            </v-list-item>
            <v-alert v-else>Você ainda não criou nenhum caderno de revisão.</v-alert>
            <v-btn block @click="$router.push('/config')">IR PARA REVISÃO</v-btn>
        </v-list>
    </div>
</template>

<script setup>
    import { useDbStore } from '@/store/dbStore';
    const dbStore = useDbStore()
</script>

<style lang="scss" scoped>
.wrapper{
    min-width: 100%;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    gap: .5rem;
    min-height: 200px;
    border: 1px solid rgb(210, 202, 202);
    border-radius: 8px;
    padding: 1rem;
}

</style>