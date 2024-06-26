<template>
  <section
    v-for="task in taskList"
    :key="task.id"
    :id="getDeveloperName(task.developer)"
    class="agus"
  >
    <h2>
      {{ getDeveloperName(task.developer) }}
      <strong></strong>
    </h2>

    <div class="baris">
      <div class="tugas-img">
        <img :src="task.imageUrl" alt="pap tugas" />
      </div>
      <div class="tugas">
        <div class="box-contents">
          <h3>{{ task.title }}</h3>
          <p>
            {{ task.description }}
          </p>
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
const taskList = ref([])
const teamList = ref([])

const fetchTaskList = async () => {
  try {
    const response = await Api.get(`${apiEndpoint}/task`)

    taskList.value = response.data.data.map((task) => {
      task.id = task._id
      task.imageUrl = `${baseURL}/${task.imageUrl}`
      return task
    })

    const responseOurTeam = await Api.get(`${apiEndpoint}/our-team`)

    teamList.value = responseOurTeam.data.data.map((member) => {
      member.id = member._id
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

const getDeveloperName = (developerId) => {
  const developer = teamList.value.find((dev) => dev.id === developerId)
  return developer ? developer.name : 'Unknown Developer'
}

onMounted(fetchTaskList)
</script>
