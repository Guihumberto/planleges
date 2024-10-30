<template>
    <div class="container">
        <div class="d-flex justify-center align-center" style="min-height: 60vh;">
            <div class="content">
                <loginTela />
            </div>
        </div>
    </div>
</template>

<script setup>
    import loginTela from '@/components/elements/loginCard'
</script>

<style lang="scss" scoped>
.container{
  width: min(80vw, 1080px);
  margin-inline: auto;
  margin-top: 5rem;
}

.appear{
    transition: .5s ease all;
}
.content{
    animation: aparecer 1s ease;
    transition: all 1s ease;
}
@keyframes aparecer{
    0%{
        opacity: 0;
    }
    100%{
        opacity: 1;
    }
}
</style>