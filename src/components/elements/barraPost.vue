<template>
    <div class="barra">
        <v-btn 
            @click="markRev(revItem)" :variant="revItem.revMark ? 'outlined':'tonal'" title="adiciona o card na revisão" 
            :color="revItem.revMark ? 'grey':'black'" :append-icon="revItem.revMark ? 'mdi-check':'mdi-square-rounded-outline'" >REVISÃO</v-btn>
        <v-btn 
            @click="markFav(revItem)" variant="text" title="favoritos" class="ml-2" flat 
            :color="revItem.fav? 'yellow':'grey'" :icon="revItem.fav ? 'mdi-star' : 'mdi-star-outline'"></v-btn>
        <v-btn variant="text" color="primary" :loading="load"></v-btn>
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
            },
            load(){
                return revStore.readLoadFav
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
    transition: 1s ease;
}
</style>
