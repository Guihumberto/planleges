<template>
    <div class="mb-5" v-if="!!dadosRev">
        <h2>{{ dadosRev.disciplina }}</h2>
        <p>Assunto: {{ dadosRev.name }}</p>
    </div>
</template>

<script>
    import { useRevStore } from "@/store/revStore";
    const revStore = useRevStore()

    export default {
        data(){
            return{
            }
        },
        computed:{
          dadosRev(){
            const dados =  revStore.readDadosRev
            return dados
          }
        },
    }
</script>

<style lang="scss" scoped>

</style>