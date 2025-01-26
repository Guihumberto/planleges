<template>
    <div v-if="revStore.readAllListRevs.length">
        <div class="title-last-cards">
            <h5 class="text-h5"><v-icon size="1.5rem">mdi-cards</v-icon> Últimos  adicionados</h5>
            <v-btn 
                class="btn-show"
                color="primary"
                variant="text"
                :append-icon="show_revisados ? 'mdi-eye' : 'mdi-eye-off'" @click="show_revisados = !show_revisados">
                {{ show_revisados ? 'Mostrar revisados' : 'Ocultar Revisados' }}</v-btn>
        </div>
        <div class="mt-10">
            <div v-for="item, i in list_revs" :key="i" class="quill-content">
                <div class="card-title">
                    <h3>{{ conteudo(item.idVinculado).name }}</h3>
                    <h3>{{ conteudo(item.idVinculado).disciplina }}</h3>
                </div>
                <h2 class="text-h5 mb-3">{{ item.title }}</h2>
                <div v-html="item.textrev" class="card-text"></div>
                <div><v-chip class="mr-1"v-for="tag, t in item.tags">{{tag}}</v-chip></div>
                <div class="text-center my-3">
                    <v-btn 
                        @click="markRevisado(item)"
                        variant="text" append-icon="mdi-check" color="primary">
                        Marcar como revisado <span v-if="item?.revisado">({{ item.revisado }})</span> <span v-else>(0)</span></v-btn>
                </div>
                <div class="d-flex justify-space-between align-center">
                    <p class="text-overline">{{ useDateNow(item.dateCreated) }}</p>
                    <BarraPost :revItem="item" />
                </div>
                
            </div>
            <div class="text-center mt-5">
                <v-btn 
                    v-if="limit <= revStore.readAllListRevs.length" 
                    @click="addLimite()" class="text-white" variant="flat" color="var(--second-color)">Carregar Mais</v-btn>
            </div>
        </div>
    </div>
    <v-alert v-else>
        <div class="d-flex justify-space-between">     
            <p>Você ainda não criou  de revisão.</p>
            <router-link to="/config">Criar  de Revisão</router-link>
        </div>
    </v-alert>
</template>

<script setup>
    import { useRevStore } from '@/store/revStore';
    const revStore = useRevStore()
    import { useOrderDateCreated } from '@/composables/useOrderDateCreated';
    import { useDateNow } from '@/composables/useDateNow'; 
    
    import { computed, ref } from 'vue';

    const limit = ref(5)
    const show_revisados = ref(false)

    const addLimite = () => {
        limit.value += 5
    }

    const list_revs = computed(() => {
        // console.log(revStore.readAllListRevs);
        let list = revStore.readAllListRevs
        if(!show_revisados.value){
            list = list.filter(x => !x.revisado)
        }
        return list
            .sort(useOrderDateCreated)
            .slice(0, limit.value)
            
    })

    const list_conteudos = computed(() => {
        return revStore.readConteudos
    })

    const conteudo = (id) => {
        return list_conteudos.value.find(c => c.id_conteudo == id)
    }
    const markRevisado = async (item) => {
        if(!item.revisado){
            item.revisado = 1
            item.dateRevisado = Date.now()
            await revStore.editNewRev(item)
        } else {
            item.revisado++
            item.dateRevisado = Date.now()
            await revStore.editNewRev(item)
        }
    }


</script>

<style lang="scss" scoped>
.quill-content{
    background: rgb(247, 246, 246);
    padding: 0 1rem;
    margin-bottom: .5rem;
    border-top: .1rem solid #23424a;
}
.title-last-cards{
    display: flex;
    justify-content: space-between;
}
.title-last-cards h5 {
    color: var(--main-color);
}
.card-title {
    display: flex;
    justify-content: space-between;
    font-size: 1rem;
    color: #333434;
    margin-bottom: .5rem;
}
.card-text{
    overflow-x: auto;
}
@media (max-width: 500px) {
    .title-last-cards{
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
    }
    .btn-show{
        margin-left: .6rem;
    }
}
</style>