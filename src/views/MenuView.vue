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
        <h1 class="text-2xl font-bold mb-4">Menu Management</h1>

        <!-- Add Sushi Form -->
        <form @submit.prevent="addSushi" class="mb-4 p-4 bg-white shadow rounded-lg">
          <div class="mb-4">
            <label for="name" class="block text-sm font-medium text-gray-700">Sushi Name</label>
            <input
              v-model="newSushi.name"
              type="text"
              id="name"
              placeholder="Sushi Name"
              class="mt-1 block w-full border p-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div class="mb-4">
            <label for="category" class="block text-sm font-medium text-gray-700">Category</label>
            <select
              v-model="newSushi.category"
              id="category"
              class="mt-1 block w-full border p-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="food">Food</option>
              <option value="drink">Drink</option>
            </select>
          </div>
          <div class="mb-4">
            <label for="price" class="block text-sm font-medium text-gray-700">Price</label>
            <input
              v-model="newSushi.price"
              type="number"
              id="price"
              placeholder="Price"
              class="mt-1 block w-full border p-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div class="mb-4">
            <label for="image" class="block text-sm font-medium text-gray-700">Sushi Image</label>
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
            Add Menu
          </button>
        </form>

        <!-- Sushi List -->
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
                  Category
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Price
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
              <tr v-for="sushi in sushiList" :key="sushi.id">
                <td class="px-6 py-4 whitespace-nowrap">
                  <input
                    v-model="sushi.name"
                    class="border p-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <select
                    v-model="sushi.category"
                    class="border p-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="food">Food</option>
                    <option value="drink">Drink</option>
                  </select>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <input
                    v-model="sushi.price"
                    type="number"
                    class="border p-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <img
                    :src="sushi.imageUrl"
                    alt="Sushi Image"
                    class="h-16 w-16 object-cover rounded-md"
                  />
                  <input
                    @change="onFileChangeUpdate($event, sushi)"
                    type="file"
                    accept="image/*"
                    class="mt-2 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    @click="updateSushi(sushi)"
                    class="bg-green-500 text-white font-bold py-2 px-4 rounded-full shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mr-2"
                  >
                    Update
                  </button>
                  <button
                    @click="deleteSushi(sushi.id)"
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
import Api from '../axios.js'
import TheNavbar from '../components/TheNavbar.vue'
import TheSidebar from '../components/TheSidebar.vue'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const apiEndpoint = '/api/v1'
const baseURL = Api.defaults.baseURL

const newSushi = ref({ name: '', category: 'food', price: 0, image: null })
const sushiList = ref([])
const token = localStorage.getItem('token')

const fetchSushiList = async () => {
  try {
    const response = await axios.get('/api/v1/product')
    sushiList.value = response.data.data.map((sushi) => {
      sushi.id = sushi._id
      sushi.imageUrl = `${baseURL}/${sushi.imageUrl}`
      sushi.checkoutUrl = '/checkout'
      return sushi
    })
  } catch (error) {
    if (error.response.status) {
      toast.error(error.response.data.msg, {
        autoClose: 1000
      })
    }
  }
}

const addSushi = async () => {
  const formData = new FormData()
  formData.append('name', newSushi.value.name)
  formData.append('category', newSushi.value.category)
  formData.append('price', newSushi.value.price)
  formData.append('image', newSushi.value.image)

  try {
    const response = await axios.post(`${apiEndpoint}/admin/product/create`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    })

    if (response.status === 201) {
      toast.success('Sushi added successfully!', {
        autoClose: 1000
      })

      await new Promise((resolve) => setTimeout(resolve, 2000))
      window.location.reload()
    }
    sushiList.value.push(response.data)
    newSushi.value.name = ''
    newSushi.value.category = 'food'
    newSushi.value.price = 0
    newSushi.value.image = null
  } catch (error) {
    if (error.response.status) {
      toast.error(error.response.data.msg, {
        autoClose: 1000
      })
    }
  }
}

const updateSushi = async (sushi) => {
  const formData = new FormData()
  formData.append('name', sushi.name)
  formData.append('category', sushi.category)
  formData.append('price', sushi.price)
  if (sushi.image) {
    formData.append('image', sushi.image)
  }

  try {
    const response = await axios.put(`${apiEndpoint}/admin/product/${sushi.id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    if (response.status === 200) {
      toast.success('Sushi updated successfully!', {
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

const deleteSushi = async (id) => {
  try {
    const response = await axios.delete(`${apiEndpoint}/admin/product/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    sushiList.value = sushiList.value.filter((sushi) => sushi.id !== id)
    if (response.status === 200) {
      toast.success('Sushi deleted successfully!', {
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

const onFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    newSushi.value.image = file
  }
}

const onFileChangeUpdate = (event, sushi) => {
  const file = event.target.files[0]
  if (file) {
    sushi.image = file
  }
}

onMounted(fetchSushiList)
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
