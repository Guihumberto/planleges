<template>
    <div class="border-t mt-5 pt-2">
        <div>
            <v-form @submit.prevent="saveTag()" class="d-flex">
                <v-text-field 
                    label="Tag"
                    placeholder="Digite o nome da tag"
                    style="max-width: 300px;" variant="outlined" density="compact"
                    v-model.trim="formTag"
                    focused
                    autofocus
                    v-if="showTag"
                >
                </v-text-field>
                <v-btn type="submit" :variant="showTag ? 'outlined': 'flat'" 
                class="ml-2"> <v-icon>mdi-plus</v-icon>Tag</v-btn>
            </v-form>
        </div>
        <div class="mt-5">
            <v-chip-group>
                <v-chip v-for="item, i in listTag" :key="i"> {{ item }}</v-chip>
            </v-chip-group>
        </div>
    </div>
</template>

<script>
  import { useRevStore } from "@/store/revStore";
  const revStore = useRevStore()
    export default {
        data(){
            return{
                showTag: false,
                formTag: ''
            }
        },
        props:{
            revItem: Object
        },
        computed:{
            listTag(){
                return this.revItem.tags
            }
        },
        methods:{
            saveTag(){
                if(!this.formTag){
                    this.showTag = !this.showTag
                } else {
                    let tag = this.formTag
                    if(this.revItem.tags){
                        this.revItem.tags.push(tag)
                    } else {
                        this.revItem.tags = []
                        this.revItem.tags.push(tag)
                    }
                    revStore.editRevTagQuestion(this.revItem)
                    this.formTag = ""
                }     
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>