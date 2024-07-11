<template>
    <div class="mt-15 border pa-5" v-if="listTitleTopics.length">
        <div class="d-flex justify-space-between">
            <h1 class="ml-5">Tópicos</h1>
            <v-btn variant="flat" @click="showListTopics = !showListTopics">{{ showListTopics ? 'ocultar' : 'mostrar' }}</v-btn>
        </div>
        <v-list v-if="showListTopics">
            <v-list-item v-for="item, i in listTitleTopics" :key="i" link @click="$emit('findIndice', item.idU)">
                <template v-slot:prepend>
                    <v-avatar>
                        <v-icon>mdi-subdirectory-arrow-right</v-icon>
                    </v-avatar>
                    <v-text-field
                        label="ordem"
                        variant="outlined"
                        density="compact"
                        class="mt-5"
                        v-if="false"
                    ></v-text-field>
                </template>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
                <v-list-item-subtitle v-html="item.textrev">
                </v-list-item-subtitle>    
                <template v-slot:append>
                    <v-icon v-if="item.fav" color="yellow-darken-2">mdi-star</v-icon>
                    <v-icon v-if="item.revMark" color="blue-grey">mdi-read</v-icon>
                </template>  
            </v-list-item>
        </v-list>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                showListTopics: true
            }
        },
        props:{
            topics: Array
        },
        computed:{
            listTitleTopics(){
                return this.topics
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>