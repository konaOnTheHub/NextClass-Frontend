<script setup>
import Navbar from '@/components/Navbar.vue';
import LessonCards from '@/components/LessonCards.vue';
import HomeTitle from './components/HomeTitle.vue';
</script>

<template>
  <Navbar />
  <div class="mt-24 px-4 max-w-screen-xl mx-auto">
    <HomeTitle />
    <LessonCards />
  </div>
</template>

<style scoped></style>
