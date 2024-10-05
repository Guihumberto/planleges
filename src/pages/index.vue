<template>
    <div class="container">
        <div class="" style="min-height: 60vh;">
            <box />
        </div>
    </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.container{
  width: min(98%, 1070px);
  margin: 0.5rem;
  margin-inline: auto;
  border: 1px solid rgb(224, 215, 215);
  border-radius: 10px;
  padding: 1rem;
}
.cardLogin{
    width: min(95vw, 500px);
}
.appear, .cardLogin{
    transition: .5s ease all;
}

</style>