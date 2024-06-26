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
        <h1 class="text-2xl font-bold mb-4">Order List</h1>

        <!-- Order List -->
        <div class="bg-white shadow overflow-hidden sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Address
                </th>
                <th
                  class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Phone Number
                </th>
                <th
                  class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Email
                </th>
                <th
                  class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Product Details
                </th>
                <th
                  class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Total Price
                </th>
                <th
                  class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Payment Status
                </th>
                <th
                  class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Delivery Status
                </th>
                <th
                  class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Created At
                </th>
                <th
                  class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="order in orderList" :key="order._id">
                <td class="px-2 py-4 whitespace-nowrap">
                  <input
                    v-model="order.name"
                    class="border p-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </td>
                <td class="px-2 py-4 whitespace-nowrap">
                  <input
                    v-model="order.address"
                    class="border p-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </td>
                <td class="px-2 py-4 whitespace-nowrap">
                  <input
                    v-model="order.phoneNumber"
                    class="border p-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </td>
                <td class="px-2 py-4 whitespace-nowrap">
                  <input
                    v-model="order.email"
                    class="border p-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </td>
                <td class="px-2 py-4 whitespace-nowrap">
                  <ul>
                    <li v-for="product in order.productDetails" :key="product._id">
                      {{ productNames[product._id] }} (Quantity: {{ product.quantity }})
                    </li>
                  </ul>
                </td>
                <td class="px-2 py-4 whitespace-nowrap">
                  <input
                    v-model="order.totalPrice"
                    type="number"
                    class="border p-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </td>
                <td class="px-2 py-4 whitespace-nowrap">
                  <input
                    v-model="order.statusPayment"
                    type="checkbox"
                    class="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                  />
                </td>
                <td class="px-2 py-4 whitespace-nowrap">
                  <input
                    v-model="order.statusDelivery"
                    type="checkbox"
                    class="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                  />
                </td>
                <td class="px-2 py-4 whitespace-nowrap">
                  {{ new Date(order.createdAt).toLocaleString() }}
                </td>
                <td class="px-2 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    @click="updateOrder(order)"
                    class="bg-green-500 text-white font-bold py-2 px-4 rounded-full shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mr-2"
                  >
                    Update
                  </button>
                  <button
                    @click="deleteOrder(order._id)"
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

const orderList = ref([])
const productNames = ref({})
const token = localStorage.getItem('token')

const fetchOrderList = async () => {
  try {
    const response = await axios.get(`${apiEndpoint}/admin/order`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    orderList.value = response.data.data
    await fetchProductNames(orderList.value)
  } catch (error) {
    if (error.response.status) {
      toast.error(error.response.data.msg, {
        autoClose: 1000
      })
    }
  }
}

const fetchProductNames = async (orders) => {
  try {
    const productIds = [
      ...new Set(orders.flatMap((order) => order.productDetails.map((product) => product._id)))
    ]
    const responses = await Promise.all(
      productIds.map((id) =>
        axios.get(`${apiEndpoint}/product`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
          params: {
            id: id
          }
        })
      )
    )

    responses.forEach((response) => {
      productNames.value[response.data.data._id] = response.data.data.name
    })
  } catch (error) {
    if (error.response.status) {
      toast.error(error.response.data.msg, {
        autoClose: 1000
      })
    }
  }
}

const updateOrder = async (order) => {
  const orderData = {
    name: order.name,
    address: order.address,
    phoneNumber: order.phoneNumber,
    email: order.email,
    totalPrice: order.totalPrice,
    statusPayment: order.statusPayment,
    statusDelivery: order.statusDelivery
  }

  try {
    const response = await axios.put(`${apiEndpoint}/admin/order/${order._id}`, orderData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    if (response.status === 200) {
      toast.success('Order updated successfully!', {
        autoClose: 1000
      })
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

const deleteOrder = async (id) => {
  try {
    const response = await axios.delete(`${apiEndpoint}/admin/order/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    orderList.value = orderList.value.filter((order) => order._id !== id)
    if (response.status === 200) {
      toast.success('Order deleted successfully!', {
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

onMounted(fetchOrderList)
</script>
