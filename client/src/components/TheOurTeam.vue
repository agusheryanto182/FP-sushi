<template>
  <section class="team">
    <div class="center">
      <h1><strong>Our Team</strong></h1>
    </div>

    <div class="team-content">
      <div class="box" v-for="member in teamList" :key="member.id">
        <a :href="`#${member.name}`"><img :src="member.imageUrl" /></a>
        <h3>{{ member.name }}</h3>
        <h5>{{ member.nim }}</h5>
        <div class="icons">
          <a :href="`${member.githubUrl}`"><i class="ri-github-fill"></i></a>
          <a :href="`${member.instagramUrl}`"><i class="ri-instagram-line"></i></a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Api from '../axios.js'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const apiEndpoint = '/api/v1'
const baseURL = Api.defaults.baseURL
const teamList = ref([])

const fetchTeamList = async () => {
  try {
    const response = await Api.get(`${apiEndpoint}/our-team`)

    teamList.value = response.data.data.map((member) => {
      member.id = member._id
      member.imageUrl = `${baseURL}/${member.imageUrl}`
      return member
    })
  } catch (error) {
    if (error.response.status) {
      toast.error(error.response.data.msg, {
        autoClose: 1000
      })
    }
  }
}

onMounted(fetchTeamList)
</script>
