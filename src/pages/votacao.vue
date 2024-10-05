<template>
    <div class="container">
        <h1 class="text-h6 my-5 px-2">Busca Local de Votação - Pinheiro MA</h1>
        <div class="conteudo">
            <v-text-field
                label="Busca"
                prepend-inner-icon="mdi-magnify"
                variant="outlined"
                density="compact"
                v-model="search"
                placeholder="digite o nome do local ou da seção"
                clearable
            ></v-text-field>
            <div>
                <v-list>
                    <v-subheader> Total: {{ lista_locais.length }} seções</v-subheader>
                    <v-list-item v-for="item, i in list_filtred" :key="i" link class="bg-purple-lighten-5 mb-2">
                        <template v-slot:prepend>
                            <v-icon>mdi-pin-outline</v-icon>
                        </template>
                        <template v-slot:append>
                            <Detalheslocal :local="item" />
                        </template>
                        <div>
                            <h5> <v-chip density="compact">Zona: {{ item.zona }}</v-chip> Seção: {{item.secao}}</h5>
                            <p>{{ item.local }}</p>
                        </div>

                    </v-list-item>
                </v-list>
            </div>
        </div>
    </div>
</template>
<script setup>
import Detalheslocal from '@/components/eleicao/detalheslocal.vue';
import { computed, onMounted, ref } from 'vue'

const search = ref(null)

const lista_locais = ref([])

onMounted(()=> {
    carregar()
})

const carregar = () => { 
    fetch('/local_votacao.json')
    .then(response => {
        if (!response.ok) {
        throw new Error('Erro ao carregar o arquivo JSON');
        }
        return response.json();
    })
    .then(data => {
        lista_locais.value = data;
    })
    .catch(error => {
        console.error('Erro:', error);
    });
}

const removerAcentos = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

const list_filtred = computed(()=> {

    let list = lista_locais.value

    if(search.value){
        const termoBusca = removerAcentos(search.value.toLowerCase());
        return list.filter(item => {
            // Verifica o campo secao numérico convertendo para string
            const secao = item.secao.toString(); // Converte para string para realizar comparação
            const local = removerAcentos(item.local.toLowerCase());

            // Verifica se o termo de busca está contido em "secao" ou "local"
            return secao.includes(termoBusca) || local.includes(termoBusca);
        });
    }

    return list
})


</script>

<style lang="scss" scoped>
.container{
  width: min(100vw, 1080px);
  margin-inline: auto;
  animation: apper 1s ease;
}
.conteudo{
  margin: .5rem;
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
</style>