<script setup>
    import {defineProps,ref,computed} from 'vue';
    const props = defineProps ({
        lesson: Object
    });

    const availability = computed(() => {
        let numSpaces = props.lesson.spaces;
        if (numSpaces <= 3 && numSpaces > 0) {
            return {
                text: "Limited",
                colour: "bg-amber-600",
                hoverColour: "hover:bg-amber-800",
                numSpaces: numSpaces
            };
        } else if (numSpaces == 0) {
            return {
                text: "Closed",
                colour: "bg-red-600",
                hoverColour: "hover:bg-gray-800",
                numSpaces: numSpaces
            }
        } else {
            return {
                text: "Open",
                colour: "bg-green-600",
                hoverColour: "hover:bg-green-800",
                numSpaces: numSpaces
            }
        }
    });
</script>

<template>
    <div class="h-48 w-full max-w-xs border-2 border-indigo-500 rounded-lg mx-auto relative bg-gray-800 shadow-lg">
        <div>
            <h1 class="text-white pl-5 pt-5 font-bold text-2xl">{{lesson.subject}}</h1>
            <h3 class="text-gray-300 pl-5">{{lesson.location}}</h3>
            <h3 class="text-white absolute right-0 pr-5 font-bold text-lg">£{{lesson.price}}</h3>
            <div class="h-16 bg-gray-950 absolute bottom-0 left-0 right-0 rounded-b-md flex items-center justify-between px-5">
                <span v-bind:class="`${ availability.colour } ${availability.hoverColour} text-white text-sm font-semibold px-3 py-1 rounded-full`">
                    {{availability.text}}
                </span>
                
                <button class="text-white border-2 border-indigo-500 rounded-full px-4 py-1 hover:bg-indigo-500">Add to cart</button>
            </div>
        </div>
    </div>
</template>