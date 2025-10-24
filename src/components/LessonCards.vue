<script setup>
import Card from '@/components/Card.vue';
import { ref, computed, defineProps, defineEmits } from 'vue';
import lessonData from '@/lessons.json';
import Sort from './Sort.vue';

// Original lessons (unsorted)
const originalLessons = ref(lessonData);

// Sort state: 0 = no sort, 1 = ascending, 2 = descending
const sortState = ref({
  id: null,
  state: 0,
});

// Map sort IDs to lesson fields
const idMapper = {
  subj: "subject",
  loc: "location",
  price: "price",
  space: "spaces"
};

// Computed: re-sorts automatically whenever sortState changes
const sortedLessons = computed(() => {
  const { id, state } = sortState.value;

  if (!id || state === 0) {
    return originalLessons.value;
  }

  const field = idMapper[id];
  const sorted = [...originalLessons.value]; // clone so we don’t mutate

  sorted.sort((a, b) => {
    const valA = a[field];
    const valB = b[field];

    if (typeof valA === 'string') {
      return state === 1 ? valA.localeCompare(valB) : valB.localeCompare(valA);
    } else {
      return state === 1 ? valA - valB : valB - valA;
    }
  });

  return sorted;
});

//Take emit from cards and pass it to app.vue
defineProps({
  lesson: {
    type: Object,
  }
});
const emit = defineEmits(['add-to-cart'])
</script>

<template>
  <Sort v-model:sort-state="sortState" />
  <div class="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    <Card @add-to-cart="lesson => emit('add-to-cart', lesson)" v-for="lesson in sortedLessons" :key="lesson.id" :lesson="lesson" />
  </div>
</template>