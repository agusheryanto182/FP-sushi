<template>
  <section id="home">
    <div class="sec-wp">
      <div class="container">
        <div class="row" id="gallery">
          <div class="col-lg-10 m-auto">
            <div class="book-table-img-slider" id="icon">
              <div class="swiper-wrapper">
                <a
                  href="/src/assets/images/bt1.jpg"
                  data-fancybox="table-slider"
                  class="book-table-img back-img swiper-slide"
                  style="background-image: url(/src/assets/images/bt1.jpg)"
                ></a>
                <a
                  href="/src/assets/images/bt2.jpg"
                  data-fancybox="table-slider"
                  class="book-table-img back-img swiper-slide"
                  style="background-image: url(/src/assets/images/bt2.jpg)"
                ></a>
                <a
                  href="/src/assets/images/bt3.jpg"
                  data-fancybox="table-slider"
                  class="book-table-img back-img swiper-slide"
                  style="background-image: url(/src/assets/images/bt3.jpg)"
                ></a>
                <a
                  href="/src/assets/images/bt4.jpg"
                  data-fancybox="table-slider"
                  class="book-table-img back-img swiper-slide"
                  style="background-image: url(/src/assets/images/bt4.jpg)"
                ></a>
                <a
                  href="/src/assets/images/bt1.jpg"
                  data-fancybox="table-slider"
                  class="book-table-img back-img swiper-slide"
                  style="background-image: url(/src/assets/images/bt5.jpg)"
                ></a>
                <a
                  href="/src/assets/images/bt2.jpg"
                  data-fancybox="table-slider"
                  class="book-table-img back-img swiper-slide"
                  style="background-image: url(/src/assets/images/bt6.jpg)"
                ></a>
                <a
                  href="/src/assets/images/bt3.jpg"
                  data-fancybox="table-slider"
                  class="book-table-img back-img swiper-slide"
                  style="background-image: url(/src/assets/images/bt7.jpg)"
                ></a>
                <a
                  href="/src/assets/images/bt4.jpg"
                  data-fancybox="table-slider"
                  class="book-table-img back-img swiper-slide"
                  style="background-image: url(/src/assets/images/bt8.jpg)"
                ></a>
              </div>
            </div>
            <div class="book-table-now">
              <a @click.prevent="openNewTab" class="book-table-link">Buy Now</a>
            </div>
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
        <div class="col-lg-4 col-md-6">
          <div class="offer-item">
            <img src="/src/assets/images/off2.jpeg" class="img-fluid" alt="" />
            <h3>Sushi Special Menu?</h3>
            <p>Yes it is.</p>
          </div>
        </div>
        <div class="col-lg-4 col-md-6">
          <div class="offer-item">
            <img src="/src/assets/images/off1.jpeg" class="img-fluid" alt="" />
            <h3>Sushi Dinner</h3>
            <p>You can also dinner with sushi with discounts.</p>
          </div>
        </div>
        <div class="col-lg-4 col-md-6">
          <div class="offer-item">
            <img src="/src/assets/images/off3.jpeg" class="img-fluid" alt="" />
            <h3>Every Day Is Sushi</h3>
            <p>Nice Choice.</p>
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
import { ref, onMounted } from 'vue'
import { getMenuItems } from '../services/menuService'

export default {
  setup() {
    const menuItems = ref([])

    onMounted(async () => {
      try {
        menuItems.value = await getMenuItems()
      } catch (error) {
        console.error('Error fetching menu items:', error)
      }
    })

    const openNewTab = () => {
      window.open('/checkout', '_blank')
    }

    return {
      menuItems,
      openNewTab
    }
  }
}
</script>
