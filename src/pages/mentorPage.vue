<template>
    <div class="container">
        <div class="d-flex justify-space-between align-center px-2 py-3">
            <div class="d-flex align-center">
                <v-icon class="mr-2">mdi-account-tie</v-icon>
                <h3 class="text-h6">Área do Mentor</h3>
            </div>
             <addStudent :hiddenBtn="false" />
        </div>
        <div class="px-2">
            <alunosList />
            <!-- <MetasList />
            <updateList /> -->
        </div>
    </div>
</template>

<script setup>
    import { onMounted } from 'vue';

    import { useMentorandosStores } from '@/store/mentoradosStores';
    const mentorandoStore = useMentorandosStores()

    onMounted(() => {
        mentorandoStore.getMentoradosGroup()
    })

</script>

<style scoped>
.container{
  width: min(100vw, 1080px);
  margin-inline: auto;
  animation: apper 1s ease;
  margin-top: 5rem;
}
</style>