<script setup>
    import {onBeforeMount, onBeforeUnmount, onMounted, ref} from 'vue';
    const showSortDropdown = ref(false);
    const sortOptions = ref([
        {id: 'subj', name:'Subject'},
        {id: 'loc', name:'Location'},
        {id: 'price', name:'Price'},
        {id: 'space', name: 'Spaces'}

    ]);
    const dropDownContainer = ref(null);

    function closeDropdown(e) {
        if (dropDownContainer.value && !dropDownContainer.value.contains(e.target)) {
            showSortDropdown.value = false;
        };
    }
    //State 0 - no sort, State 1 - ascending, State 2 - Descending
    const sortState = ref({
        id: null,
        state: 0,
    });

    function cycleSort(cycleId) {
        //If the sort by option changes reset the state instead of continuing it
        if (sortState.value.id != cycleId) {
            sortState.value.state = 0;
        };
        sortState.value.id = cycleId;
        if (sortState.value.state < 2) {
            sortState.value.state += 1;
        } else {
            sortState.value.state = null;
        }
    }

    onMounted(() => document.addEventListener('click', closeDropdown));
    onBeforeUnmount(() => document.removeEventListener('click', closeDropdown));
</script>

<template>
    <div class="relative flex mb-2 mr-0 ml-auto h-10 w-35" ref="dropDownContainer">
        <button @click="showSortDropdown = !showSortDropdown" 
            class="cursor-pointer flex items-center justify-center h-10 w-35 gap-2 px-4  bg-gray-950 border-2 border-indigo-500 hover:bg-indigo-500 transition text-white font-semibold rounded-full ">
            <img class="h-6 w-6" src="../assets/sortMenu.svg" alt="Sort">
            <span>Filter</span>
        </button>

        <!--Sort dropdown menu-->
        <div v-if="showSortDropdown" 
            class="absolute right-0 mt-10 w-48 bg-gray-950 opacity-95 rounded-lg z-1 overflow-hidden">
            <button v-for="option in sortOptions" :key="option.id"
            @click="cycleSort(option.id)"
            class="cursor-pointer flex items-center justify-between w-full text-left px-4 py-2 text-gray-300 hover:bg-indigo-500"
            >
                <span>{{option.name}}</span>
                <img v-if="option.id == sortState.id && sortState.state == 1" class="h-5 w-5 fill-gray-300" src="../assets/ascSort.svg" alt="ascending">
                <img v-if="option.id == sortState.id && sortState.state == 2" class="h-5 w-5 fill-gray-300" src="../assets/descSort.svg" alt="descending">
            </button>
        </div>
    </div>
</template>