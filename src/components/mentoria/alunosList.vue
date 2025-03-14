<template>
   <v-tabs
      v-model="tab"
      color="deep-purple-accent-4"
    >
      <v-tab value="one">Alunos</v-tab>
    
      <v-tab value="two">
            Pendentes
            <v-badge
                v-if="mentorandoStore.readMentorandosAnalise.length"
                dot
                color="error"
            >
                <v-icon icon="mdi-alert"></v-icon>
            </v-badge>
      </v-tab>

    </v-tabs>

    <div v-if="tab === 'one'">
        <v-list class="list bg-transparent" >
            <v-list-item 
                :class="selected == item.id_mentorado ? 'bg-indigo-lighten-4':'bg-indigo-lighten-5'" link class="mb-1"
                @click="selectAction(item)"
                v-for="item, i in mentorandoStore.readMentorandosAceitos" :key="i">
                <template v-slot:prepend>
                    <v-icon>mdi-account</v-icon>
                </template>
                <template v-slot:append>
                    <v-icon color="primary" v-if="selected == item.id_mentorado">mdi-check</v-icon>
                </template>
                {{ item.name }} <br>
                <small>{{ item.email }}</small>
            </v-list-item>
            <!-- incluir meta -->
            <v-form @submit.prevent="createMeta()" v-if="selected" ref="form" class="mt-10">
                <div class="d-flex ga-2 align-center text-h6 mb-2"><v-icon size="small">mdi-plus-circle</v-icon>Criar Meta</div>
                <v-text-field
                    label="Nome da Meta"
                    variant="outlined"
                    density="compact"
                    placeholder="Exemplo: Semana 01"
                    v-model="name_meta"
                    clearable
                    :rules="[rules.required, rules.minfield]"
                >
                <template v-slot:append>
                    <v-btn type="submit" variant="flat" color="primary">Criar</v-btn>
                </template>
                </v-text-field>
            </v-form>
        </v-list>
        <metasList v-if="selected" :selected="selected" />
    </div>

    <v-list v-if="tab === 'two'" class="list">
        <v-list-item 
            class="mb-1 bg-red-lighten-5" link
            v-for="item, i in mentorandoStore.readMentorandosAnalise" :key="i">
            <template v-slot:prepend>
                <v-icon>mdi-account-question</v-icon>
            </template>
            <template v-slot:append>
                    <div v-if="!selectUser?.itemId" class="d-flex gap-2 transition-all">
                        <v-btn variant="text" color="primary" @click="selectedActionUser(1, item.id)">Aceitar</v-btn>
                        <v-btn variant="text" color="error" @click="selectedActionUser(2, item.id)">Recusar</v-btn>
                    </div>
                    <div v-else class="d-flex gap-2 transition-all">
                        <v-btn :color="selectUser.id == 1 ? 'primary' : 'error'" @click="confirmAction()">Confirma</v-btn>
                        <v-btn variant="text" color="grey" @click="clearSelectuser()">cancelar</v-btn>
                    </div>
            </template>
            {{ item.name }} 
        </v-list-item>
        <v-alert v-if="!mentorandoStore.readMentorandosAnalise.length" type="info" variant="outlined" text="Não há solicitações a serem avaliadas."></v-alert>
    </v-list>

</template>

<script setup>
    import { onMounted, ref } from 'vue'

    import { useMentorandosStores } from '@/store/mentoradosStores';
    const mentorandoStore = useMentorandosStores()

    import  { useMetaStore  } from '@/store/useMetaStore'
    const metaStore = useMetaStore()
    
    import { useRoute, useRouter } from 'vue-router';
    const router = useRouter()
    const route = useRoute()

    const selectUser = ref({
        id: 0,
        itemId: null
    })

    const clearSelectuser = () => {
        selectUser.value.id = 0
        selectUser.value.itemId = null
    }

    const selectedActionUser = (action, item) => {
        selectUser.value.id = action
        selectUser.value.itemId = item
    }

    const confirmAction = async () => {
        await mentorandoStore.avaliarPedido(selectUser.value)
        clearSelectuser()
    }   

    onMounted(async () => {
        if(route.query.id){
            selected.value = route.query.id
            await metaStore.getMetasMentorando(route.query.id)
        }
    })

    const rules = {
        required: value => !!value || "campo obrigatório", 
        minfield: (v) => (v||'').length >= 3 || "Mínimo 4 caracteres",
    }

    const tab= ref('one')
    const form = ref(null)
    const selected = ref('')
    const name_meta = ref('')

    const selectAction = async (item) => {
        if(selected.value == item.id_mentorado){
            selected.value = ''
            router.push('/mentor')
            return
        }
        router.push(`/mentor?name=${item.name}&id=${item.id_mentorado}`)
        selected.value = item.id_mentorado
        await metaStore.getMetasMentorando(item.id_mentorado)
    }

    const createMeta = async () => {
        const { valid } = await form.value.validate()
        if(valid){
            metaStore.addMeta({user: selected.value, meta: name_meta.value})
            name_meta.value = ''
        } 
    }

</script>

<style scoped>
.list{
    transition: all 0.5s ease-in-out;
    animation: appear 0.5s ease-in-out;
}
.transition-all{
    transition: all 0.5s ease-in-out;
    animation: slideLeft 0.5s ease-in-out;
}
@keyframes slideLeft {
    0%{
        opacity: 0;
        transform: translateX(-100%);
    }
    100%{
        opacity: 1;
        transform: translateX(0%);
    }
    
}

</style>