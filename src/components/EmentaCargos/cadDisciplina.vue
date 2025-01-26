<template>
    <div v-if="!organizer">
        <v-form @submit.prevent="addCargo()" ref="form">
            <v-autocomplete
                label="Disciplina"
                :items="metaStore.readDisciplinas"
                item-title="name"
                item-value="id"
                variant="outlined"
                density="compact"
                v-model="disciplina.name"
                :rules="[rules.required]"
                clearable
            ></v-autocomplete>
            <v-textarea
                label="Conteúdo"
                variant="outlined"
                density="compact"
                v-model="disciplina.ementa"
                class="mt-3"
                clearable
                auto-grow
                :rules="[rules.required]"
            ></v-textarea>
            <v-radio-group
                v-model="disciplina.tipo"
                inline
                :rules="[rules.required]"
            >
            <v-radio
                label="Conhecimentos Gerais"
                value="1"
                color="primary"
                check
            ></v-radio>
            <v-radio
                label="Conhecimentos Específicos"
                value="2"
                color="error"
            ></v-radio>
            </v-radio-group>
            <div class="text-right mb-5">
                <v-btn color="success" variant="outlined" type="submit">Organizar</v-btn>
            </div>
        </v-form>
    </div>
    <div v-else>
        <v-btn class="ml-n8" prepend-icon="mdi-close" variant="text" @click="organizer = false">Fechar</v-btn>
        <div class="mt-5">
         
            <div class="ml-1">
                <span class="font-weight-bold">Disciplina: </span>  {{  metaStore.readDisciplinas.find(x => x.id == disciplina.name ).name  }} <br>
                <span class="font-weight-bold">Ttipo: </span>  {{  disciplina.tipo == 1 ? "conhecimentos Gerais" : "Conhecimentos Específicos" }} <br>
           
            </div>
        </div>

        <v-divider class="my-5"></v-divider>

        <div class="mb-5">
            <div v-for="item, i in textoEmenta" :key="i" class="mb-3">
                <span class="font-weight-medium">{{ item.topico }} - {{ item.texto }}</span>
                <ul class="ml-10 mb-5" v-if="item.items">
                    <li v-for="list, l in item.items" class="font-weight-thin">
                        {{ list.text }}
                    </li>
                </ul>
                <div v-if="item.subtopicos.length">
                    <ul v-for="sub, s in item.subtopicos" :key="s" class="ml-10">
                         <span> <v-icon>mdi-menu-right</v-icon>{{ sub.subtitulo }}</span>
                        <li v-for="si, is in sub.items" v-if="sub.items.length" class="ml-15 font-weight-thin">
                            {{ si.text }}
                        </li>
                    </ul>
                </div>
            </div>
            <div class="text-right">
                <v-btn class="ml-n8" prepend-icon="mdi-close" variant="text" @click="organizer = false">Fechar</v-btn>
                <v-btn variant="flat" @click="saveDisciplina()" color="success" class="ml-2">Salvar</v-btn>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';

    import { useMetaStore } from '@/store/useMetaStore';
    const metaStore = useMetaStore()
    
    import { useConteudoStore } from '@/store/useConteudoStore';
    const conteudoStore = useConteudoStore()
    
    import { useRoute } from 'vue-router';
    const route = useRoute()

    const disciplina = ref({
        name: null, 
        ementa: null,
        tipo: "1",
    })

    const form = ref(null)
    const organizer = ref(false)
    const textoEmenta = ref(null)

    const rules = {
        required: value => !!value || "campo obrigatório", 
        minfield: (v) => (v||'').length >= 3 || "Mínimo 4 caracteres",
    }

    const addCargo = async () => {
        const { valid } = await form.value.validate()
        if(valid){
            organizer.value = true
            const partes = disciplina.value.ementa.replace(/\r?\n/g, ' ').split(/(?=\b\d{1,2}\))/)
            textoEmenta.value = resultadoWork(partes)        
        }
    }

    const resultadoWork = (item) => {
            const resultado = item.map( parte => {
                // Extrair o número do tópico
                const topicoMatch = parte.match(/^\b(\d{1,2})\)/);
                const topicoNumero = topicoMatch ? topicoMatch[1] : null;

                // Remover o número e parêntese do início
                let conteudo = parte.replace(/^\b\d{1,2}\)/, '').trim();

                // Separar pelo primeiro `:`
                const [topicoTexto, restante] = conteudo.split(/:(.+)/).map((s) => s.trim());

                let subtopicos = [];
                let items = null;

                if (restante) {
                    // Verificar se há um subtopico (outro `:` no restante do texto)
                    const [subtexto, itensTexto] = restante.split(/:(.+)/).map((s) => s.trim());

                    if (itensTexto) {
                    // Se houver outro `:`, criar um subtópico e processar itens
                    subtopicos.push({
                        subtitulo: subtexto,
                        complete: false,
                        items: itensTexto.split(/[;,]/).map((item) => ({
                        text: item.trim(),
                        complete: false,
                        })),
                    });
                    } else {
                    // Caso contrário, tratar como lista de itens do tópico
                    items = subtexto.split(/[;,]/).map((item) => ({
                        text: item.trim(),
                        complete: false,
                    }));
                    }
                }

                return {
                    topico: topicoNumero,
                    texto: topicoTexto,
                    complete: false,
                    items,
                    subtopicos,
                };
            });

        return resultado
    }

    const saveDisciplina = async () => {
        if(textoEmenta){
            const objeto = {
                id_cargo: route.params.id,
                name: disciplina.value.name,
                tipo: disciplina.value.tipo,
                ementa: textoEmenta.value
            }
            await conteudoStore.addDisciplinasEmenta(objeto)
            clearForms()
        }
    }
    
    const clearForms = () => {
        disciplina.value = {
            name: null,
            ementa: null,
            tipo: "1"
        }

        textoEmenta.value = null

        organizer.value = false
    }
    
</script>

<style scoped>

</style>