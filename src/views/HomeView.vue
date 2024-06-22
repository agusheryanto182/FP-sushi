<template>
  <div>
    <TheNavbar :user="user" @logout="logout" />
    <div class="flex">
      <TheSidebar />
      <main class="flex-1 p-4">
        <h1 class="text-2xl font-bold mb-4">Dashboard</h1>
        <div class="grid grid-cols-2 gap-4">
          <div class="bg-white p-4 shadow rounded-lg">
            <h2 class="text-lg font-semibold mb-2">Summary</h2>
            <p>Some summary information here...</p>
          </div>
          <div class="bg-white p-4 shadow rounded-lg">
            <h2 class="text-lg font-semibold mb-2">Recent Activities</h2>
            <ul>
              <li>Activity 1</li>
              <li>Activity 2</li>
              <li>Activity 3</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import TheNavbar from '../components/TheNavbar.vue'
import TheSidebar from '../components/TheSidebar.vue'
import axios from '../axios.js'

const user = ref(null)

const fetchUser = async () => {
  try {
    const response = await axios.get('/api/v1/user')
    user.value = response.data.data
  } catch (error) {
    console.error('Error fetching user data:', error)
  }
}

onMounted(fetchUser)

const logout = () => {
  localStorage.removeItem('token')
  delete axios.defaults.headers.common['Authorization']
  // Redirect to login page
  window.location.href = '/login'
}
</script>

<style scoped>
/* Styling for sidebar (adjust as needed) */
.sidebar {
  width: 240px;
  background-color: #333;
  color: #fff;
}
</style>
