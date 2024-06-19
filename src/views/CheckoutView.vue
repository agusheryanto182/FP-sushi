<!-- <script setup>
import { ref, onMounted, reactive, computed } from 'vue'
import { getMenuItems } from '../services/menuService'
// Import axios for HTTP requests
import axios from '../axios'

const menuItems = ref([])
const customer = reactive({
  name: '',
  address: '',
  phone: '',
  email: ''
})
const products = reactive([{ id: '', quantity: 1 }])
const productOptions = ref([])

const totalPrice = computed(() => {
  return products.reduce((total, product) => {
    const selectedProduct = productOptions.value.find((option) => option.id === product.id)
    if (selectedProduct) {
      return total + selectedProduct.price * product.quantity
    }
    return total
  }, 0)
})

onMounted(async () => {
  try {
    const items = await getMenuItems()
    menuItems.value = items
    productOptions.value = items.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price
    }))
  } catch (error) {
    console.error('Error fetching menu items:', error)
  }
})

const addProduct = () => {
  products.push({ id: '', quantity: 1 })
}

const removeProduct = (index) => {
  products.splice(index, 1)
}

const sendOrderToApi = async () => {
  try {
    const productDetails = products.map((product) => ({
      _id: product.id,
      quantity: product.quantity
    }))

    const orderData = {
      name: customer.name,
      address: customer.address,
      phoneNumber: customer.phone,
      email: customer.email,
      productDetails: productDetails,
      totalPrice: totalPrice.value
    }

    const response = await axios.post('/api/v1/checkout', orderData)
    console.log('Order placed successfully:', response.data)

    // Reset form fields after successful submission
    customer.name = ''
    customer.address = ''
    customer.phone = ''
    customer.email = ''
    products.splice(0, products.length, { id: '', quantity: 1 })
  } catch (error) {
    console.error('Error placing order:', error)
    if (error.response) {
      console.error('Server responded with:', error.response.data)
    } else if (error.request) {
      console.error('No response received:', error.request)
    } else {
      console.error('Error:', error.message)
    }
  }
}

const submitForm = () => {
  sendOrderToApi()
}
</script>

<template>
  <div class="checkouts">
    <div class="py-3 text-center">
      <h3>Checkout</h3>
    </div>

    <div class="row">
      <div class="col-md-8 order-md-1">
        <form class="needs-validation" @submit.prevent="submitForm">
          <div class="mb-3">
            <label for="name">Name</label>
            <input type="text" class="form-control" id="name" v-model="customer.name" required />
            <div class="invalid-feedback">Valid name is required.</div>
          </div>

          <div class="mb-3">
            <label for="address">Address</label>
            <input
              type="text"
              class="form-control"
              id="address"
              v-model="customer.address"
              required
            />
            <div class="invalid-feedback">Please enter your shipping address.</div>
          </div>

          <div class="mb-3">
            <label for="phone">Phone Number</label>
            <input type="text" class="form-control" id="phone" v-model="customer.phone" required />
            <div class="invalid-feedback">Please enter your phone number.</div>
          </div>

          <div class="mb-3">
            <label for="email">Email <span class="text-muted"></span></label>
            <input type="email" class="form-control" id="email" v-model="customer.email" required />
            <div class="invalid-feedback">
              Please enter a valid email address for shipping updates.
            </div>
          </div>

          <div id="products">
            <div class="mb-3 product" v-for="(product, index) in products" :key="index">
              <label for="product">Product</label>
              <select
                class="custom-select d-block w-100 product-select"
                v-model="product.id"
                @change="calculateTotalPrice"
                required
              >
                <option value="">Choose...</option>
                <option v-for="option in productOptions" :value="option.id" :key="option.id">
                  {{ option.name }}
                </option>
              </select>
              <div class="invalid-feedback">Please select a valid product.</div>
              <label for="quantity1">Quantity</label>
              <input
                type="number"
                class="form-control quantity"
                v-model.number="product.quantity"
                @input="calculateTotalPrice"
                min="1"
                required
              />
              <div class="invalid-feedback">Please enter quantity of product you want to buy</div>
              <button type="button" class="btn btn-danger mt-2" @click="removeProduct(index)">
                Remove Product
              </button>
            </div>
          </div>

          <div class="mb-3">
            <label for="totalPrice">Total Price</label>
            <input
              type="text"
              class="form-control"
              id="totalPrice"
              :value="`Rp. ${totalPrice}`"
              readonly
            />
          </div>

          <hr class="mb-4" />
          <button class="btn btn-primary btn-lg btn-block" type="button" @click="addProduct">
            Add Product
          </button>
          <button class="btn btn-primary btn-lg btn-block" type="submit" style="margin-left: 20px">
            Checkout
          </button>
        </form>
      </div>
    </div>
  </div>
</template> -->

