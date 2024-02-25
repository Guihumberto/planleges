<template>
    <v-btn 
      class="pa-0" variant="text"
      @click="voltar"
    >
      <v-icon class="mr-1">mdi-arrow-left</v-icon> Voltar
    </v-btn>
</template>

<script>
    export default {
        props:{
            link: String
        },
        methods:{
            voltar(){
                if(this.link){
                    this.$router.push(this.link)
                } else {
                    this.$router.go(-1)
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>