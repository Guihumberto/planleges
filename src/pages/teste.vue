<template>
    <div class="container">
        <div class="header">
            <div class="title">
                <div class="titleOne">
                    <h2 class="mb-5 ml-n1">Title Site lomre dasd s</h2>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo ipsum rerum saepe 
                        voluptas fugiat atque 
                        cum iusto vitae neque illo dignissimos, repellendus, impedit, nesciunt voluptate 
                        similique mollitia ut fugit dolorem.
                    </p>
                    <div class="mt-10">
                        <a href="#" class="btn">Eu vou para o aniversário do Theodoro</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="content">
            <h3>Title novo</h3>
            <p 
                v-for="item, i in 5" :key="i">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit atque aliquid facilis perspiciatis 
                accusantium, possimus alias, ipsa minus error, ullam quia dicta. Doloribus facere debitis vitae ratione modi ad. Optio!
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
.header{
    background: #23424a;
    color: #fff;
    padding: 3em 0;
}
.title{
    width: min(90%, 1080px);
    margin: 0 auto;
}
.titleOne{
    width: min(100%, 400px);
}
.content{
    width: min(90%, 1080px);
    margin: 0 auto;
    padding-top: 1em;
}
.content p {
    margin: 1em 0;
}
.btn{
    text-decoration: none;
    color: #23424a;
    background: #69e8f3;
    padding: .6em .8em;
    border-radius: 16px;
    font-weight: 700;
}
</style>