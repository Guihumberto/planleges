<template>
    <div>
        <div class="content">
            <listDisciplinas v-if="userStore.user?.uid" class="listDisciplinas" />
            <div class="groupBox">
                <LoginCard v-if="!userStore.user?.uid"/>
                <div v-else class="wrapper-last">
                    <LastCards />
                </div>
            </div>
        </div>
    </div>
    
</template>

<script setup>
    import { useRegisterStore } from '@/store/useRegisterStore'
    const userStore = useRegisterStore()
    
</script>

<style lang="scss" scoped>
.content{
    display: flex;
    justify-content: left;
    color: #212121;
    gap: 1rem;
}
.listDisciplinas{
    transition: 1s ease;
}
@media (max-width: 1100px) {
    .listDisciplinas{
        display: none;
    }
    .groupBox{
        width: 100%;
    }
    .content{
        justify-content: center;
    }
}
.groupBox{
    width: 100%;
    min-height: 70vh;
    display: flex;
    justify-content: baseline;
    align-items:center;
    flex-direction: column;
}
.wrapper-last{
    width: 100%;
}
.box{
    display: flex;
    justify-content: end;
    flex-direction: column;
    padding: .5rem;
    border: 1px solid rgb(220, 219, 219);
    border-radius: 3px;
    width: min(99vw, 270px);
    height: 8rem;
    transition:.5s ease-in-out;
    animation: appear linear;
    animation-timeline: view();
    animation-range: entry 0% cover 15%;
}
.box:hover{
    border: 1px solid rgb(113, 111, 111);
    box-shadow: 2px 2px 2px #888888;
}
.box h2{
    font-size: 1.1rem;
}
.box p{
    font-size: 0.8rem;
}
p{
    max-width: 50ch;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
@keyframes appear {
    from{
        opacity: 0;
        clip-path: inset(100% 100% 0 0);
    }
    to {
        opacity: 1;
        clip-path: inset(0 0 0 0);
    }
}
</style>