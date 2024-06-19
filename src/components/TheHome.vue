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
        <div class="col-lg-4 col-md-6">
          <div class="menu-item">
            <a @click.prevent="openNewTab" href="/checkout">
              <img src="/src/assets/images/bt1.jpg" class="img-fluid" alt="" />
            </a>
            <h3>Sushi</h3>
            <h3>Rp 49.000.00</h3>
          </div>
        </div>
        <div class="col-lg-4 col-md-6">
          <div class="menu-item">
            <a @click.prevent="openNewTab" href="/checkout">
              <img src="/src/assets/images/bt2.jpg" class="img-fluid" alt="" />
            </a>
            <h3>Strawberry Mix</h3>
            <h3>Rp 29.000.00</h3>
          </div>
        </div>
        <div class="col-lg-4 col-md-6">
          <div class="menu-item">
            <a @click.prevent="openNewTab" href="/checkout">
              <img src="/src/assets/images/bt3.jpg" class="img-fluid" alt="" />
            </a>
            <h3>Sushi With Kaarage</h3>
            <h3>Rp 49.000.00</h3>
          </div>
        </div>
        <div class="col-lg-4 col-md-6">
          <div class="menu-item">
            <a @click.prevent="openNewTab" href="/checkout">
              <img src="/src/assets/images/bt4.jpg" class="img-fluid" alt="" />
            </a>
            <h3>Fruit Mix</h3>
            <h3>Rp 29.000.00</h3>
          </div>
        </div>
        <div class="col-lg-4 col-md-6">
          <div class="menu-item">
            <a @click.prevent="openNewTab" href="/checkout">
              <img src="/src/assets/images/bt5.jpg" class="img-fluid" alt="" />
            </a>
            <h3>Sushi Roll</h3>
            <h3>Rp 49.000.00</h3>
          </div>
        </div>
        <div class="col-lg-4 col-md-6">
          <div class="menu-item">
            <a @click.prevent="openNewTab" href="/checkout">
              <img src="/src/assets/images/bt6.jpg" class="img-fluid" alt="" />
            </a>
            <h3>Salmon V5</h3>
            <h3>Rp 49.000.00</h3>
          </div>
        </div>
      </div>
    </div>
  </section>
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
