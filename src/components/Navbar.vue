<script setup>

</script>

<template>
    <nav class="flex flex-row w-full bg-gray-950 fixed top-0 h-14 items-center border-b-2 border-b-gray-600">
        <!-- Left: Logo -->
        <div class="flex items-center h-full">
            <a href="#" class="text-4xl font-bold text-white leading-none m-3">NextClass</a>
        </div>

        <!-- Middle: Search Field -->
        <div class="absolute left-1/2 transform -translate-x-1/2">
            <input 
                type="text" 
                placeholder="Search classes..." 
                class="w-96 h-10 px-4 text-sm text-white rounded-lg ring-2 ring-indigo-500 focus:outline-none"
            />
        </div>
        
        <!-- Right: Placeholder for future content -->
        <div class="flex items-center h-full ml-auto">
            <a href="#" class="text-1xl text-white p-1 m-3">Home</a>
            <a href="#" class="text-1xl text-white p-1 m-3">Contact</a>
            <a href="#" class="text-1xl text-white p-1 m-3">About</a>
        </div>
    </nav>
</template>