<script setup>
    import Card from '@/components/Card.vue';
    import { ref } from 'vue';
    import lessonData from '@/lessons.json'

    const lessons = ref(lessonData);
</script>

<template>
    <div class="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Card v-for="lesson in lessons" :key="lesson.id" :lesson="lesson" />

    </div>
</template>