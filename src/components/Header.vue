<template>
    <div class="header">
        <div class="header__logo">
            <img @click="goHome" src="../assets/img/logo.png" />
            <h1>Pokemon By Evan</h1>
        </div>
    </div>
</template>

<script setup>

import { useRouter } from 'vue-router';

const router = useRouter();

const goHome = () => {
    router.push({ name: 'Home' });
}

</script>

<style lang="scss" scoped>
.header{
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    padding: 10px 40px;
    align-items: center;

    &__logo {
        display: flex;
        align-items: center;
        gap: 20px;
        font-size: 15px;


        img {
            max-width: 80px;
            cursor: pointer;
        }
    }
}
</style>