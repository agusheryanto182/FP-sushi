<template>
  <div>
    <TheNavbar />
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
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const user = ref(null)

toast.success('Welcome To Suki Sushi', {
  autoClose: 1000
})

const fetchUser = async () => {
  try {
    const response = await axios.get('/api/v1/user')
    user.value = response.data.data
  } catch (error) {
    console.error('Error fetching user data:', error)
  }
}

onMounted(fetchUser)
</script>
