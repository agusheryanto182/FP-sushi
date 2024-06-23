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
        <h1 class="text-2xl font-bold mb-4">Our Team Management</h1>

        <!-- Add Offer Form -->
        <form @submit.prevent="addMember" class="mb-4 p-4 bg-white shadow rounded-lg">
          <div class="mb-4">
            <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
            <input
              v-model="newMember.name"
              type="text"
              id="name"
              placeholder="Name"
              class="mt-1 block w-full border p-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div class="mb-4">
            <label for="nim" class="block text-sm font-medium text-gray-700">NIM</label>
            <input
              v-model="newMember.nim"
              type="text"
              id="nim"
              placeholder="NIM"
              class="mt-1 block w-full border p-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div class="mb-4">
            <label for="image" class="block text-sm font-medium text-gray-700">Offer Image</label>
            <input
              @change="onFileChange"
              type="file"
              id="image"
              accept="image/*"
              class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              required
            />
          </div>
          <div class="mb-4">
            <label for="instagramUrl" class="block text-sm font-medium text-gray-700"
              >Instagram URL</label
            >
            <input
              v-model="newMember.instagramUrl"
              type="text"
              id="instagramUrl"
              placeholder="Instagram URL"
              class="mt-1 block w-full border p-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div class="mb-4">
            <label for="githubUrl" class="block text-sm font-medium text-gray-700"
              >Github URL</label
            >
            <input
              v-model="newMember.githubUrl"
              type="text"
              id="githubUrl"
              placeholder="Github URL"
              class="mt-1 block w-full border p-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            class="bg-blue-500 text-white font-bold py-2 px-4 rounded-full shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add Member
          </button>
        </form>

        <!-- Our Team List -->
        <div class="mb-8">
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
                    NIM
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Image
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Instagram
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    GitHub
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="member in teamList" :key="member.id">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <input
                      v-model="member.name"
                      class="border p-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <input
                      v-model="member.nim"
                      class="border p-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <img
                      :src="member.imageUrl"
                      alt="Member Image"
                      class="h-16 w-16 object-cover rounded-md"
                    />
                    <input
                      @change="onFileChangeUpdate($event, member)"
                      type="file"
                      accept="image/*"
                      class="mt-2 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <input
                      v-model="member.instagramUrl"
                      class="border p-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <input
                      v-model="member.githubUrl"
                      class="border p-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      @click="updateMember(member)"
                      class="bg-green-500 text-white font-bold py-2 px-4 rounded-full shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mr-2"
                    >
                      Update
                    </button>
                    <button
                      @click="deleteMember(member.id)"
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
const newMember = ref({ nama: '', nim: '', image: '', instagramUrl: '', githubUrl: '' })
const teamList = ref([])
const token = localStorage.getItem('token')

const fetchTeamList = async () => {
  try {
    const response = await axios.get(`${apiEndpoint}/our-team`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    teamList.value = response.data.data.map((member) => {
      member.id = member._id
      member.imageUrl = `${baseURL}/${member.imageUrl}`
      return member
    })
  } catch (error) {
    if (error.response.status) {
      toast.error(error.response.data.msg, {
        autoClose: 1000
      })
    }
  }
}

const addMember = async () => {
  const formData = new FormData()

  formData.append('name', newMember.value.name)
  formData.append('nim', newMember.value.nim)
  formData.append('image', newMember.value.image)
  formData.append('instagramUrl', newMember.value.instagramUrl)
  formData.append('githubUrl', newMember.value.githubUrl)

  try {
    const response = await axios.post(`${apiEndpoint}/admin/our-team`, formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (response.status === 201) {
      toast.success('Member added successfully', {
        autoClose: 1000
      })

      await new Promise((resolve) => setTimeout(resolve, 1000))
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

// Functions for CRUD operations on team members
const updateMember = async (member) => {
  const formData = new FormData()

  formData.append('name', member.name)
  formData.append('nim', member.nim)
  formData.append('instagramUrl', member.instagramUrl)
  formData.append('githubUrl', member.githubUrl)

  if (member.image) {
    formData.append('image', member.image)
  }

  console.log('member')
  console.log(member)

  try {
    const response = await axios.put(`${apiEndpoint}/admin/our-team/${member.id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (response.status === 200) {
      toast.success('Member updated successfully', {
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

const deleteMember = async (id) => {
  try {
    const response = await axios.delete(`${apiEndpoint}/admin/our-team/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    teamList.value = teamList.value.filter((member) => member.id !== id)
    if (response.status === 200) {
      toast.success(response.data.msg, {
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
    newMember.value.image = file
  }
}

const onFileChangeUpdate = (event, member) => {
  const file = event.target.files[0]
  if (file) {
    member.image = file
  }
}

onMounted(() => {
  fetchTeamList()
})
</script>
