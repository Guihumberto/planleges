<template>
    <div class="text-center pa-4">
      <v-dialog
        v-model="dialog"
        width="auto"
      >
        <v-card
          class="card"
          prepend-icon="mdi-tag-outline"
          :text="caderno.name"
          :title="caderno.disciplina"
        >
        <v-card-text>
            
        </v-card-text>
            <v-carousel
                min-height="400"
                progress="primary"
                hide-delimiters
                show-arrows="hover"
            >
                <v-carousel-item
                v-for="(slide, i) in slides"
                :key="i"
                >
                <v-sheet
                    height="100%"
                >
                    <div class="d-flex fill-height justify-center pa-5 pai">
                        <div v-if="revStore.readLoad">Carregando...</div>
                        <div class="text-h6 filho" v-if="slides.length">
                            <h1 class="text-h5 pa-2 bg-grey-lighten-3">{{ slide.title }}</h1>
                            <p v-html="slide.textrev" class="px-1"></p>
                        </div>
                        <div v-else>Não há cards cadastrados no caderno.</div>
                    </div>
                </v-sheet>
                </v-carousel-item>
            </v-carousel>
        </v-card>
      </v-dialog>
    </div>
</template>
<script setup>
    import { computed, inject } from 'vue';

    import { useRevStore } from "@/store/revStore";
    const revStore = useRevStore()

    const dialog = inject('dialogRevisar')
    const caderno = inject('caderno')

    const props = defineProps({
        item: Object
    })

    const slides = computed(() => {
        return revStore.readListRevs
    })
 
</script>

<style lang="scss" scoped>
   .pai{
    overflow: auto;
   }
   .card{
    width: 700px;
   }
   @media (max-width: 500px) {
    .card{
        width: 330px;
    }
   }
</style>