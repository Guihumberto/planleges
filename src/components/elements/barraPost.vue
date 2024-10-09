<template>
    <div class="barra">
        <v-btn 
            @click="markRev(revItem)" :variant="revItem.revMark ? 'outlined':'tonal'" title="revisão" 
            :color="revItem.revMark ? 'grey':'black'" :append-icon="revItem.revMark ? 'mdi-check':'mdi-square-rounded-outline'" >MARCAR PARA REVISÃO</v-btn>
        <v-btn 
            @click="markFav(revItem)" variant="text" title="favoritos" class="ml-2" flat 
            :color="revItem.fav? 'yellow':'grey'" :icon="revItem.fav ? 'mdi-star' : 'mdi-star-outline'"></v-btn>
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
        computed:{
            listFav(){
                return revStore.readFavList
            },
            listRevMark(){
                return revStore.readRevMarkList
            }
        },
        methods:{
            markRev(item){
                if(item.revMark){
                    item.revMark = false
                } else {
                    item.revMark = true
                }
                revStore.addMarkRevUser(item)
            },
            markFav(item){
                if(item.fav){
                    item.fav = false
                } else {
                    item.fav = true
                }
                revStore.addFavUser(item)
            }
        }
    }
</script>

<style lang="scss" scoped>
.barra{
    text-align: right;
    transition: 1s ease;
}
</style>
