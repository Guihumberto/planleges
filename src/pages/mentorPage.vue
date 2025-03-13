<template>
    <div class="container">
        <div class="d-flex justify-space-between align-center px-2">
            <h1 class="text-h5 d-flex align-center">
                <v-icon size="small" class="mr-2">mdi-account-tie</v-icon>
                Área do Mentor
            </h1>
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