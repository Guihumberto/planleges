<template>
    <v-dialog
        v-model="dialog"
        width="auto"
        persistent
    >
        <v-card
            max-width="400"
            prepend-icon="mdi-account"
            text="Escolha qual tipo de usuário você deseja utilizar a aplicação."
            title="Tipo de Usuário"
        >
            <template v-slot:actions>
                <div class="d-flex ga-3 w-100 justify-center align-center mb-2 flex-column">
                    <div class="d-flex ga-3 w-100 justify-center align-center">
                        <v-card 
                            v-for="item, i in typeUser" :key="i" 
                            :color="form.type == item.id ? item.colorSelected : item.color" 
                            hover @click="form.type = item.id, form.area = null"
                        >
                            <v-card-text class="pa-5">
                                <h1 :class=" item.id == form.type ? 'text-h3' : 'text-h5'">{{ item.name }}</h1>
                            </v-card-text>
                        </v-card>
                    </div>
                    <v-list 
                        density="compact"
                        class="ma-0 pa-0 w-100 border list" color="success" v-if="form.type">
                        <v-list-subheader>Escolha a área para direcionamento</v-list-subheader>
                        <v-list-item 
                            color="success"
                            :value="i"
                            v-for="item, i in areaDirect" :key="i" link @click="form.area = item.id">
                            <template v-slot:prepend>
                                <v-icon>{{ item.icon }}</v-icon>
                            </template>
                            <template v-slot:append>
                                <v-icon v-if="item.id == form.area" >mdi-check</v-icon>
                            </template>
                            {{ item.name }}
                        </v-list-item>
                    </v-list>
                    <v-btn variant="tonal" color="success list" v-if="form.area" @click="save()">Salvar</v-btn>
                </div>
            </template>
        </v-card>
    </v-dialog>
</template>

<script setup>
    import { ref } from 'vue'

    import { useRegisterStore } from '@/store/useRegisterStore';
    const userStore = useRegisterStore()
    
    const dialog = ref(true)

    const form = ref({
        type: null,
        area: null
    })

    const typeUser = [
        {
            id:1,
            name: 'Mentor',
            icon: 'mdi-account',
            color: 'green-lighten-4',
            colorSelected: 'success'
        },
        {
            id:2,
            name: 'Aluno',
            icon: 'mdi-account-group',
            color: 'light-blue-lighten-4',
            colorSelected: 'primary'
        }
    ]

    const areaDirect = ref([
        {
            id:1,
            name: 'Concurso',
            icon: 'mdi-account',
        },
        {
            id:2,
            name: 'ENEM',
            icon: 'mdi-account-school',
        },
        {
            id:3,
            name: 'OAB',
            icon: 'mdi-hammer',
        },
        {
            id:99,
            name: 'Outros',
            icon: 'mdi-book-open',
        }
    ])

    const save = async () => {
        await userStore.setTypeUser(form.value)
        dialog.value = false
    }

</script>

<style scoped>
    .list{
        animation: appear .5s ease;
    }
</style>