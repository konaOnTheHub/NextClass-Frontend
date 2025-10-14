<script setup>
    import { ref } from 'vue';
</script>

<template>
    <div class="h-48 w-full max-w-xs border-2 border-indigo-500 rounded-lg mx-auto relative bg-gray-800 shadow-lg">
        <div>
            <h1 class="text-white pl-5 pt-5 font-bold text-2xl">Subject</h1>
            <h3 class="text-gray-300 pl-5">Location</h3>
            <h3 class="text-white absolute right-0 pr-5 font-bold text-lg">£20</h3>
            <div class="h-16 bg-gray-950 absolute bottom-0 left-0 right-0 rounded-b-md flex items-center justify-between px-5">
                <span class="bg-green-600 hover:bg-green-800 text-white text-sm font-semibold px-3 py-1 rounded-full">
                    Open
                </span>
                <button class="text-white border-2 border-indigo-500 rounded-full px-4 py-1 hover:bg-indigo-500">Add to cart</button>
            </div>
        </div>
    </div>
</template>