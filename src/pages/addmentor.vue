<template>
    <div class="container">
        <voltar link="/home" class="ml-3"/>
        <h1 class="text-h5 ml-4"> <v-icon size="1.7rem" class="mr-2">mdi-book-open</v-icon>Adicionar Mentor</h1>
        <div class="content" v-if="load">
            Aguarde....
        </div>
        <div v-else-if="solicitations?.rejected" class="content">
            <p>Seu pedido foi <b class="text-red">rejeitado</b> pelo Mentor {{ mentor.name }}.</p>
            <p>Para maiores informações entre em contato diretamente com o mentor.</p>
        </div>
        <div class="content" v-else>
            <div v-if="solicitations">
                Você já possui uma solicitação enviada para o mentor <b>{{ mentor.name }}</b>.
                <p>Aguarde a avaliação da solicitação.</p>
                <v-btn variant="text" color="primary" class="pa-0">Ver todas as solicitações</v-btn>
            </div>
            <div v-else>
                <div v-if="userStore.readUser?.uid">
                    <p>A solicitação será enviado ao mentor <b>{{ mentor.name }}</b> que será notificado sobre o pedido.</p>
                    <p>Uma notificação chegará na sua conta ao ser adicionado.</p>
                    <div class="text-center mt-10">
                        <v-btn :disabled="msgResponse" :loading="load" :color="msgResponse == 'success' ? 'primary' : 'success'" @click="sendInviteMentor()">{{ msgResponse == 'success' ? 'Enviado com sucesso' : 'Solicitar Acesso'}}</v-btn>
                    </div>
                </div>
                <div v-else class="d-flex justify-center flex-column align-center mt-10">
                    <p>Você precisa está logado para adicionar o mentor</p>
                    <LoginCard />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, ref } from 'vue';

    import { useRegisterStore } from '@/store/useRegisterStore';
    const userStore = useRegisterStore()

    import { useMentorandosStores } from '@/store/mentoradosStores';
    const mentorStore = useMentorandosStores()
    
    import { useRoute } from 'vue-router';
    const route = useRoute()

    const mentor = ref({})
    const solicitations = ref(null)
    const load = ref(false)
    const msgResponse = ref(null)   

    onMounted( async () => {
        load.value = true
        mentor.value = await mentorStore.getMentor(route.params.id)
        solicitations.value = await mentorStore.solicitationOpenOne(route.params.id)
        load.value = false
    })

    const sendInviteMentor = async () => {
        load.value = true
        const res = await mentorStore.sendInvite(route.params.id)
        msgResponse.value = res
        load.value = false
    }

</script>

<style scoped>
.container{
  width: min(100vw, 1080px);
  margin-inline: auto;
  animation: apper 1s ease;
  margin-top: 5rem;
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