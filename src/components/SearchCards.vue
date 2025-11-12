<script setup>
import { API_CONFIG } from '@/apiConfig';
import { watch, ref } from 'vue';
import SearchCard from './SearchCard.vue';


const props = defineProps({
    query: {
        type: String,
        default: ''
    }
})
const searchResults = ref([])
async function fetchSearch(query) {
    //Check if query is empty
    if (!query.trim()) {
        //reset results
        searchResults.value = []
        return
    }
    try {
        const res = await fetch(`${API_CONFIG.API_URL}/search?` + new URLSearchParams({
            q: query
        }))
        if (!res.ok) {
            throw new Error("Failed to fetch search results");
        }
        searchResults.value = await res.json();
        
    } catch (err) {
        console.log("Error: ", err);
    }
}
//Watch for changes in query prop fire fetch function if there is
watch(() => props.query,
(newQuery) => {
    console.log(newQuery)
    fetchSearch(newQuery);
});
</script>

<template>
  <div class="w-full grid grid-cols-1 gap-2 pt-2 pb-2">
    <SearchCard v-for="lesson in searchResults" :key="lesson.id" :lesson="lesson"/>
  </div>
</template>