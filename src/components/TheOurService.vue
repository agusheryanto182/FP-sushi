<template>
  <section id="our-offers">
    <div class="section-header text-center">
      <h1>
        <strong> Our Service </strong>
      </h1>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-lg-4 col-md-6" v-for="(service, index) in services" :key="index">
          <div class="offer-item">
            <img :src="service.imageUrl" class="img-fluid" :alt="'Image ' + (index + 1)" />
            <b>{{ service.title }}</b>
            <h4>{{ service.description }}</h4>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from '../axios.js'

export default {
  setup() {
    const services = ref([])
    const baseUrl = axios.defaults.baseURL

    const fetchServices = async () => {
      try {
        const response = await axios.get('/api/v1/our-services')
        services.value = response.data.data.map((service) => {
          service.imageUrl = `${baseUrl}/${service.imageUrl}`
          return service
        })
      } catch (error) {
        console.error('Error fetching our services:', error)
      }
    }

    onMounted(() => {
      fetchServices()
    })

    return {
      services
    }
  }
}
</script>

<style scoped>
.offer-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 30px;
}

.offer-item img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

.offer-item b {
  font-size: 26px;
  color: #333;
  margin-top: 15px;
  display: block;
}

.offer-item h4 {
  font-size: 16px;
  line-height: 1.6;
  color: #666;
  margin-top: 10px;
}
</style>
