<script setup>
import { watch, ref } from 'vue'

const props = defineProps({
  infoMessage: {
    type: String,
    required: true
  },
  //Visibility is passed in as a prop from parent
  show: {
    type: Boolean,
    required: true
  }
})


const visible = ref(props.show)
//Watch for changes in visibility prop
watch(() => props.show, (v) => {
  visible.value = v
})
</script>

<template>
  <transition name="fade">
    <!-- v-if here so the transition can animate enter/leave -->
    <div
      v-if="visible"
      class="fixed bottom-10 right-10 bg-gray-950 border border-gray-600 text-white px-6 py-3 rounded-xl shadow-lg font-semibold"
    >
      {{ infoMessage }}
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>