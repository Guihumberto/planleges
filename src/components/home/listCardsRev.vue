<template>
    <div v-if="list_revs.length">
        <h5 class="text-h6 mb-2"><v-icon size="1.5rem">mdi-cards</v-icon> Últimos cards adicionados</h5>
        <div>
            <div v-for="item, i in list_revs" :key="i" class="quill-content">
                <div class="card-title">
                    <h2>{{ conteudo(item.idVinculado).name }}</h2>
                    <h2>{{ conteudo(item.idVinculado).disciplina }}</h2>
                </div>
                <div>{{ item.title }}</div>
                <div v-html="item.textrev" class="card-text"></div>
                <div><v-chip v-for="tag, t in item.tags">{{tag}}</v-chip></div>
                <div class="text-right mt-5">
                    <p class="text-overline">{{ useDateNow(item.dateCreated) }}</p>
                </div>
            </div>
            <div class="text-center mt-5">
                <v-btn 
                    v-if="limit <= revStore.readAllListRevs.length" 
                    @click="addLimite()" class="text-white" variant="flat" color="var(--second-color)">Carregar Mais</v-btn>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { useRevStore } from '@/store/revStore';
    const revStore = useRevStore()
    import { useOrderDateCreated } from '@/composables/useOrderDateCreated';
    import { useDateNow } from '@/composables/useDateNow'; 
    
    import { computed, ref } from 'vue';

    const limit = ref(5)

    const addLimite = () => {
        limit.value += 5
    }

    const list_revs = computed(() => {
        // console.log(revStore.readAllListRevs);
        return revStore.readAllListRevs
            .sort(useOrderDateCreated)
            .slice(0, limit.value)
            
    })

    const list_conteudos = computed(() => {
        return revStore.readConteudos
    })

    const conteudo = (id) => {
        return list_conteudos.value.find(c => c.id_conteudo == id)
    }


</script>

<style lang="scss" scoped>
.quill-content{
    background: rgb(247, 246, 246);
    padding: 0 1rem;
    margin-bottom: .5rem;
    border-top: .2rem solid #23424a;
}
.card-title {
    display: flex;
    justify-content: space-between;
    font-size: .8rem;
    color: #23424a;
    margin-bottom: .5rem;
}
.card-text{
    overflow-x: auto;
}
@media (max-width:500px) {
    .card-title{
        flex-direction: column-reverse;
    }
}
</style>