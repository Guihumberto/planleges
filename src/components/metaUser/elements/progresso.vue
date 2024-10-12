<template>
    <div v-if="true">
        {{ concluidas }} de {{ listTasks?.length }}
    </div>
</template>
<script setup>
   import { computed, ref } from 'vue';
   import { useMetaStore } from '@/store/useMetaStore';
   const metaStore = useMetaStore()

   const props = defineProps({
        item: Object
   })

   const listTasks = computed(()=> {
        return metaStore.readAllTarefas.filter(x => x.id_meta == props.item.id)
   })

   const concluidas = computed(()=> {
        return listTasks.value.filter(x => x.task_done).length
   })


</script>

<style lang="scss" scoped>

</style>