<template>
    <div class="mt-5 border pa-5" v-if="!!dadosRev">
        <div>
            <h2>{{ dadosRev.disciplina }}</h2>
            <p>Assunto: {{ dadosRev.name }}</p>
        </div>
    </div>
</template>

<script>
    import { useRevStore } from "@/store/revStore";
    const revStore = useRevStore()

    export default {
        data(){
            return{
                idURev: this.$route.params.id,
            }
        },
        computed:{
          dadosRev(){
            const dados =  revStore.readDadosRev
            return dados
          }
        },
        methods:{
            goPrint(){
                console.log("oi", this.idURev);
                this.$router.push(`/revisao/${this.idURev}`)
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>