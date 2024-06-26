<template>
  <div>
    <TheNavbar />

    <div class="flex">
      <!-- Sidebar -->
      <div>
        <TheSidebar />
      </div>

      <!-- Main Content -->
      <div class="w-full p-4">
        <h1 class="text-2xl font-bold mb-4">User Management</h1>

        <!-- Add User Form -->
        <form @submit.prevent="addUser" class="mb-4 p-4 bg-white shadow rounded-lg">
          <div class="mb-4">
            <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
            <input
              v-model="newUser.name"
              type="text"
              id="name"
              placeholder="Name"
              class="mt-1 block w-full border p-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input
              v-model="newUser.email"
              type="email"
              id="email"
              placeholder="Email"
              class="mt-1 block w-full border p-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div class="mb-4">
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input
              v-model="newUser.password"
              type="password"
              id="password"
              placeholder="Password"
              class="mt-1 block w-full border p-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div class="mb-4">
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700"
              >Confirm Password</label
            >
            <input
              v-model="newUser.confirmPassword"
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              class="mt-1 block w-full border p-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div class="mb-4">
            <label for="phone" class="block text-sm font-medium text-gray-700">Phone</label>
            <input
              v-model="newUser.phone"
              type="tel"
              id="phone"
              placeholder="Phone"
              class="mt-1 block w-full border p-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            class="bg-blue-500 text-white font-bold py-2 px-4 rounded-full shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add User
          </button>
        </form>

        <!-- User List -->
        <div class="bg-white shadow overflow-hidden sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Email
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Password
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Phone
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="user in userList" :key="user.id">
                <td class="px-6 py-4 whitespace-nowrap">
                  <input
                    v-model="user.name"
                    class="border p-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <input
                    v-model="user.email"
                    type="email"
                    class="border p-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <input
                    v-model="user.password"
                    type="password"
                    class="border p-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <input
                    v-model="user.phone"
                    type="tel"
                    class="border p-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    @click="updateUser(user)"
                    class="bg-green-500 text-white font-bold py-2 px-4 rounded-full shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mr-2"
                  >
                    Update
                  </button>
                  <button
                    @click="deleteUser(user._id)"
                    class="bg-red-500 text-white font-bold py-2 px-4 rounded-full shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from '../axios.js'
import TheNavbar from '../components/TheNavbar.vue'
import TheSidebar from '../components/TheSidebar.vue'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const apiEndpoint = '/api/v1'

const newUser = ref({ name: '', email: '', password: '', phone: '' })
const userList = ref([])
const token = localStorage.getItem('token')

const fetchUserList = async () => {
  try {
    const response = await axios.get(`${apiEndpoint}/admin`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    userList.value = response.data.data.map((user) => {
      user.id = user._id
      return user
    })
  } catch (error) {
    if (error.response.status) {
      toast.error(error.response.data.msg, {
        autoClose: 1000
      })
    }
  }
}

const addUser = async () => {
  const formData = new FormData()
  formData.append('name', newUser.value.name)
  formData.append('email', newUser.value.email)
  formData.append('password', newUser.value.password)
  formData.append('confirmPassword', newUser.value.confirmPassword)
  formData.append('phone', newUser.value.phone)

  try {
    const response = await axios.post(`${apiEndpoint}/admin/create`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    if (response.status === 201) {
      toast.success('User added successfully!', {
        autoClose: 1000
      })
      await new Promise((resolve) => setTimeout(resolve, 2000))
      window.location.reload()
    }
    userList.value.push(response.data)
    newUser.value.name = ''
    newUser.value.email = ''
    newUser.value.password = ''
    newUser.value.phone = ''
  } catch (error) {
    if (error.response.status) {
      toast.error(error.response.data.msg, {
        autoClose: 1000
      })
    }
  }
}

const updateUser = async (user) => {
  const formData = new FormData()
  formData.append('name', user.name)
  formData.append('email', user.email)
  formData.append('password', user.password)
  formData.append('phone', user.phone)

  try {
    const response = await axios.put(`${apiEndpoint}/admin/${user._id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    if (response.status === 200) {
      toast.success('User updated successfully!', {
        autoClose: 1000
      })

      await new Promise((resolve) => setTimeout(resolve, 2000))
      window.location.reload()
    }
  } catch (error) {
    if (error.response.status) {
      toast.error(error.response.data.msg, {
        autoClose: 2000
      })
      await new Promise((resolve) => setTimeout(resolve, 2000))
      window.location.reload()
    }
  }
}

const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${apiEndpoint}/admin/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    userList.value = userList.value.filter((user) => user.id !== id)
    if (response.status === 200) {
      toast.success('User deleted successfully!', {
        autoClose: 1000
      })
    }
  } catch (error) {
    if (error.response.status) {
      toast.error(error.response.data.msg, {
        autoClose: 1000
      })
    }
  }
}

onMounted(fetchUserList)
</script>
