<template>
  <div>
    <TheNavbar />
    <div class="flex">
      <TheSidebar />
      <main class="flex-1 p-4">
        <h1 class="text-2xl font-bold mb-4">Dashboard</h1>
        <div v-for="user in users" :key="user.id" class="bg-white p-4 shadow rounded-lg mb-4">
          <p><strong>Name:</strong> {{ user.name || 'N/A' }}</p>
          <p><strong>Email:</strong> {{ user.email || 'N/A' }}</p>
          <p>
            <strong>Last Login:</strong>
            {{ user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'N/A' }}
          </p>
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

const token = localStorage.getItem('token')
const users = ref({})

toast.success('Welcome To Suki Sushi', {
  autoClose: 1000
})

const fetchUser = async () => {
  try {
    const response = await axios.get('/api/v1/admin', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    console.log(response)
    users.value = response.data.data
  } catch (error) {
    console.error('Error fetching user data:', error)
  }
}

onMounted(fetchUser)
</script>
