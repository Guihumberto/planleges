<template>
    <div>
        <v-btn v-if="list_tasks.length" @click="show = !show" variant="text">Assuntos por disciplina</v-btn>
        <div v-if="show">
            <v-expansion-panels class="ma-5">
                <v-expansion-panel  v-for="item, i in list_tasks" :key="i">
                    <v-expansion-panel-title>{{ get_disciplina(item.id_disciplina) }}</v-expansion-panel-title>
                    <v-expansion-panel-text>
                        <ul class="ml-4">
                            <li v-for="sub,s in item.items.sort(useOrderDateCreated)" :key="s">{{ sub.subject }} ({{ useDateNow(sub.date_created) }})</li>
                        </ul>
                    </v-expansion-panel-text>
                </v-expansion-panel>
            </v-expansion-panels>
        </div>
    </div>
</template>

<script setup>
    import { computed, onMounted, ref } from 'vue';
    import { useOrderDateCreated } from '@/composables/useOrderDateCreated';
    import { useDateNow } from '@/composables/useDateNow';

    import  { useMetaStore  } from '@/store/useMetaStore'
    const metaStore = useMetaStore()

    const list_metas = computed(()=> {
        return metaStore.metas.filter(x => x.show).sort((a, b) => {
            if (a.meta < b.meta) return 1;
            if (a.meta > b.meta) return -1;
            return 0;
        }).map(x => x.id)
    })


    const list_tasks = computed(()=> {
        // const list = metaStore.readAllMetasAllUsers.filter(item => list_metas.value.includes(item.id));
        const list = metaStore.readAllMetasAllUsers.filter(item => list_metas.value.includes(item.id_meta))

        const nwlist = list.reduce((acc, item) => {

            const disciplina = acc.find(x => x.id_disciplina == item.id_disciplina)

            if(disciplina){
                const subject = disciplina.items.find(d => d.subject == item.subject )
                if(!subject) {
                    disciplina.items.push(item)
                }
            } else {
                acc.push(
                    {
                        id_disciplina: item.id_disciplina,
                        items: [item]
                    }
                )
            }
            
            return acc

        }, [])

        return nwlist
    })

    const get_disciplina = (id) => {
        return metaStore.disciplinas.find(x => x.id == id).name
    }
    

    const show = ref(false)
</script>

<style lang="scss" scoped>

</style>