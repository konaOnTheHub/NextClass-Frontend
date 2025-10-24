<script setup>
import {ref} from 'vue';
import Navbar from '@/components/Navbar.vue';
import LessonCards from '@/components/LessonCards.vue';
import HomeTitle from './components/HomeTitle.vue';

const cart = ref([]);

const addToCart = (lesson) => {
  if (cart.value.includes(lesson)) {
    return;
  }
  cart.value.push(lesson);
  lesson.spaces -= 1;
}
</script>

<template>
  <Navbar :cartCount="cart.length.toString()" />
  <div class="mt-24 px-4 max-w-screen-xl mx-auto">
    <HomeTitle />
    <LessonCards @add-to-cart="addToCart" />
  </div>
</template>

<style scoped></style>
