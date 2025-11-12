<script setup>
import { ref } from 'vue'
import { useCartStore } from '@/stores/cart'
import AvailabilityBubble from './AvailabilityBubble.vue';

const props = defineProps({
    lesson: {
        type: Object
    }
})

const availability = ref();

const cart = useCartStore()
function addToCart(lesson) {
    //Check if the lesson is already part of the cart
    //Includes only partially works here as on page refresh the object ref changes and duplicate is added so I changed it to some()
    if (cart.getItem.some(items => items.id === lesson.id)) {
        return
    }
    cart.addItem(lesson);
}
</script>

<template>
    <div class="flex justify-between items-center rounded-lg bg-gray-900 shadow-md px-4 py-3 hover:bg-gray-800 transition-colors duration-200">
        <!-- Lesson info (Subject, location) -->
        <div class="flex flex-col space-y-1">
            <h1 class="text-white font-semibold text-lg">{{ lesson.subject }}</h1>
            <h3 class="text-gray-400 text-sm">{{ lesson.location }}</h3>
        </div>

        <!-- Availability and add to cart -->
        <div class="flex flex-col items-end space-y-2">
            <AvailabilityBubble :lesson="lesson" @update:availability="availability = $event" />
            <button @click="addToCart(lesson)" :disabled="availability?.isDisabled" class="flex items-center gap-2 border border-indigo-500 text-white font-medium rounded-lg px-4 py-1.5
                 hover:bg-indigo-500 disabled:bg-gray-700 disabled:cursor-not-allowed transition-colors duration-200">
                <span>£{{ lesson.price }}</span>
                <img class="h-5 w-5" src="../assets/shoppingCart.svg" alt="Add to cart" />
            </button>
        </div>
    </div>
</template>