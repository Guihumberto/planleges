<template>
    <div class="container">
        <voltar link="/" class="ml-3"/>
        <h1 class="text-h5 ml-4"> <v-icon size="1.7rem" class="mr-2">mdi-book-open</v-icon>Meus Cadernos de Revisão</h1>
        <div class="content">
            <p>Apesar do nome, a Revisão do Leges possui duas funcionalidades essenciais para quem estuda para concurso e afins: 
                <b>cadastro metas</b> e <b>inclusão das revisões.</b></p>

            <p>O cadastro de metas é o objetivo que que você quer alcançar em um espaço de tempo, incluindo tarefas que devem ser executadas nesse período.</p>

            <p>As revisões são cadernos vinculados a disciplinas que podem corresponder a assuntos ou a sessões de estudo. Na verdade
                ele se adapta as suas necessidades. É possível vincular cadernos de revisão as tarefas que forem executadas, facilitando
                as revisões posteriores.
            </p>
            <h5 class="text-h5">Organização por metas</h5>
            <h5 class="text-h5">Criação de Cadernos de Revisão</h5>
            <h1>Em Construção...</h1>
        </div>
    </div>  
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
.container{
  width: min(100vw, 1080px);
  margin-inline: auto;
  animation: apper 1s ease;
}
.conteudo{
  animation: apper 1s ease;
}
@keyframes apper {
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
}
.content{
  padding: 1rem;
}
.content p, h5 {
    margin-bottom: .8rem;
}
</style>