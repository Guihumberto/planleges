<template>
        <v-pagination
            v-model="page"
            :length="list_metas.length"
            rounded="0"
        ></v-pagination>
</template>

<script setup>
    import { ref, watch} from 'vue';
    import { useRouter } from 'vue-router';
    const router = useRouter()

    const page = ref(1)

    import { useMetaStore } from '@/store/useMetaStore';
    const metaStore = useMetaStore()

    const list_metas = computed(()=> {
        return metaStore.metas.sort((a, b) => {
            if (a.meta < b.meta) return -1;
            if (a.meta > b.meta) return 1;
            return 0;
        })
    })

    watch(page, (newPage) => {
        const url = list_metas.value[page.value - 1].id
        router.push(`/metas/elaborar/${url}`)
        metaStore.getMeta(url)
        metaStore.getTask(url)
    })

</script>

<style lang="scss" scoped>

</style>