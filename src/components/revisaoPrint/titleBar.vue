<template>
    <div class="mb-5 d-flex justify-space-between ocultar-impressao" v-if="!!dadosRev">
        <div>
            <h2>{{ dadosRev.disciplina }}</h2>
            <p>Assunto: {{ dadosRev.name }}</p>
        </div>
        <v-btn @click="goPrint()" color="grey" variant="outlined"><v-icon class="mr-2">mdi-arrow-left</v-icon>Voltar</v-btn>
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