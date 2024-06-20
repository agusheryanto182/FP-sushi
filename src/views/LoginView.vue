<template>
  <div class="flex items-center justify-center h-screen">
    <div class="w-full max-w-md">
      <form @submit.prevent="login">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email"> Email </label>
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
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Password
          </label>
          <input
            v-model="password"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <div class="flex items-center justify-between">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
        </div>
        <div v-if="error" class="mt-4 text-red-500">{{ error }}</div>
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
