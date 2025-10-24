<script setup>
import { ref, nextTick, onMounted, onBeforeUnmount, defineProps } from 'vue';

//States (Search)
const showSearch = ref(false);
const showSearchDropdown = ref(false);
const showSmallSearchDropdown = ref(false);

//Element ref (Search)
const smallSearchResults = ref(null);
const smallSearchInput = ref(null);
const searchButton = ref(null);

const largeSearchInput = ref(null);
const largeSearchResults = ref(null);

function handleShowSearch() {
    showSearch.value = !showSearch.value;
    if (showSearch.value) {
        nextTick(() => {
            smallSearchInput.value?.focus();
        });
    } else {
        showSmallSearchDropdown.value = false;
    }
};
function handleClickOutside(event) {
    const input = smallSearchInput.value;
    const button = searchButton.value;
    const dropdown = smallSearchResults.value;

    //Large dropdown
    const lgInput = largeSearchInput.value;
    const lgDropdown = largeSearchResults.value;

    if (
        input && input.contains(event.target) ||
        button && button.contains(event.target) ||
        dropdown && dropdown.contains(event.target) ||
        lgInput && lgInput.contains(event.target) ||
        lgDropdown && lgDropdown.contains(event.target)
    ) {
        // Click is inside, do nothing
        return;
    }

    // Click is outside, close
    showSearch.value = false;
    showSmallSearchDropdown.value = false;
    showSearchDropdown.value = false;
};
    //Define cart count prop
    defineProps({
        cartCount: {
            type: String,
        },
    });
   

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
});
onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
});

</script>

<template>
    <nav class="flex flex-row w-full bg-gray-950 fixed top-0 h-14 items-center border-b-2 border-b-gray-600 z-2">
        <!-- Left Logo -->
        <div class="flex items-center h-full">
            <a href="#" class="text-4xl font-bold text-white leading-none m-3">NextClass</a>
        </div>

        <!-- Middle Search Field -->
        <div class="absolute left-1/2 transform -translate-x-1/2">
            <input type="text" @focusin="showSearchDropdown = true" ref="largeSearchInput"
                placeholder="Search classes..."
                class="w-96 h-10 px-4 text-sm text-white rounded-lg ring-2 ring-indigo-500 focus:outline-none hidden lg:block" />

        </div>
        <!--Spacer that ensures right panel sticks to the right. Was using ml-auto before this and that caused problems.-->>
        <div class="flex-1"></div>

        <!-- Right Panel -->
        <div class="flex items-center h-full ">
            <div class="relative mr-8 h-8">

                <input v-if="showSearch" ref="smallSearchInput" @focusin="showSmallSearchDropdown = true"
                    placeholder="Search"
                    class="w-60 h-8 pl-10 rounded-full border-2 border-indigo-500 text-white focus:outline-none block lg:hidden">
                <button @click="handleShowSearch" ref="searchButton" tabindex="0"
                    class="cursor-pointer absolute left-0 top-0 w-8 h-8 block lg:hidden bg-indigo-500 rounded-full p-1.5">
                    <img src="/src/assets/search.svg" alt="Search">
                </button>
                <!--Search-->
                <div v-if="showSmallSearchDropdown" ref="smallSearchResults"
                    class="w-full h-40 bg-gray-950 border-2 border-gray-600 mt-[11px] rounded-b-lg opacity-95">

                </div>

            </div>

            <div class="flex items-center h-full mr-3">
                <div class="flex items-center space-x-6">
                    <a v-if="!showSearch" href="#"
                        class="text-white text-base m-3 hover:text-indigo-400 transition-colors">Home</a>
                    <a v-if="!showSearch" href="#"
                        class="text-white text-base m-3 hover:text-indigo-400 transition-colors">Contact</a>
                    <a v-if="!showSearch" href="#"
                        class="text-white text-base m-3 hover:text-indigo-400 transition-colors">About</a>

                    <!-- Shopping Cart Button -->
                    <button class="relative flex items-center justify-center w-10 h-10" title="View Cart">

                        <!-- Cart Icon -->
                        <img src="/src/assets/shoppingCart.svg" alt="Cart" class="w-6 h-6 object-contain" />

                        <!-- Item Counter -->
                        <span v-if="cartCount > 0" class="absolute -top-1 -right-1 bg-indigo-400 text-white text-xs font-semibold 
               rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                            {{ cartCount }}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    </nav>

    <!-- Search results big screen -->
    <div v-if="showSearchDropdown" ref="largeSearchResults"
        class="fixed left-1/2 transform -translate-x-1/2 flex justify-center opacity-95 border-2 rounded-b-lg border-gray-600 z-1 top-13 h-32 w-96 bg-gray-950 text-gray-600">
        <p>Search by name</p>
    </div>

</template>