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
        <h1 class="text-2xl font-bold mb-4">Hero Management</h1>

        <!-- Add Hero Form -->
        <form @submit.prevent="addHero" class="mb-4 p-4 bg-white shadow rounded-lg">
          <div class="mb-4">
            <label for="title" class="block text-sm font-medium text-gray-700">Hero Title</label>
            <input
              v-model="newHero.title"
              type="text"
              id="title"
              placeholder="Hero Title"
              class="mt-1 block w-full border p-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div class="mb-4">
            <label for="image" class="block text-sm font-medium text-gray-700">Hero Image</label>
            <input
              @change="onFileChange"
              type="file"
              id="image"
              accept="image/*"
              class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              required
            />
          </div>
          <button
            type="submit"
            class="bg-blue-500 text-white font-bold py-2 px-4 rounded-full shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add Hero
          </button>
        </form>

        <!-- Hero List -->
        <div class="bg-white shadow overflow-hidden sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Title
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Image
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="hero in heroList" :key="hero.id">
                <td class="px-6 py-4 whitespace-nowrap">
                  <input
                    v-model="hero.title"
                    class="border p-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <img
                    :src="hero.imageUrl"
                    alt="Hero Image"
                    class="h-16 w-16 object-cover rounded-md"
                  />
                  <input
                    @change="onFileChangeUpdate($event, hero)"
                    type="file"
                    accept="image/*"
                    class="mt-2 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    @click="updateHero(hero)"
                    class="bg-green-500 text-white font-bold py-2 px-4 rounded-full shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mr-2"
                  >
                    Update
                  </button>
                  <button
                    @click="deleteHero(hero._id)"
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
import Api from '../axios.js'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const baseURL = Api.defaults.baseURL

const apiEndpoint = '/api/v1'

const newHero = ref({ title: '', image: null })
const heroList = ref([])
const token = localStorage.getItem('token')

const fetchHeroList = async () => {
  try {
    const response = await axios.get(`${apiEndpoint}/hero`)
    heroList.value = response.data.data.map((hero) => {
      hero.imageUrl = `${baseURL}/${hero.imageUrl}`
      return hero
    })
  } catch (error) {
    if (error.response.status) {
      toast.error(error.response.data.msg, {
        autoClose: 1000
      })
    }
  }
}

const addHero = async () => {
  const formData = new FormData()
  formData.append('title', newHero.value.title)
  formData.append('image', newHero.value.image)

  try {
    const response = await axios.post(`${apiEndpoint}/admin/hero`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    })

    if (response.status === 201) {
      toast.success('Hero added successfully!', {
        autoClose: 1000
      })

      await new Promise((resolve) => setTimeout(resolve, 2000))

      window.location.reload()
    }

    heroList.value.push(response.data)
    newHero.value.title = ''
    newHero.value.image = null
  } catch (error) {
    if (error.response.status) {
      toast.error(error.response.data.msg, {
        autoClose: 1000
      })
    }
  }
}

const updateHero = async (hero) => {
  const formData = new FormData()
  formData.append('title', hero.title)
  if (hero.image) {
    formData.append('image', hero.image)
  }

  try {
    const response = await axios.put(`${apiEndpoint}/admin/hero/${hero._id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    if (response.status === 200) {
      toast.success('Hero updated successfully!', {
        autoClose: 1000
      })

      await new Promise((resolve) => setTimeout(resolve, 2000))
      window.location.reload()
    }
  } catch (error) {
    if (error.response.status) {
      toast.error(error.response.data.msg, {
        autoClose: 1000
      })
    }
  }
}

const deleteHero = async (id) => {
  try {
    const response = await axios.delete(`${apiEndpoint}/admin/hero/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    heroList.value = heroList.value.filter((hero) => hero.id !== id)
    if (response.status === 200) {
      toast.success('Hero deleted successfully!', {
        autoClose: 1000
      })

      await new Promise((resolve) => setTimeout(resolve, 2000))
      window.location.reload()
    }
  } catch (error) {
    if (error.response.status) {
      toast.error(error.response.data.msg, {
        autoClose: 1000
      })
    }
  }
}

const onFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    newHero.value.image = file
  }
}

const onFileChangeUpdate = (event, hero) => {
  const file = event.target.files[0]
  if (file) {
    hero.image = file
  }
}

onMounted(fetchHeroList)
</script>

<style scoped>
/* Styling for the sidebar and main content */
.sidebar {
  width: 240px;
  background-color: #333;
  color: #fff;
}

.main-content {
  width: calc(100% - 240px);
}
</style>
