<template>
        <v-pagination
            v-model="page"
            :length="list_metas.length"
            rounded="0"
        ></v-pagination>
</template>

<script setup>
    import { onMounted, ref, watch} from 'vue';
    import { useRouter, useRoute } from 'vue-router';
    const router = useRouter()
    const route = useRoute()

    const page = ref(1)

    import { useMetaStore } from '@/store/useMetaStore';
    const metaStore = useMetaStore()

    const setPage = ()=> {
        if (!metaStore.readLoad) page.value += list_metas.value.findIndex(x => x.id == route.params.id);
    }

    setTimeout(() => {
        setPage()
    }, 2000)

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