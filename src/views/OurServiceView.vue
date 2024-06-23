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
        <h1 class="text-2xl font-bold mb-4">Service Management</h1>

        <!-- Add Service Form -->
        <form @submit.prevent="addService" class="mb-4 p-4 bg-white shadow rounded-lg">
          <div class="mb-4">
            <label for="title" class="block text-sm font-medium text-gray-700">Service Title</label>
            <input
              v-model="newService.title"
              type="text"
              id="title"
              placeholder="Service Title"
              class="mt-1 block w-full border p-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div class="mb-4">
            <label for="description" class="block text-sm font-medium text-gray-700"
              >Description</label
            >
            <input
              v-model="newService.description"
              type="text"
              id="description"
              placeholder="Description"
              class="mt-1 block w-full border p-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div class="mb-4">
            <label for="image" class="block text-sm font-medium text-gray-700">Service Image</label>
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
            Add Service
          </button>
        </form>

        <!-- Service List -->
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
                  Description
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
              <tr v-for="service in serviceList" :key="service.id">
                <td class="px-6 py-4 whitespace-nowrap">
                  <input
                    v-model="service.title"
                    class="border p-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <input
                    v-model="service.description"
                    class="border p-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <img
                    :src="service.imageUrl"
                    alt="Service Image"
                    class="h-16 w-16 object-cover rounded-md"
                  />
                  <input
                    @change="onFileChangeUpdate($event, service)"
                    type="file"
                    accept="image/*"
                    class="mt-2 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    @click="updateService(service)"
                    class="bg-green-500 text-white font-bold py-2 px-4 rounded-full shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mr-2"
                  >
                    Update
                  </button>
                  <button
                    @click="deleteService(service._id)"
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

const baseURL = axios.defaults.baseURL

const apiEndpoint = '/api/v1'

const newService = ref({ title: '', description: '', image: null })
const serviceList = ref([])
const token = localStorage.getItem('token')

const fetchServiceList = async () => {
  try {
    const response = await axios.get(`${apiEndpoint}/our-services`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    serviceList.value = response.data.data.map((service) => {
      service.id = service._id
      service.imageUrl = `${baseURL}/${service.imageUrl}`
      return service
    })
  } catch (error) {
    if (error.response.status) {
      toast.error(error.response.data.msg, {
        autoClose: 1000
      })
    }
  }
}

const addService = async () => {
  const formData = new FormData()
  formData.append('title', newService.value.title)
  formData.append('description', newService.value.description)
  formData.append('image', newService.value.image)

  try {
    const response = await axios.post(`${apiEndpoint}/admin/our-services`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    if (response.status === 201) {
      toast.success('Service added successfully!', {
        autoClose: 1000
      })
      await new Promise((resolve) => setTimeout(resolve, 2000))
      window.location.reload()
    }
    serviceList.value.push(response.data)
    newService.value.title = ''
    newService.value.description = ''
    newService.value.image = null
  } catch (error) {
    if (error.response.status) {
      toast.error(error.response.data.msg, {
        autoClose: 1000
      })
    }
  }
}

const updateService = async (service) => {
  const formData = new FormData()
  formData.append('title', service.title)
  formData.append('description', service.description)
  if (service.image) {
    formData.append('image', service.image)
  }

  try {
    const response = await axios.put(`${apiEndpoint}/admin/our-services/${service._id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    if (response.status === 200) {
      toast.success('Service updated successfully!', {
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

const deleteService = async (id) => {
  try {
    const response = await axios.delete(`${apiEndpoint}/admin/our-services/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    serviceList.value = serviceList.value.filter((service) => service.id !== id)
    if (response.status === 200) {
      toast.success('Service deleted successfully!', {
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
    newService.value.image = file
  }
}

const onFileChangeUpdate = (event, service) => {
  const file = event.target.files[0]
  if (file) {
    service.image = file
  }
}

onMounted(fetchServiceList)
</script>
