<template>
    <div class="apresentacao">
        <h1 class="w-100">Revisão Leges</h1>
        <br>
        <div class="textoapresentacao">
            <p>A Revisão do Estudo da Lei ajuda você a orgnizar seus estudos de uma maneira fácil e intuitiva.</p>
            <a class="btn" @click="$router.push('/about')">Saiba Mais</a>
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
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    color: #fff;
}
.textoapresentacao{
    line-height: 1.5;
}
.apresentacao h1{
    font-weight: 700;
    font-size: 3.2rem;
    color: transparent;
    -webkit-text-stroke: .7px var(--main-color);
}
.textoapresentacao p{
    font-size: 1.5rem;
    margin-bottom: .8em;
}
.textoapresentacao .btn{
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 13rem;
    height: 2.7rem;
    background: var(--main-color);
    font-size: 1.2rem;
    border: .2rem solid var(--main-color);
    border-radius: .6rem;
    font-weight: 600;
    letter-spacing: .1rem;
    color: var(--second-color);
    text-decoration: none;
    z-index: 1;
    overflow: hidden;
    transition: .5s
}
.textoapresentacao .btn::before{
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    background: var(--second-color);
    z-index: -1;
    transition: .5s
}
.textoapresentacao .btn:hover::before{
    width: 100%;
}
.textoapresentacao .btn:hover{
    color: var(--main-color);
}

@media (max-width: 500px) {
    .apresentacao{
        min-height: 40vh;
        width: 100%;
        text-align: center;
    }
}
</style>