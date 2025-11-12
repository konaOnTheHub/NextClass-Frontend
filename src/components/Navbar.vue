<script setup>
import { ref, nextTick, onMounted, onBeforeUnmount, defineProps, computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import SearchCards from './SearchCards.vue';

const query = ref("");
const smallQuery = ref("");

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
        smallQuery.value = ""
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
    query.value = "";
    smallQuery.value = ""
};
//Define cart count prop
const props = defineProps({
    cartCount: {
        type: String,
    },
});
//When on cart page cart icon should lead to home
//Home should only lead to cart when there's something in the cart
//Disable button when on home but cart is empty.
const route = useRoute();
const cartLink = computed(() => {
    if (route.path === "/cart") {
        return "/"
    } else if (route.path === "/" && props.cartCount > 0) {
        return "/cart"
    } else {
        return "/"
    }
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
            <RouterLink to="/" class="text-4xl font-bold text-white leading-none m-3">NextClass</RouterLink>
        </div>

        <!-- Middle Search Field -->
        <div class="absolute left-1/2 transform -translate-x-1/2">
            <input type="text" v-model="query" @focusin="showSearchDropdown = true" ref="largeSearchInput"
                placeholder="Search classes..."
                class="w-96 h-10 px-4 text-sm text-white rounded-lg ring-2 ring-indigo-500 focus:outline-none hidden lg:block" />

        </div>
        <!--Spacer that ensures right panel sticks to the right. Was using ml-auto before this and that caused problems.-->
        <div class="flex-1"></div>

        <!-- Right Panel -->
        <div class="flex items-center h-full ">
            <div class="relative mr-8 h-8">
                <!--Small screen search button and input field-->
                <!--Show input only if button has been pressed-->
                <input v-if="showSearch" v-model="smallQuery" ref="smallSearchInput" @focusin="showSmallSearchDropdown = true"
                    placeholder="Search"
                    class="w-60 h-8 pl-10 rounded-full border-2 border-indigo-500 text-white focus:outline-none block lg:hidden">
                <button @click="handleShowSearch" ref="searchButton" tabindex="0"
                    class="cursor-pointer absolute left-0 top-0 w-8 h-8 block lg:hidden bg-indigo-500 rounded-full p-1.5">
                    <img src="/src/assets/search.svg" alt="Search">
                </button>
                <!--Small Search results-->
                <div v-if="showSmallSearchDropdown" ref="smallSearchResults" class="absolute w-60 bg-gray-950 border-2 border-gray-600 mt-[11px] rounded-b-lg opacity-95 z-10 
           max-h-60 overflow-y-auto overflow-x-hidden">
                    <p v-if="smallQuery === ''" class="p-2 text-center text-gray-400 text-sm">
                        Search by name, location, spaces or price
                    </p>
                    <div class="px-1">
                        <SearchCards :query="smallQuery" />
                    </div>
                </div>

            </div>

            <div class="flex items-center h-full mr-3">
                <div class="flex items-center space-x-6">
                    <RouterLink v-if="!showSearch" to="/"
                        class="text-white text-base m-3 hover:text-indigo-400 transition-colors">Home</RouterLink>

                    <!-- Shopping Cart Button -->
                    <RouterLink :to="cartLink" class="relative flex items-center justify-center w-10 h-10"
                        title="View Cart">

                        <!-- Cart Icon -->
                        <img src="/src/assets/shoppingCart.svg" alt="Cart" class="w-6 h-6 object-contain" />

                        <!-- Item Counter -->
                        <span v-if="cartCount > 0" class="absolute -top-1 -right-1 bg-indigo-400 text-white text-xs font-semibold 
               rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                            {{ cartCount }}
                        </span>
                    </RouterLink>
                </div>
            </div>
        </div>
    </nav>

    <!-- Search results big screen -->
    <div v-if="showSearchDropdown" ref="largeSearchResults" class="fixed left-1/2 transform -translate-x-1/2 flex flex-col justify-start
         opacity-95 border-2 rounded-b-lg border-gray-600 z-10 top-[54px]
         w-96 bg-gray-950 text-gray-600 max-h-96 overflow-y-auto overflow-x-hidden">
        <p v-if="query === ''" class="p-2 text-center text-gray-400">
            Search by name, location, spaces or price
        </p>
        <div class="px-1">
            <SearchCards :query="query" />
        </div>
    </div>

</template>