<template>
    <div>
        <v-btn @click="markRev(revItem.idU)" :variant="rev ? 'outlined':'tonal'" title="revisão" :color="rev ? 'grey':'black'" :append-icon="rev ? 'mdi-check':'mdi-square-rounded-outline'" >MARCAR PARA REVISÃO</v-btn>
        <v-btn @click="markFav(revItem.idU)" variant="text" title="favoritos" class="ml-2" flat :color="fav? 'yellow':'grey'" :icon="fav ? 'mdi-star' : 'mdi-star-outline'"></v-btn>
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
            markRev(item){
                this.rev = !this.rev
                revStore.addMarkRevUser(item)
            },
            markFav(item){
                this.fav = !this.fav
                revStore.addFavUser(item)
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
