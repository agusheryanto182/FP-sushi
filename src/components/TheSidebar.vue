<template>
  <aside class="bg-gray-200 w-64 h-screen p-4">
    <ul class="space-y-4">
      <li>
        <button
          @click="toggleHomeSubmenu"
          class="text-gray-700 hover:text-gray-900 w-full text-left"
        >
          Home
        </button>
        <ul v-if="isHomeSubmenuOpen" class="ml-4 space-y-2">
          <li><a class="text-gray-700 hover:text-gray-900" href="/menu">Menu</a></li>
          <li><a class="text-gray-700 hover:text-gray-900" href="/offers">Offers</a></li>
        </ul>
      </li>
      <li><a class="text-gray-700 hover:text-gray-900" href="/our-service">Our Service</a></li>
      <li><a class="text-gray-700 hover:text-gray-900" href="/our-team">Our Team</a></li>
    </ul>
  </aside>
</template>

<script setup>
import { ref } from 'vue'

const isHomeSubmenuOpen = ref(false)

const toggleHomeSubmenu = () => {
  isHomeSubmenuOpen.value = !isHomeSubmenuOpen.value
}
</script>

<script>
export default {
  name: 'TheSidebar'
}
</script>
