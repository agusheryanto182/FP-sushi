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
        <h1 class="text-2xl font-bold mb-4">Sushi Menu</h1>

        <!-- Add Sushi Form -->
        <form @submit.prevent="addSushi" class="mb-4">
          <input
            v-model="newSushi.name"
            type="text"
            placeholder="Sushi Name"
            class="border p-2 mr-2"
            required
          />
          <select v-model="newSushi.category" class="border p-2 mr-2" required>
            <option value="food">Food</option>
            <option value="drink">Drink</option>
          </select>
          <input
            v-model="newSushi.price"
            type="number"
            placeholder="Price"
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
          <button type="submit" class="bg-blue-500 text-white p-2">Add Menu</button>
        </form>

        <!-- Sushi List -->
        <table class="min-w-full bg-white">
          <thead>
            <tr>
              <th class="py-2">Name</th>
              <th class="py-2">Category</th>
              <th class="py-2">Price</th>
              <th class="py-2">Image</th>
              <th class="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="sushi in sushiList" :key="sushi.id">
              <td class="border px-4 py-2">
                <input v-model="sushi.name" class="border p-2" />
              </td>
              <td class="border px-4 py-2">
                <select v-model="sushi.category" class="border p-2">
                  <option value="food">Food</option>
                  <option value="drink">Drink</option>
                </select>
              </td>
              <td class="border px-4 py-2">
                <input v-model="sushi.price" type="number" class="border p-2" />
              </td>
              <td class="border px-4 py-2">
                <img :src="sushi.imageUrl" alt="Sushi Image" class="h-16 w-16 object-cover" />
                <input
                  @change="onFileChangeUpdate($event, sushi)"
                  type="file"
                  accept="image/*"
                  class="border p-2 mt-2"
                />
              </td>
              <td class="border px-4 py-2">
                <button @click="updateSushi(sushi)" class="bg-green-500 text-white p-2 mr-2">
                  Update
                </button>
                <button @click="deleteSushi(sushi.id)" class="bg-red-500 text-white p-2">
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
import { getMenuItems } from '../services/menuService.js'
import TheNavbar from '../components/TheNavbar.vue'
import TheSidebar from '../components/TheSidebar.vue'

const apiEndpoint = '/api/v1'

const newSushi = ref({ name: '', price: 0, image: null })
const sushiList = ref([])
const token = localStorage.getItem('token')

const fetchSushiList = async () => {
  try {
    sushiList.value = await getMenuItems()
  } catch (error) {
    console.error('Error fetching sushi list:', error)
  }
}

const addSushi = async () => {
  const formData = new FormData()
  formData.append('name', newSushi.value.name)
  formData.append('price', newSushi.value.price)
  formData.append('category', newSushi.value.category)
  formData.append('image', newSushi.value.image)

  try {
    const response = await axios.post(`${apiEndpoint}/admin/product/create`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    sushiList.value.push(response.data)
    newSushi.value.name = ''
    newSushi.value.price = 0
    newSushi.value.category = 'food'
    newSushi.value.image = null
  } catch (error) {
    console.error('Error adding sushi:', error)
  }
}

const updateSushi = async (sushi) => {
  const formData = new FormData()
  formData.append('name', sushi.name)
  formData.append('price', sushi.price)
  formData.append('category', sushi.category)
  if (sushi.image) {
    formData.append('image', sushi.image)
  }

  try {
    await axios.put(`${apiEndpoint}/admin/product/${sushi.id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    })
  } catch (error) {
    console.error('Error updating sushi:', error)
  }
}

const deleteSushi = async (id) => {
  try {
    await axios.delete(`${apiEndpoint}/admin/product/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    sushiList.value = sushiList.value.filter((sushi) => sushi.id !== id)
  } catch (error) {
    console.error('Error deleting sushi:', error)
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
