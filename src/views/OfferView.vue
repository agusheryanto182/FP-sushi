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
        <h1 class="text-2xl font-bold mb-4">Offer Management</h1>

        <!-- Add Offer Form -->
        <form @submit.prevent="addOffer" class="mb-4">
          <input
            v-model="newOffer.title"
            type="text"
            placeholder="Offer Title"
            class="border p-2 mr-2"
            required
          />
          <input
            v-model="newOffer.description"
            type="text"
            placeholder="Description"
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
          <button type="submit" class="bg-blue-500 text-white p-2">Add Offer</button>
        </form>

        <!-- Offer List -->
        <table class="min-w-full bg-white">
          <thead>
            <tr>
              <th class="py-2">Title</th>
              <th class="py-2">Description</th>
              <th class="py-2">Image</th>
              <th class="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="offer in offerList" :key="offer.id">
              <td class="border px-4 py-2">
                <input v-model="offer.title" class="border p-2" />
              </td>
              <td class="border px-4 py-2">
                <input v-model="offer.description" class="border p-2" />
              </td>
              <td class="border px-4 py-2">
                <img :src="offer.imageUrl" alt="Offer Image" class="h-16 w-16 object-cover" />
                <input
                  @change="onFileChangeUpdate($event, offer)"
                  type="file"
                  accept="image/*"
                  class="border p-2 mt-2"
                />
              </td>
              <td class="border px-4 py-2">
                <button @click="updateOffer(offer)" class="bg-green-500 text-white p-2 mr-2">
                  Update
                </button>
                <button @click="deleteOffer(offer._id)" class="bg-red-500 text-white p-2">
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

const newOffer = ref({ title: '', category: 'discount', discount: 0, image: null })
const offerList = ref([])
const token = localStorage.getItem('token')

const fetchOfferList = async () => {
  try {
    const response = await axios.get(`${apiEndpoint}/offer`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    offerList.value = response.data.data.map((offer) => {
      offer.imageUrl = `${baseURL}/${offer.imageUrl}`
      return offer
    })
  } catch (error) {
    console.error('Error fetching offer list:', error)
  }
}
const addOffer = async () => {
  const formData = new FormData()
  formData.append('title', newOffer.value.title)
  formData.append('description', newOffer.value.description)
  formData.append('image', newOffer.value.image)

  try {
    const response = await axios.post(`${apiEndpoint}/admin/offer`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    offerList.value.push(response.data)
    newOffer.value.title = ''
    newOffer.value.description = ''
    newOffer.value.image = null
  } catch (error) {
    console.error('Error adding offer:', error)
  }
}

const updateOffer = async (offer) => {
  const formData = new FormData()
  formData.append('title', offer.title)
  formData.append('description', offer.description)
  if (offer.image) {
    formData.append('image', offer.image)
  }

  try {
    await axios.put(`${apiEndpoint}/admin/offer/${offer._id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    })
  } catch (error) {
    console.error('Error updating offer:', error)
  }
}

const deleteOffer = async (id) => {
  try {
    await axios.delete(`${apiEndpoint}/admin/offer/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    offerList.value = offerList.value.filter((offer) => offer.id !== id)
  } catch (error) {
    console.error('Error deleting offer:', error)
  }
}

const onFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    newOffer.value.image = file
  }
}

const onFileChangeUpdate = (event, offer) => {
  const file = event.target.files[0]
  if (file) {
    offer.image = file
  }
}

onMounted(fetchOfferList)
</script>
