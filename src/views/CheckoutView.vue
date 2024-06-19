<script setup>
import { ref, onMounted, reactive } from 'vue'
import { getMenuItems } from '../services/menuService'

const menuItems = ref([])
const customer = reactive({
  name: '',
  address: '',
  phone: '',
  email: ''
})
const products = reactive([{ name: '', quantity: 1 }])
let productOptions = []

const totalPrice = ref(0)

onMounted(async () => {
  try {
    menuItems.value = await getMenuItems()
    // Set productOptions after menuItems are fetched
    productOptions = menuItems.value.map((item) => ({
      name: item.name,
      price: item.price
    }))
  } catch (error) {
    console.error('Error fetching menu items:', error)
  }
})

const addProduct = () => {
  products.push({ name: '', quantity: 1 })
}

const removeProduct = (index) => {
  products.splice(index, 1)
  calculateTotalPrice()
}

const calculateTotalPrice = () => {
  totalPrice.value = products.reduce((total, product) => {
    const selectedProduct = productOptions.find((option) => option.name === product.name)
    if (selectedProduct) {
      const productPrice = selectedProduct.price
      const productQuantity = parseInt(product.quantity)
      return total + productPrice * productQuantity
    }
    return total
  }, 0)
}

const submitForm = () => {
  // Handle form submission
  console.log('Form submitted:', customer, products)
}
</script>

<template>
  <TheNavbar />
  <div class="checkouts">
    <div class="py-3 text-center">
      <h3>Checkout</h3>
    </div>

    <div class="row">
      <div class="col-md-8 order-md-1">
        <form class="needs-validation" @submit.prevent="submitForm">
          <!-- Informasi Pelanggan -->
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
                v-model="product.name"
                @change="calculateTotalPrice"
                required
              >
                <option value="">Choose...</option>
                <option v-for="option in productOptions" :value="option.name" :key="option.name">
                  {{ option.name }}
                </option>
              </select>
              <div class="invalid-feedback">Please select a valid product.</div>
              <label for="quantity1">Quantity</label>
              <input
                type="number"
                class="form-control quantity"
                v-model="product.quantity"
                @input="calculateTotalPrice"
                required
              />
              <div class="invalid-feedback">Please enter quantity of product you want to buy</div>
              <button type="button" class="btn btn-danger mt-2" @click="removeProduct(index)">
                Remove Product
              </button>
            </div>
          </div>

          <!-- Informasi Harga Total -->
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

  <TheFooter />
</template>
