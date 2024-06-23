<template>
  <div>
    <TheNavbar />

    <div class="flex">
      <!-- Sidebar -->
      <div>
        <TheSidebar />
      </div>

      <!-- Main Content -->
      <div class="w-full p-4">
        <h1 class="text-2xl font-bold mb-4">Task Management</h1>

        <!-- Add Task Form -->
        <form @submit.prevent="addTask" class="mb-4 p-4 bg-white shadow rounded-lg">
          <div class="mb-4">
            <label for="developer" class="block text-sm font-medium text-gray-700">Developer</label>
            <select
              v-model="newTask.developer"
              id="developer"
              class="mt-1 block w-full border p-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option v-for="developer in teamList" :key="developer.id" :value="developer.id">
                {{ developer.name }}
              </option>
            </select>
          </div>
          <div class="mb-4">
            <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
            <input
              v-model="newTask.title"
              type="text"
              id="title"
              placeholder="Title"
              class="mt-1 block w-full border p-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div class="mb-4">
            <label for="description" class="block text-sm font-medium text-gray-700"
              >Description</label
            >
            <input
              v-model="newTask.description"
              type="text"
              id="description"
              placeholder="Description"
              class="mt-1 block w-full border p-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div class="mb-4">
            <label for="image" class="block text-sm font-medium text-gray-700">Task Image</label>
            <input
              @change="onFileChange"
              type="file"
              id="image"
              accept="image/*"
              class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              required
            />
          </div>
          <button
            type="submit"
            class="bg-blue-500 text-white font-bold py-2 px-4 rounded-full shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add Task
          </button>
        </form>

        <!-- Task List -->
        <div class="mb-8">
          <div class="bg-white shadow overflow-hidden sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Developer
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Title
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Description
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Image
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="task in taskList" :key="task.id">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <template v-if="isEditing(task.id)">
                      <select
                        v-model="task.developer"
                        class="border p-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option
                          v-for="developer in teamList"
                          :key="developer.id"
                          :value="developer.id"
                        >
                          {{ developer.name }}
                        </option>
                      </select>
                    </template>
                    <template v-else>
                      {{ getDeveloperName(task.developer) }}
                    </template>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <input
                      v-model="task.title"
                      :readonly="!isEditing(task.id)"
                      class="border p-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <input
                      v-model="task.description"
                      :readonly="!isEditing(task.id)"
                      class="border p-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <img
                      :src="task.imageUrl"
                      alt="Member Image"
                      class="h-16 w-16 object-cover rounded-md"
                    />
                    <input
                      @change="onFileChangeUpdate($event, task)"
                      type="file"
                      accept="image/*"
                      :disabled="!isEditing(task.id)"
                      class="mt-2 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <template v-if="isEditing(task.id)">
                      <button
                        @click="updateTask(task)"
                        class="bg-green-500 text-white font-bold py-2 px-4 rounded-full shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mr-2"
                      >
                        Save
                      </button>
                    </template>
                    <button
                      @click="toggleEdit(task.id)"
                      class="bg-blue-500 text-white font-bold py-2 px-4 rounded-full shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-2"
                    >
                      {{ isEditing(task.id) ? 'Cancel' : 'Edit' }}
                    </button>
                    <button
                      @click="deleteTask(task.id)"
                      class="bg-red-500 text-white font-bold py-2 px-4 rounded-full shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from '../axios.js'
import TheNavbar from '../components/TheNavbar.vue'
import TheSidebar from '../components/TheSidebar.vue'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const baseURL = axios.defaults.baseURL

const apiEndpoint = '/api/v1'
const newTask = ref({ developer: '', title: '', description: '', imageUrl: '' })
const taskList = ref([])
const teamList = ref([])
const token = localStorage.getItem('token')
const editingTaskId = ref(null)

const fetchTaskList = async () => {
  try {
    const response = await axios.get(`${apiEndpoint}/task`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    taskList.value = response.data.data.map((task) => {
      task.id = task._id
      task.imageUrl = `${baseURL}/${task.imageUrl}`
      return task
    })

    const responseOurTeam = await axios.get(`${apiEndpoint}/our-team`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    teamList.value = responseOurTeam.data.data.map((member) => {
      member.id = member._id
      return member
    })

    // updateTaskListWithDeveloperNames()
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

const isEditing = (taskId) => {
  return editingTaskId.value === taskId
}

const toggleEdit = (taskId) => {
  if (editingTaskId.value === taskId) {
    editingTaskId.value = null
  } else {
    editingTaskId.value = taskId
  }
}

// const updateTaskListWithDeveloperNames = () => {
//   if (taskList.value.length > 0 && teamList.value.length > 0) {
//     taskList.value = taskList.value.map((task) => {
//       const developer = teamList.value.find((team) => team.id === task.developer)
//       if (developer) {
//         task.developer = developer.name
//       }
//       return task
//     })
//   }
// }

const addTask = async () => {
  const formData = new FormData()

  formData.append('developer', newTask.value.developer)
  formData.append('title', newTask.value.title)
  formData.append('description', newTask.value.description)
  formData.append('image', newTask.value.image)

  console.log('newtask')
  console.log(newTask)

  try {
    const response = await axios.post(`${apiEndpoint}/admin/task`, formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (response.status === 201) {
      toast.success('Task added successfully', {
        autoClose: 1000
      })

      await new Promise((resolve) => setTimeout(resolve, 1000))
      window.location.reload()
    }
  } catch (error) {
    if (error.response.status) {
      toast.error(error.response.data.msg, {
        autoClose: 1000
      })
    }
  }
}

// Functions for CRUD operations on team members
const updateTask = async (task) => {
  const formData = new FormData()

  formData.append('developer', task.developer)
  formData.append('title', task.title)
  formData.append('description', task.description)

  if (task.image) {
    formData.append('image', task.image)
  }

  try {
    const response = await axios.put(`${apiEndpoint}/admin/task/${task.id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (response.status === 200) {
      toast.success('Task updated successfully', {
        autoClose: 1000
      })

      await new Promise((resolve) => setTimeout(resolve, 2000))
      window.location.reload()
    }
  } catch (error) {
    if (error.response.status) {
      toast.error(error.response.data.msg, {
        autoClose: 1000
      })
      await new Promise((resolve) => setTimeout(resolve, 2000))
      window.location.reload()
    }
  }
}

const deleteTask = async (id) => {
  try {
    const response = await axios.delete(`${apiEndpoint}/admin/task/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    taskList.value = taskList.value.filter((task) => task.id !== id)
    if (response.status === 200) {
      toast.success('Task deleted successfully', {
        autoClose: 1000
      })
    }
  } catch (error) {
    if (error.response.status) {
      toast.error(error.response.data.msg, {
        autoClose: 1000
      })
    }
  }
}

const onFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    newTask.value.image = file
  }
}

const onFileChangeUpdate = (event, task) => {
  const file = event.target.files[0]
  if (file) {
    task.image = file
  }
}

onMounted(() => {
  fetchTaskList()
})
</script>
