<template>
    <div>
        <v-btn @click="markRev()" :variant="rev ? 'outlined':'tonal'" title="revisão" :color="rev ? 'grey':'black'" :append-icon="rev ? 'mdi-check':'mdi-square-rounded-outline'" >MARCAR PARA REVISÃO</v-btn>
        <v-btn @click="markFav()" variant="topicoEditText" title="favoritos" class="ml-2" flat :color="fav? 'yellow':'grey'" :icon="fav ? 'mdi-star' : 'mdi-star-outline'"></v-btn>
    </div>
</template>

<script>
    import { useRevStore } from "@/store/revStore";
    const revStore = useRevStore()
    
    export default {
        data(){
            return{
                fav: false,
                rev: false
            }
        },
        props:{
            revItem: Object
        },
        methods:{
            markRev(){
                this.rev = !this.rev
            },
            markFav(){
                this.fav = !this.fav
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>