<template>
  <div class="checkouts">
    <div class="py-3 text-center">
      <h3>Checkout</h3>
    </div>

    <div class="row">
      <div class="col-md-8 order-md-1">
        <form class="needs-validation" @submit.prevent="submitForm">
          <div class="mb-3">
            <label for="name">Name</label>
            <input type="text" class="form-control" id="name" v-model="customer.name" required />
            <div class="invalid-feedback">Valid name is required.</div>
          </div>

          <div class="mb-3">
            <label for="address">Address</label>
            <input
              type="text"
              class="form-control"
              id="address"
              v-model="customer.address"
              required
            />
            <div class="invalid-feedback">Please enter your shipping address.</div>
          </div>

          <div class="mb-3">
            <label for="phone">Phone Number</label>
            <input type="text" class="form-control" id="phone" v-model="customer.phone" required />
            <div class="invalid-feedback">Please enter your phone number.</div>
          </div>

          <div class="mb-3">
            <label for="email">Email <span class="text-muted"></span></label>
            <input type="email" class="form-control" id="email" v-model="customer.email" required />
            <div class="invalid-feedback">
              Please enter a valid email address for shipping updates.
            </div>
          </div>

          <div id="products">
            <div class="mb-3 product" v-for="(product, index) in products" :key="index">
              <label for="product">Product</label>
              <select
                class="custom-select d-block w-100 product-select"
                v-model="product.id"
                required
              >
                <option value="">Choose...</option>
                <option v-for="option in productOptions" :value="option.id" :key="option.id">
                  {{ option.name }}
                </option>
              </select>
              <div class="invalid-feedback">Please select a valid product.</div>
              <label for="quantity1">Quantity</label>
              <input
                type="number"
                class="form-control quantity"
                v-model.number="product.quantity"
                min="1"
                required
              />
              <div class="invalid-feedback">Please enter quantity of product you want to buy</div>
              <button type="button" class="btn btn-danger mt-2" @click="removeProduct(index)">
                Remove Product
              </button>
            </div>
          </div>

          <div class="mb-3">
            <label for="totalPrice">Total Price</label>
            <input
              type="text"
              class="form-control"
              id="totalPrice"
              :value="`Rp. ${totalPrice}`"
              readonly
            />
          </div>

          <hr class="mb-4" />
          <button class="btn btn-primary btn-lg btn-block" type="button" @click="addProduct">
            Add Product
          </button>
          <button class="btn btn-primary btn-lg btn-block" type="submit" style="margin-left: 20px">
            Checkout
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, computed } from 'vue'
import { getMenuItems } from '../services/menuService'
import axios from '../axios'

const menuItems = ref([])
const customer = reactive({
  name: '',
  address: '',
  phone: '',
  email: ''
})
const products = reactive([{ id: '', quantity: 1 }])
const productOptions = ref([])

const totalPrice = computed(() => {
  return products.reduce((total, product) => {
    const selectedProduct = productOptions.value.find((option) => option.id === product.id)
    if (selectedProduct) {
      return total + selectedProduct.price * product.quantity
    }
    return total
  }, 0)
})

onMounted(async () => {
  try {
    const items = await getMenuItems()
    menuItems.value = items
    productOptions.value = items.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price
    }))
  } catch (error) {
    console.error('Error fetching menu items:', error)
  }

  // Load Midtrans Snap.js
  const script = document.createElement('script')
  const clientKey = import.meta.env.VUE_APP_CLIENT_KEY
  script.src = 'https://app.sandbox.midtrans.com/snap/snap.js'
  script.setAttribute('data-client-key', clientKey)
  document.head.appendChild(script)
})

const addProduct = () => {
  products.push({ id: '', quantity: 1 })
}

const removeProduct = (index) => {
  products.splice(index, 1)
}

const sendOrderToApi = async () => {
  try {
    const productDetails = products.map((product) => ({
      _id: product.id,
      quantity: product.quantity
    }))

    const orderData = {
      name: customer.name,
      address: customer.address,
      phoneNumber: customer.phone,
      email: customer.email,
      productDetails: productDetails,
      totalPrice: totalPrice.value
    }

    const response = await axios.post('/api/v1/checkout', orderData)
    console.log('Midtrans API response:', response.data)

    const transactionToken = response.data.token
    if (!transactionToken) {
      throw new Error('Failed to obtain transaction token from Midtrans')
    }

    window.snap.pay(transactionToken, {
      onSuccess: function (result) {
        // Handle successful payment status
        if (result.transaction_status === 'settlement') {
          // Payment is successful, perform necessary actions
          console.log('Payment is successfully.')

          // Reset form fields after successful submission
          customer.name = ''
          customer.address = ''
          customer.phone = ''
          customer.email = ''
          products.splice(0, products.length, { id: '', quantity: 1 })

          // Optionally, navigate to a success page or perform other actions
        }
      },
      onPending: function (result) {
        console.log('Payment pending:', result)
      },
      onError: function (result) {
        console.error('Payment error:', result)
      },
      onClose: function () {
        console.log('Payment popup closed without finishing the payment')
      }
    })
  } catch (error) {
    console.error('Error placing order:', error)
    if (error.response) {
      console.error('Server responded with:', error.response.data)
    } else if (error.request) {
      console.error('No response received:', error.request)
    } else {
      console.error('Error:', error.message)
    }
  }
}

const submitForm = () => {
  sendOrderToApi()
}
</script>
