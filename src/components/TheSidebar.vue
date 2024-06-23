<template>
  <div>
    <!-- Button to toggle sidebar -->
    <button
      @click="toggleSidebar"
      class="fixed right-4 top-4 bg-transparent text-white rounded-md hover:bg-white hover:text-blue-950 focus:outline-none z-10"
    >
      <svg
        v-if="!isOpen"
        class="h-6 w-6"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16m-7 6h7"
        ></path>
      </svg>
      <svg
        v-else
        class="h-6 w-6"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        ></path>
      </svg>
    </button>

    <!-- Sidebar -->
    <aside
      :class="{
        ' bg-blue-900': isOpen,
        'w-64': isOpen,
        hidden: !isOpen,
        block: isOpen,
        'h-screen': isOpen,
        'p-4': isOpen,
        fixed: isOpen,
        'right-0': isOpen,
        'transform translate-x-0': isOpen,
        'transition duration-200 ease-in-out': isOpen
      }"
      class="z-20"
    >
      <ul class="space-y-4">
        <li>
          <button
            @click="toggleHomeSubmenu"
            class="text-white hover:text-gray-900 w-full text-left"
          >
            Home Management
          </button>
          <ul v-if="isHomeSubmenuOpen" class="ml-4 space-y-2">
            <li><a class="text-white hover:text-gray-900" href="/hero">Hero</a></li>
            <li><a class="text-white hover:text-gray-900" href="/menu">Menu</a></li>
            <li><a class="text-white hover:text-gray-900" href="/offer">Offer</a></li>
          </ul>
        </li>
        <li><a class="text-white hover:text-gray-900" href="/order">Order Management</a></li>
        <li>
          <a class="text-white hover:text-gray-900" href="/our-service">Our Service Management</a>
        </li>
        <li>
          <button
            @click="toggleOurTeamSubmenu"
            class="text-white hover:text-gray-900 w-full text-left"
          >
            Our Team Management
          </button>
          <ul v-if="isHomeSubOurTeamOpen" class="ml-4 space-y-2">
            <li><a class="text-white hover:text-gray-900" href="/our-team">Our Team</a></li>
            <li><a class="text-white hover:text-gray-900" href="/task">Task</a></li>
          </ul>
        </li>
        <li><a class="text-white hover:text-gray-900" href="/contact">Contact Management</a></li>
        <!-- Logout button -->
        <li>
          <button @click="logout" class="text-white hover:text-gray-900 w-full text-left">
            Logout
          </button>
        </li>
      </ul>
    </aside>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import router from '@/router'

const isOpen = ref(false)
const isHomeSubmenuOpen = ref(false)
const isHomeSubOurTeamOpen = ref(false)

const toggleSidebar = () => {
  isOpen.value = !isOpen.value
}

const toggleHomeSubmenu = () => {
  isHomeSubmenuOpen.value = !isHomeSubmenuOpen.value
}

const toggleOurTeamSubmenu = () => {
  isHomeSubOurTeamOpen.value = !isHomeSubOurTeamOpen.value
}

const logout = () => {
  // Implement logout logic here
  // For example, clearing local storage, removing tokens, etc.
  // In this example, we'll just simulate logout by clearing localStorage

  localStorage.clear()
  sessionStorage.clear()
  router.push('/login')
}
</script>

<script>
export default {
  name: 'TheSidebar'
}
</script>

<style scoped>
/* Styling for the sidebar */
@media (max-width: 768px) {
  .transform {
    width: 0;
  }
}
</style>
