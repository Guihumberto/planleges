<template>
    <div class="alert my-5">
        <v-alert density="compact" type="warning" :variant="variant">
          <p>{{ text }}</p>
        </v-alert>
    </div>
</template>

<script>
    export default {
        props:{
            text: String,
            variant: {
                default: 'flat',
                type: String
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>