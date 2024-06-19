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
            <li><a @click.prevent="openNewTab" href="/checkout">Sushi</a></li>
            <li><a @click.prevent="openNewTab" href="/checkout">Sushi Rolls</a></li>
            <li><a @click.prevent="openNewTab" href="/checkout">Sushi With Karaage</a></li>
            <li><a @click.prevent="openNewTab" href="/checkout">Strawberry Mix</a></li>
            <li><a @click.prevent="openNewTab" href="/checkout">Salmon V5</a></li>
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

<script>
export default {
  methods: {
    openNewTab() {
      const routeData = this.$router.resolve({ path: '/checkout' })
      window.open(routeData.href, '_blank')
    }
  }
}
</script>
