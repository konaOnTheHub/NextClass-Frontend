<script setup>
    import {defineProps,computed, defineEmits} from 'vue';
    const props = defineProps ({
        lesson: Object
    });
    //Using computed reactively change the availability bubble depending on remaining spaces
    const availability = computed(() => {
        let numSpaces = props.lesson.spaces;
        if (numSpaces <= 3 && numSpaces > 0) {
            return {
                text: "Limited",
                colour: "bg-amber-600",
                hoverColour: "hover:bg-amber-800",
                numSpaces: numSpaces,
                isDisabled: false
            };
        } else if (numSpaces == 0) {
            return {
                text: "Closed",
                colour: "bg-red-600",
                hoverColour: "hover:bg-gray-800",
                numSpaces: numSpaces,
                isDisabled: true
            }
        } else {
            return {
                text: "Open",
                colour: "bg-green-600",
                hoverColour: "hover:bg-green-800",
                numSpaces: numSpaces,
                isDisabled: false
            }
        }
    });
    //Define add-to-cart emit which is bubbled through lesson cards to app.vue
    const emit = defineEmits(['add-to-cart']);
    //On addToCart emit add-to-cart
    function addToCart() {
        emit('add-to-cart', props.lesson);
    }
</script>

<template>
    <div class="h-48 w-full max-w-xs border-2 border-indigo-500 rounded-lg mx-auto relative bg-gray-800 shadow-lg">
        <div>
            <h1 class="text-white pl-5 pt-5 font-bold text-2xl">{{lesson.subject}}</h1>
            <h3 class="text-gray-300 pl-5">{{lesson.location}}</h3>
            <h3 class="text-white absolute right-0 pr-5 font-bold text-lg">£{{lesson.price}}</h3>
            <div class="h-16 bg-gray-950 absolute bottom-0 left-0 right-0 rounded-b-md flex items-center justify-between px-5">
                <div class="relative group">
                    <span :class="`${ availability.colour } ${availability.hoverColour} text-white text-sm font-semibold px-3 py-1 rounded-full cursor-pointer`">
                        {{availability.text}}
                    </span>
                    <div
                        v-if="availability.numSpaces > 0"
                        class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max bg-gray-900 text-white text-xs rounded px-3 py-1 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-10 shadow"
                    >
                        {{ availability.numSpaces }} space{{ availability.numSpaces === 1 ? '' : 's' }} available
                    </div>
                </div>
                
                <button @click="addToCart(lesson)" :disabled="availability.isDisabled" class="flex flex-row justify-between cursor-pointer text-white border-2 border-indigo-500 rounded-lg px-4 py-1 disabled:hover:bg-gray-800 disabled:cursor-not-allowed hover:bg-indigo-500 transition">
                    <span>Add to cart</span>
                    <img class="h-6 w-6 ml-2" src="../assets/shoppingCart.svg">
                </button>
            </div>
        </div>
    </div>
</template>