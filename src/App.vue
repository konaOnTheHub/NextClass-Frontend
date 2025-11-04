<script setup>
import Navbar from '@/components/Navbar.vue';
import { ref } from 'vue';
import { RouterView } from 'vue-router';
import { useCartStore } from '@/stores/cart'

const cart = useCartStore()
cart.loadFromLocalStorage()
</script>

<template>
  <Navbar :cartCount="cart.getItem.length.toString()" />
  <RouterView />
</template>

<style scoped></style>
