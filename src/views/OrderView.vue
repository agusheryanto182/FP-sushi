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
        <h1 class="text-2xl font-bold mb-4">Order List</h1>

        <!-- Order List -->
        <table class="min-w-full bg-white">
          <thead>
            <tr>
              <th class="py-2">Name</th>
              <th class="py-2">Address</th>
              <th class="py-2">Phone Number</th>
              <th class="py-2">Email</th>
              <th class="py-2">Product Details</th>
              <th class="py-2">Total Price</th>
              <th class="py-2">Payment Status</th>
              <th class="py-2">Delivery Status</th>
              <th class="py-2">Created At</th>
              <th class="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orderList" :key="order._id">
              <td class="border px-4 py-2">
                <input v-model="order.name" class="border p-2" />
              </td>
              <td class="border px-4 py-2">
                <input v-model="order.address" class="border p-2" />
              </td>
              <td class="border px-4 py-2">
                <input v-model="order.phoneNumber" class="border p-2" />
              </td>
              <td class="border px-4 py-2">
                <input v-model="order.email" class="border p-2" />
              </td>
              <td class="border px-4 py-2">
                <ul>
                  <li v-for="product in order.productDetails" :key="product._id">
                    {{ productNames[product._id] }} (Quantity: {{ product.quantity }})
                  </li>
                </ul>
              </td>
              <td class="border px-4 py-2">
                <input v-model="order.totalPrice" type="number" class="border p-2" />
              </td>
              <td class="border px-4 py-2">
                <input
                  v-model="order.statusPayment"
                  type="checkbox"
                  :checked="order.statusPayment"
                />
              </td>
              <td class="border px-4 py-2">
                <input
                  v-model="order.statusDelivery"
                  type="checkbox"
                  :checked="order.statusDelivery"
                />
              </td>
              <td class="border px-4 py-2">
                {{ new Date(order.createdAt).toLocaleString() }}
              </td>
              <td class="border px-4 py-2">
                <button @click="updateOrder(order)" class="bg-green-500 text-white p-2 mr-2">
                  Update
                </button>
                <button @click="deleteOrder(order._id)" class="bg-red-500 text-white p-2">
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
    console.error('Error fetching order list:', error)
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
    console.error('Error fetching product names:', error)
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
    await axios.put(`${apiEndpoint}/admin/order/${order._id}`, orderData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    window.location.reload()
  } catch (error) {
    console.error('Error updating order:', error)
  }
}

const deleteOrder = async (id) => {
  try {
    await axios.delete(`${apiEndpoint}/admin/order/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    orderList.value = orderList.value.filter((order) => order._id !== id)
    window.location.reload()
  } catch (error) {
    console.error('Error deleting order:', error)
  }
}

onMounted(fetchOrderList)
</script>
