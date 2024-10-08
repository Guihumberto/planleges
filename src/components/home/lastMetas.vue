<template>
    <h1 class="ml-1 mb-2 text-h5"><v-icon size="1.5rem">mdi-finance</v-icon> Meta</h1>
    <div class="wrapper">
        <div class="d-flex justify-space-between">
            <h3>Title Lorem</h3>
            <div>< ></div>
        </div>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Est laudantium cupiditate illo saepe velit quasi voluptatem sequi,
             eaque, cumque doloremque repellendus soluta exercitationem, commodi nihil ex fugit? Quas, voluptate ullam!
        </p>
    </div>
    {{ metaStore.tarefas }}
</template>

<script setup>
</script>

<style lang="scss" scoped>
.wrapper{
    width: 100%;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    gap: .5rem;
    min-height: 200px;
    border: 1px solid rgb(210, 202, 202);
    border-radius: 8px;
    padding: 1rem;
}

</style>