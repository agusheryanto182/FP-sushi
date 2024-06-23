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
        <h1 class="text-2xl font-bold mb-4">Contact Management</h1>

        <!-- Add Contact Form -->
        <form @submit.prevent="addContact" class="mb-4 p-4 bg-white shadow rounded-lg">
          <div class="mb-4">
            <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
            <input
              v-model="newContact.address"
              type="text"
              id="address"
              placeholder="Address"
              class="mt-1 block w-full border p-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              v-model="newContact.email"
              type="email"
              id="email"
              placeholder="Email Address"
              class="mt-1 block w-full border p-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div class="mb-4">
            <label for="phone" class="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              v-model="newContact.phone"
              type="text"
              id="phone"
              placeholder="Phone Number"
              class="mt-1 block w-full border p-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            class="bg-blue-500 text-white font-bold py-2 px-4 rounded-full shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add Contact
          </button>
        </form>

        <!-- Contact List -->
        <div class="bg-white shadow overflow-hidden sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Address
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Email
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
              <tr>
                <td class="px-6 py-4 whitespace-nowrap">
                  <input
                    v-model="contact.address"
                    class="border p-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <input
                    v-model="contact.email"
                    class="border p-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <input
                    v-model="contact.phone"
                    class="border p-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    @click="updateContact(contact)"
                    class="bg-green-500 text-white font-bold py-2 px-4 rounded-full shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mr-2"
                  >
                    Update
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

const newContact = ref({ address: '', email: '', phone: '' })
const contact = ref({ address: '', email: '', phone: '' })
const token = localStorage.getItem('token')

const fetchContact = async () => {
  try {
    const response = await axios.get(`${apiEndpoint}/contact`)

    contact.value.id = response.data.data._id
    contact.value.address = response.data.data.address
    contact.value.email = response.data.data.email
    contact.value.phone = response.data.data.phone
  } catch (error) {
    console.error('Error fetching contact list:', error)
  }
}

const addContact = async () => {
  try {
    const response = await axios.post(`${apiEndpoint}/admin/contact`, newContact.value, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    contact.value.push(response.data)
    newContact.value.address = ''
    newContact.value.email = ''
    newContact.value.phone = ''

    toast.success('Contact added successfully', {
      autoClose: 1000
    })

    window.location.reload()
  } catch (error) {
    console.error('Error adding contact:', error)
    if (error.response.status) {
      toast.error(error.response.data.msg, {
        autoClose: 1000
      })
    }
  }
}

const updateContact = async (contact) => {
  try {
    const response = await axios.put(`${apiEndpoint}/admin/contact/${contact.id}`, contact, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (response.status === 200) {
      toast.success('Contact updated successfully', {
        autoClose: 1000
      })
    }
    // window.location.reload()
  } catch (error) {
    console.error('Error adding contact:', error)

    if (error.response.status) {
      toast.error(error.response.data.msg, {
        autoClose: 2000
      })
      await new Promise((resolve) => setTimeout(resolve, 2000))
      window.location.reload()
    }
  }
}

onMounted(fetchContact)
</script>
