<script setup>
import Navbar from '@/components/Navbar.vue'
import Card from '@/components/Card.vue'
</script>

<template>
  <Navbar />
  <div class="mt-24 px-4 max-w-screen-xl mx-auto">
    <!-- Title and Subtitle -->
    <div class="text-center mb-12">
      <h1 class="text-4xl md:text-5xl font-extrabold text-indigo-500 mb-3 tracking-tight drop-shadow">
        Find Your Next After School Experience
      </h1>
      <p class="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
        Browse and purchase after school lessons and activities for students of all ages. From coding to sports, music to art—discover opportunities to learn, grow, and connect.
      </p>
    </div>
    <div class="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
    </div>
  </div>
</template>

<style scoped></style>
