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
        methods:{
            voltar(){
                this.$router.go(-1)
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>