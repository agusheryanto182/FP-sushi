<template>
  <section id="home">
    <div class="container">
      <div class="row" id="gallery">
        <div class="col-lg-100 m-auto">
          <div class="book-table-img-slider swiper-container" id="icon">
            <div class="swiper-wrapper">
              <a
                v-for="image in images"
                :key="image.id"
                :href="image.url"
                data-fancybox="table-slider"
                class="book-table-img back-img swiper-slide"
                :style="{ backgroundImage: `url(${image.url})` }"
              ></a>
            </div>
          </div>
          <div class="book-table-now">
            <a href="/checkout" @click.prevent="openNewTab" class="book-table-link">Buy Now</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="our-offers">
    <div class="section-header text-center">
      <h2>Our Offers</h2>
    </div>
    <div class="container">
      <div class="row">
        <div v-for="offer in offerList" :key="offer.id" class="col-lg-4 col-md-6">
          <div class="offer-item">
            <img :src="offer.imageUrl" class="img-fluid" :alt="offer.title" />
            <h3>{{ offer.title }}</h3>
            <p>{{ offer.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="our-menu">
    <div class="section-header text-center">
      <h2>Our Menu</h2>
    </div>
    <div class="container">
      <div class="row">
        <div v-for="item in menuItems" :key="item.id" class="col-lg-4 col-md-6">
          <div class="menu-item">
            <a @click.prevent="openNewTab" href="/checkout">
              <img :src="item.imageUrl" class="img-fluid" :alt="item.name" />
            </a>
            <h3>{{ item.name }}</h3>
            <h3>Rp {{ item.price }}</h3>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted, nextTick } from 'vue'
import axios from '../axios.js'

export default {
  setup() {
    const menuItems = ref([])
    const offerList = ref([])
    const images = ref([])
    const token = localStorage.getItem('token')
    const baseUrl = axios.defaults.baseURL

    const fetchMenuItems = async () => {
      try {
        const response = await axios.get('/api/v1/product', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        menuItems.value = response.data.data.map((item) => {
          item.imageUrl = `${baseUrl}/${item.imageUrl}`
          return item
        })
      } catch (error) {
        console.error('Error fetching menu items:', error)
      }
    }

    const fetchOfferList = async () => {
      try {
        const response = await axios.get('/api/v1/offer', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        offerList.value = response.data.data.map((offer) => {
          offer.imageUrl = `${baseUrl}/${offer.imageUrl}`
          return offer
        })
      } catch (error) {
        console.error('Error fetching offer list:', error)
      }
    }

    const fetchHeroImages = async () => {
      try {
        const response = await axios.get('/api/v1/hero', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        images.value = response.data.data.map((image) => {
          image.url = `${baseUrl}/${image.imageUrl}`
          return image
        })
        nextTick(() => {
          // Inisialisasi Swiper dengan jQuery
          // eslint-disable-next-line no-unused-vars, no-undef
          /* eslint-disable no-undef */
          /* eslint-disable no-unused-vars */
          $(document).ready(function ($) {
            var book_table = new Swiper('.book-table-img-slider', {
              slidesPerView: 1,
              spaceBetween: 20,
              loop: true,
              autoplay: {
                delay: 2000,
                disableOnInteraction: false
              },
              speed: 2000,
              effect: 'coverflow',
              coverflowEffect: {
                rotate: 2,
                stretch: 2,
                depth: 100,
                modifier: 5,
                slideShadows: true
              },
              loopAdditionSlides: true
            })
          })
        })
      } catch (error) {
        console.error('Error fetching hero images:', error)
      }
    }

    onMounted(() => {
      fetchMenuItems()
      fetchOfferList()
      fetchHeroImages()
    })

    const openNewTab = () => {
      window.open('/checkout', '_blank')
    }

    return {
      menuItems,
      offerList,
      images,
      openNewTab
    }
  }
}
</script>
