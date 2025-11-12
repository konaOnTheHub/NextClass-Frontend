<script setup>
import { computed, watch } from 'vue';
import { useCartStore } from '@/stores/cart'
const cart = useCartStore()

const props = defineProps({
    lesson: {
        type: Object
    }
})
const emit = defineEmits(['update:availability']);

//Using computed reactively change the availability bubble depending on remaining spaces
const availability = computed(() => {
    let numSpaces = props.lesson.spaces;
    if (cart.getItem.some(items => items.id === props.lesson.id)) {
        numSpaces -= cart.getQuantity
    }
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

//Emit availability to parent
watch(availability, (newVal) => {
    emit('update:availability', newVal);
}, {immediate: true});
</script>

<template>
    <div class="relative group">
        <span
            :class="`${availability.colour} ${availability.hoverColour} text-white text-sm font-semibold px-3 py-1 rounded-full cursor-pointer`">
            {{ availability.text }}
        </span>
        <div v-if="availability.numSpaces > 0"
            class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max bg-gray-900 text-white text-xs rounded px-3 py-1 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-10 shadow">
            {{ availability.numSpaces }} space{{ availability.numSpaces === 1 ? '' : 's' }} available
        </div>
    </div>
</template>