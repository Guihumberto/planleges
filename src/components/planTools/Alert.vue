<template>
    <div class="alert my-5">
        <v-alert density="compact" type="warning">
          <p>{{ text }}</p>
        </v-alert>
    </div>
</template>

<script>
    export default {
        props:{
            text: String
        }
    }
</script>

<style lang="scss" scoped>

</style>