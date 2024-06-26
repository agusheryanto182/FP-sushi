<template>
  <div class="flex flex-col items-center justify-center h-screen bg-blue-950">
    <!-- Login Form -->
    <div class="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="flex items-center mb-8">
        <img
          src="https://res.cloudinary.com/dpb2qk5lf/image/upload/v1719048663/Logo/hzpxqdqrnjrvwadhvbz7.png"
          alt="Company Logo"
          class="h-12 mr-2"
        />
        <span class="text-2xl font-bold text-blue-950">Suki Sushi</span>
      </div>
      <form @submit.prevent="login">
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
          <input
            v-model="email"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            required
          />
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
          <input
            v-model="password"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <div class="flex items-center justify-center">
          <button
            class="bg-blue-500 hover:bg-blue-950 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transform transition-transform hover:scale-105"
            type="submit"
          >
            Sign In
          </button>
        </div>
        <div v-if="error" class="mt-4 text-red-500 text-center">{{ error }}</div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from '../axios.js'

const email = ref('')
const password = ref('')
const error = ref('')

const login = async () => {
  try {
    const response = await axios.post('/api/v1/auth/signin', {
      email: email.value,
      password: password.value
    })
    const token = response.data.data.token
    localStorage.setItem('token', token)
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    error.value = ''
    // Redirect to the protected route
    window.location.href = '/'
  } catch (err) {
    error.value = 'Invalid email or password'
  }
}
</script>
