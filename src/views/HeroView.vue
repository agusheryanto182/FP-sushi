<template>
  <div>
    <TheNavbar />

    <div class="flex">
      <!-- Sidebar -->
      <div>
        <TheSidebar />
      </div>

      <!-- Main Content -->
      <div class="w-3/4 p-4">
        <h1 class="text-2xl font-bold mb-4">Hero Management</h1>

        <!-- Add Hero Form -->
        <form @submit.prevent="addHero" class="mb-4">
          <input
            v-model="newHero.title"
            type="text"
            placeholder="Hero Title"
            class="border p-2 mr-2"
            required
          />
          <input
            @change="onFileChange"
            type="file"
            accept="image/*"
            class="border p-2 mr-2"
            required
          />
          <button type="submit" class="bg-blue-500 text-white p-2">Add Hero</button>
        </form>

        <!-- Hero List -->
        <table class="min-w-full bg-white">
          <thead>
            <tr>
              <th class="py-2">Title</th>
              <th class="py-2">Image</th>
              <th class="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="hero in heroList" :key="hero.id">
              <td class="border px-4 py-2">
                <input v-model="hero.title" class="border p-2" />
              </td>
              <td class="border px-4 py-2">
                <img :src="hero.imageUrl" alt="Hero Image" class="h-16 w-16 object-cover" />
                <input
                  @change="onFileChangeUpdate($event, hero)"
                  type="file"
                  accept="image/*"
                  class="border p-2 mt-2"
                />
              </td>
              <td class="border px-4 py-2">
                <button @click="updateHero(hero)" class="bg-green-500 text-white p-2 mr-2">
                  Update
                </button>
                <button @click="deleteHero(hero._id)" class="bg-red-500 text-white p-2">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
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

const baseURL = Api.defaults.baseURL

const apiEndpoint = '/api/v1'

const newHero = ref({ image: null })
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
    console.error('Error fetching hero list:', error)
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
    heroList.value.push(response.data)
    newHero.value.title = ''
    newHero.value.image = null
    window.location.reload()
  } catch (error) {
    console.error('Error adding hero:', error)
  }
}

const updateHero = async (hero) => {
  const formData = new FormData()
  formData.append('title', hero.title)
  if (hero.image) {
    formData.append('image', hero.image)
  }

  console.log(hero.title)
  console.log(hero.imageUrl)

  try {
    await axios.put(`${apiEndpoint}/admin/hero/${hero._id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    window.location.reload()
  } catch (error) {
    console.error('Error updating hero:', error)
  }
}

const deleteHero = async (id) => {
  try {
    await axios.delete(`${apiEndpoint}/admin/hero/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    heroList.value = heroList.value.filter((hero) => hero.id !== id)
    window.location.reload()
  } catch (error) {
    console.error('Error deleting hero:', error)
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
