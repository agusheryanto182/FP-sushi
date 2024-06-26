<template>
  <!-- about section start-->
  <section id="hero" class="hero" v-if="aboutList.length > 0">
    <main class="content">
      <h1>{{ aboutList[0]?.title }}</h1>
      <p>{{ aboutList[0]?.description }}</p>
    </main>
  </section>
  <!-- about section end-->

  <section id="mission" class="mission" v-if="aboutList.length > 1">
    <div class="row">
      <div class="mission-img">
        <img :src="aboutList[1]?.imageUrl" alt="our mission" />
      </div>
      <div class="content">
        <h3>{{ aboutList[1]?.title }}</h3>
        <p>{{ aboutList[1]?.description }}</p>
      </div>
    </div>
  </section>

  <section id="started" class="started" v-if="aboutList.length > 2">
    <div class="content">
      <h1>{{ aboutList[2]?.title }}</h1>
      <p>
        {{ aboutList[2]?.description }}
      </p>
    </div>
    <div class="container">
      <img :src="aboutList[2]?.imageUrl" alt="started" class="float-right" />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Api from '../axios.js'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const baseURL = Api.defaults.baseURL

const apiEndpoint = '/api/v1'

const aboutList = ref([])

const fetchAboutList = async () => {
  try {
    const response = await Api.get(`${apiEndpoint}/about`)

    aboutList.value = response.data.data.map((about) => {
      about.id = about._id
      about.imageUrl = `${baseURL}/${about.imageUrl}`
      return about
    })
  } catch (error) {
    if (error.response.status) {
      toast.error(error.response.data.msg, {
        autoClose: 1000
      })
    }
  }
}

onMounted(fetchAboutList)
</script>
