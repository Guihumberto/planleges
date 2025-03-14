<template>
    <div class="box-wrapper">
        <Apresentation class="apresentation" />
        <LoginCard />
    </div>
    
</template>

<style lang="scss" scoped>
    .box-wrapper{      
        width: 100%;
        min-height: calc(100vh - 210px);;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        padding: 1rem;
        background-color: var(--second-color);
        border-radius: 10px;
    }

    .apresentation{
        transition: all 0.5s ease-in-out;
        animation: appear 1s ease-in-out;
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

    @media (max-width: 768px) {
        .box-wrapper{
            border-radius: 0;
        }
        .apresentation{
            display: none;
        }
    }
</style>