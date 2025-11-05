<script setup>
import { useCartStore } from '@/stores/cart'
import { computed } from 'vue';

//Import pinia cart store
const cart = useCartStore()
//Reactively calculate the total price of lessons in cart
const total = computed(() => {
    return cart.getItem.reduce((sum, item) => sum + item.price, 0);
})
</script>

<template>
    <div class="container mx-auto mt-20 p-6">
        <div class="text-center">
            <h1 class=" font-extrabold text-3xl mb-2 text-indigo-500">Your Cart</h1>
        </div>
        <div class="max-w-2xl mx-auto border-2 border-indigo-500 rounded-2xl shadow-md overflow-hidden">
            <div class="grid grid-cols-1 gap-1">
                <div v-for="lesson in cart.getItem" :key="lesson.id" :lesson="lesson" class="h-32 bg-gray-800 relative">
                    <h1 class="pl-5 pt-3 font-bold text-2xl text-white flex justify-between">
                        {{ lesson.subject }}
                    </h1>
                    <h3 class="text-gray-300 pl-5">{{ lesson.location }}</h3>
                    <h3 class="text-white absolute bottom-0 pb-3 right-0 pr-5 font-bold text-lg">£{{ lesson.price }}
                    </h3>
                    <button @click="cart.removeItem(lesson.id); lesson.spaces += 1"
                        class="text-blue-500 hover:underline cursor-pointer text-sm absolute bottom-0 left-0 pb-3 pl-5">Remove</button>
                </div>
            </div>
            <!--Only show cart is empty when cart is empty-->
            <div v-if="cart.getItem.length === 0" class="h-32 flex items-center justify-center">
                <h3 class="text-gray-300 text-lg">Your cart is empty</h3>
            </div>

        </div>
        <!--Only show total and checkout if there is something in the cart-->
        <div v-if="cart.getItem.length > 0" class="max-w-2xl mx-auto relative mt-3">
            <div class="flex justify-end">
                <button
                    class="flex flex-row justify-between px-4 py-1 text-white border-2 border-indigo-500 hover:bg-indigo-500 transition cursor-pointer rounded-lg">
                    <span>Checkout</span>
                    <img class="h-6 w-6 ml-2" src="../assets/shoppingCart.svg">
                </button>
                <span class="text-white font-bold text-lg pr-5 pl-3 py-1">Total: £{{ total }}</span>
            </div>
        </div>
    </div>
</template>