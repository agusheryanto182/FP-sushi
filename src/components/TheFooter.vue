<template>
  <footer class="site-footer">
    <div class="container">
      <div class="row">
        <div class="col-lg-3 col-md-6">
          <h3>
            <router-link :to="{ name: 'contact' }">Get In Touch</router-link>
            <br />
            <a href="https://www.facebook.com"> <i class="ri-facebook-fill"></i></a>
            <a href="https://www.instagram.com"><i class="ri-instagram-fill"></i></a>
          </h3>
        </div>

        <div class="col-lg-3 col-md-6">
          <h3>Best Seller</h3>
          <ul>
            <li v-for="(sushi, index) in sushiList.slice(0, 5)" :key="index">
              <a @click.prevent="openNewTab" :href="'/checkout/' + sushi.id">{{ sushi.name }}</a>
            </li>
          </ul>
        </div>

        <div class="col-lg-3 col-md-6">
          <h3>Opening Hours</h3>
          <ul>
            <li><a>Monday-Friday: 11 AM-11 PM</a></li>
            <li><a>Saturday-Sunday: 10 AM-10 PM</a></li>
          </ul>
        </div>

        <div class="col-lg-3 col-md-6">
          <h3>
            <router-link :to="{ name: 'home' }" v-if="$route.path !== '/'"> Our Menu </router-link>
            <a v-else href="#our-menu">Our Menu</a>
            <br />
            <router-link :to="{ name: 'home' }" v-if="$route.path !== '/'">
              Our Offers
            </router-link>
            <a v-else href="#our-offers">Our Offers</a>
          </h3>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import axios from '../axios.js'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const sushiList = ref([])
const router = useRouter()

const fetchSushiList = async () => {
  try {
    const response = await axios.get('/api/v1/product')
    sushiList.value = response.data.data.map((sushi) => {
      return sushi
    })
  } catch (error) {
    if (error.response.status) {
      toast.error(error.response.data.msg, {
        autoClose: 1000
      })
    }
  }
}

const openNewTab = () => {
  const routeData = router.resolve({ path: '/checkout' })
  window.open(routeData.href, '_blank')
}

onMounted(fetchSushiList)
</script>
