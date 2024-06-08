<template>
  <header class="site-header">
    <div class="container">
      <div class="row">
        <div class="col-lg-2">
          <div class="header-logo">
            <router-link to="/" @click="reloadHome">
              <img src="@/assets/images/logo.png" width="100%" height="50" alt="logo" />
            </router-link>
          </div>
        </div>
        <div class="col-lg-10">
          <div class="main-navigation">
            <nav class="header-menu">
              <ul class="menu food-nav-menu">
                <li>
                  <router-link to="/" active-class="active-menu" @click="reloadHome"
                    >Home</router-link
                  >
                </li>
                <li>
                  <router-link to="/about" active-class="active-menu">About</router-link>
                </li>
                <li>
                  <router-link to="/our-team" active-class="active-menu">Our Team</router-link>
                </li>
                <li>
                  <router-link to="/our-service" active-class="active-menu"
                    >Our Service</router-link
                  >
                </li>
                <li>
                  <router-link to="/contact" active-class="active-menu">Contact</router-link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    reloadHome() {
      // Check if the current path is '/'
      if (this.$route.path === '/') {
        window.location.reload()
      }
    }
  }
}
</script>
