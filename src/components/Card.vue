<script setup>
import { defineProps, ref } from 'vue';
import { useCartStore } from '@/stores/cart'
import AvailabilityBubble from './AvailabilityBubble.vue';
const props = defineProps({
    lesson: Object
});

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
    <div class="h-48 w-full max-w-xs border-2 border-indigo-500 rounded-lg mx-auto relative bg-gray-800 shadow-lg">
        <div>
            <h1 class="text-white pl-5 pt-5 font-bold text-2xl">{{ lesson.subject }}</h1>
            <h3 class="text-gray-300 pl-5">{{ lesson.location }}</h3>
            <h3 class="text-white absolute right-0 pr-5 font-bold text-lg">£{{ lesson.price }}</h3>
            <div
                class="h-16 bg-gray-950 absolute bottom-0 left-0 right-0 rounded-b-md flex items-center justify-between px-5">
                <AvailabilityBubble :lesson="props.lesson" @update:availability="availability = $event"/>

                <button @click="addToCart(lesson)" :disabled="availability?.isDisabled"
                    class="flex flex-row justify-between cursor-pointer text-white border-2 border-indigo-500 rounded-lg px-4 py-1 disabled:hover:bg-gray-800 disabled:cursor-not-allowed hover:bg-indigo-500 transition">
                    <span>Add to cart</span>
                    <img class="h-6 w-6 ml-2" src="../assets/shoppingCart.svg">
                </button>
            </div>
        </div>
    </div>
</template>