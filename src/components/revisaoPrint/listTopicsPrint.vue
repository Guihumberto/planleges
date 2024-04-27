<template>
    <div class="mt-5 border pa-2">
        <div class="d-flex justify-space-between">
            <h1>Tópicos</h1>
        </div>
        <v-list v-if="showListTopics">
            <v-list-item v-for="item, i in listTitleTopics" :key="i" link>
                <template v-slot:prepend>
                    <v-avatar>
                        <div class="seta"></div>
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
.seta {
  position: absolute;
  padding: 5px; /* Tamanho da seta */
  box-shadow: 2px -2px 0 1px #000 inset;
  border: solid transparent;
  border-width: 0 0 2px 2px;
}
</style>