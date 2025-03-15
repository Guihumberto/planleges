<template>
     <v-card
        class="mx-auto"
        elevation="24"
        max-width="444"
    >
        <v-carousel
            :continuous="false"
            :show-arrows="false"
            height="100vh"
            hide-delimiters
            hide-delimiter-background
            v-if="lista_locais.length"
        >
            <v-carousel-item
                v-for="(slide, i) in lista_locais"
                :key="i"
            >
                <v-sheet
                color="secondary"
                height="100%"
                tile
                >
                <div class="d-flex flex-column fill-height justify-center align-center">
                    <div>
                        <h5 class="text-h5">{{ slide.aula }}</h5>
                    </div>
                    <div class="text-h5 pa-4">
                        <p><span v-html="formattedText(slide.text)"></span></p>
                    </div>
                </div>
                </v-sheet>
            </v-carousel-item>
        </v-carousel>
    </v-card>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { marked } from "marked";


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

const formattedText = (item) => marked.parse(item)

</script>
<style scoped>

</style>