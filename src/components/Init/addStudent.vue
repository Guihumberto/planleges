<template>
    <div class="text-center">
      <v-btn @click="dialog = true" color="success" icon="mdi-plus" v-if="!hiddenBtn">
      </v-btn>
      <v-dialog
        v-model="dialog"
        width="auto"
      >
        <v-card
          max-width="400"
          prepend-icon="mdi-plus"
          text="Adicione mentorados ou compartilhe um link para ser adicionado."
          title="Adicionar mentorados"
        >
          <v-card-text>
            <v-text-field
              variant="outlined"
              density="compact"
              :value="`http://localhost:3000/addmentor/${userStore.readUser?.uid}`"
            >
            <template v-slot:append-inner>
              <v-btn variant="text" color="grey" class="pa-0 ma-0" @click="copyLink">
                <v-fade-transition>
                    <v-icon>{{ isToggled ? 'mdi-check' : 'mdi-content-copy' }}</v-icon>
                </v-fade-transition>
                <v-tooltip
                  activator="parent"
                  location="top"
                >{{ isToggled ? 'Link copiado' : 'Copiar o link' }}</v-tooltip>
            </v-btn>
            </template>
            </v-text-field>
            <v-form ref="form" @submit.prevent="teste">
              <v-text-field
                variant="outlined"
                density="compact"
                v-model="mail"
                prepend-inner-icon="mdi-email"
                placeholder="exemplo@gmail.com"
                :rules="[rules.required, rules.minfield, rules.email]"
              >
                <template v-slot:append-inner>
                  <v-btn :loading="load || mentorandoStore.readLoad" density="comfortable" color="success" @click="addMentorado">add</v-btn>
                </template>
              </v-text-field>
            </v-form>
            <v-alert 
              v-if="isUserNotExist" :type="isUserNotExist == 'send' ? 'success' : 'error'" variant="outlined" 
              :text="isUserNotExist == 'send' ? 'Pronto. Convite Enviado' :'usuário não cadastrado'" closable>
              <div>
                <small class="font-weight-thin" v-if="isUserNotExist != 'send'">Deseja enviar convite por email?</small>
                <div class="mt-5">
                  <v-btn v-if="isUserNotExist != 'send'" @click="sendInvite()" variant="outlined" prepend-icon="mdi-email" color="primary" block :loading="load">Enviar Convite</v-btn>
                </div>
              </div>
            </v-alert>
            <v-alert v-if="isInMyGroup" type="info" text="O usuário já está adicionado ao seu grupo"></v-alert>
          </v-card-text>
          <template v-slot:actions>
            <v-btn
              class="ms-auto"
              text="Fechar"
              @click="dialog = false"
            ></v-btn>
          </template>
        </v-card>
      </v-dialog>
    </div>
</template>

<script setup>
    import { ref, watch } from 'vue'

    import { useRegisterStore } from '@/store/useRegisterStore';
    const userStore = useRegisterStore()
    
    import { useMentorandosStores } from '@/store/mentoradosStores';
    const mentorandoStore = useMentorandosStores()
    

    const dialog = ref(false)
    const mail = ref('')
    const form = ref(null)
    const load = ref(false)
    const isToggled = ref(false);

    watch(isToggled, (newVal) => {
      if(isToggled.value) {
        setTimeout(() => {
          isToggled.value = false;
        }, 5000);
      } 
    })

    const isUserNotExist = ref(false)
    const isInMyGroup = ref(false)

    const props = defineProps({
      hiddenBtn: {
        type: Boolean,
        default: false
      }
    })

    const teste = () => {
      console.log('teste');   
    }

    const rules = {
      required: value => !!value || "campo obrigatório", 
      minfield: (v) => (v||'').length >= 3 || "Mínimo 4 caracteres",
      email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "E-mail inválido"
    }

    const addMentorado = async () => {
      const { valid } = await form.value.validate()
      isUserNotExist.value = false
      isInMyGroup.value = false
      if(valid){
        load.value = true
        const res = await mentorandoStore.addMentorados(mail.value)
        if(res == 'user_not_exist') isUserNotExist.value = true
        if(res == 'group_exist') isInMyGroup.value = true
        load.value = false
        if(res == 'success') {
          mail.value = ''
          dialog.value = false
        }
      }
    }

    const copyLink = () => {  
      const link = `http://localhost:3000/addmentor/${userStore.readUser?.uid}`
      isToggled.value = true
      navigator.clipboard.writeText(link)
    }

    const sendInvite = async () => {
      load.value = true
      await mentorandoStore.sendInvite(mail.value)
      isUserNotExist.value = 'send'
      load.value = false
    }

</script>