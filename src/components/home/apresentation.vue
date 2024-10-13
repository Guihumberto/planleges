<template>
    <div class="apresentacao">
        <h1 class="text-h4 w-100 font-weight-bold">Revisão Leges</h1>
        <br>
        <div class="textoapresentacao">
            <p class="text-h5">A Revisão do Estudo da Lei ajuda você a orgnizar seus estudos de uma maneira fácil e intuitiva.</p>
            <v-btn @click="$router.push('/about')" variant="flat"color="primary">Saiba mais+</v-btn>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
.apresentacao{
    min-height: 70vh;
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
}
.textoapresentacao{
    line-height: 1.5;
}
.textoapresentacao p{
    margin-bottom: .8em;
}
@media (max-width: 500px) {
    .apresentacao{
        min-height: 40vh;
        width: 100%;
        text-align: center;
    }
}
</style>