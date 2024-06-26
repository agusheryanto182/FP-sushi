<template>
  <section class="contact">
    <div class="content">
      <h2>Contact us</h2>
      <p>
        Jika ada yang ingin Anda sampaikan kepada Kami kamu bisa mengirimkan Kritik dan Saran
        melalui kolom yang ada
      </p>
    </div>
    <div class="container">
      <div class="contactInfo">
        <div class="box">
          <div class="text">
            <h3>Address</h3>
            <p>
              <a
                href="https://www.google.com/maps/place/Universitas+Amikom+Yogyakarta/@-7.7599044,110.4064691,17z/data=!3m1!4b1!4m5!3m4!1s0x2e7a599bd3bdc4ef:0x6f1714b0c4544586!8m2!3d-7.7599044!4d110.4086578"
                target="_blank"
              >
                {{ contact.address }}
              </a>
            </p>
          </div>
        </div>
        <div class="box">
          <div class="text">
            <h3>Phone</h3>
            <p>
              <a :href="`https://wa.me/${contact.phone}`">{{ contact.phone }}</a>
            </p>
          </div>
        </div>
        <div class="box">
          <div class="text">
            <h3>Email</h3>
            <p>
              <a :href="`mailto:${contact.email}`">{{ contact.email }}</a>
            </p>
          </div>
        </div>
      </div>
      <div class="map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.2818403508622!2d110.40647117501662!3d-7.759904892259175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a599bd3bdc4ef%3A0x6f1714b0c4544586!2sUniversity%20of%20Amikom%20Yogyakarta!5e0!3m2!1sen!2sid!4v1715814164484!5m2!1sen!2sid"
          width="100%"
          height="350"
          style="border: 0"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>

    <div class="contactForm">
      <form @submit.prevent="sendEmail">
        <h2>Send Message</h2>
        <div class="inputBox">
          <input v-model="emailData.name" type="text" name="name" required="required" />
          <span>Full Name</span>
        </div>
        <div class="inputBox">
          <input v-model="emailData.email" type="email" name="email" required="required" />
          <span>Email</span>
        </div>
        <div class="inputBox">
          <textarea v-model="emailData.message" name="message" required="required"></textarea>
          <span>Type your message..</span>
        </div>
        <div class="inputBox">
          <input type="submit" value="Send" />
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>
import Api from '../axios'
import { ref, onMounted } from 'vue'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const apiEndpoint = '/api/v1'
const contact = ref({ address: '', email: '', phone: '' })
const emailData = ref({ name: '', email: '', message: '' })

const fetchContact = async () => {
  try {
    const response = await Api.get(`${apiEndpoint}/contact`)

    contact.value.id = response.data.data._id
    contact.value.address = response.data.data.address
    contact.value.email = response.data.data.email
    contact.value.phone = response.data.data.phone
  } catch (error) {
    console.error('Error fetching contact list:', error)
  }
}

const sendEmail = async () => {
  try {
    const response = await Api.post(`${apiEndpoint}/send-email`, emailData.value)
    if (response.status === 201) {
      toast.success('Email sent successfully!', {
        autoClose: 1000
      })
      emailData.value = { name: '', email: '', message: '' }
    }
  } catch (error) {
    toast.error('Failed to send email', {
      autoClose: 1000
    })
    console.error('Error sending email:', error)
  }
}

onMounted(fetchContact)
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800;900&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

.contact {
  position: relative;
  min-height: 100vh;
  padding: 50px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: url(/src/assets/images/sushi.jpg);
  background-size: cover;
}

.contact .content {
  max-width: 800px;
  text-align: center;
  margin-bottom: 20px;
}

.contact .content h2 {
  font-size: 36px;
  font-weight: 500;
  padding-top: 70px;
  color: #fff;
}

.contact .content p {
  font-weight: 500;
  color: #fff;
  padding-bottom: 50px;
}

.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
}

.contactInfo {
  width: 45%;
  display: flex;
  flex-direction: column;
}

.contactInfo .box {
  position: relative;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.contactInfo .box .text {
  margin-left: 20px;
  font-size: 16px;
  color: #fff;
  font-weight: 300;
}

.contactInfo .box .text h3 {
  font-weight: 500;
  color: orange;
}

.map {
  width: 45%;
  margin-left: auto;
}

.contactForm {
  width: 100%;
  max-width: 600px;
  padding: 40px;
  background: #fff;
  margin-top: 20px;
}

.contactForm h2 {
  font-size: 30px;
  color: #333;
  font-weight: 500;
}

.contactForm .inputBox {
  position: relative;
  width: 100%;
  margin-top: 40px;
}

.contactForm .inputBox input,
.contactForm .inputBox textarea {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-bottom: 2px solid #333;
  outline: none;
  resize: none;
  background: none;
}

.contactForm .inputBox span {
  position: absolute;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  pointer-events: none;
  transition: 0.5s;
  color: #666;
}

.contactForm .inputBox input:focus ~ span,
.contactForm .inputBox input:valid ~ span,
.contactForm .inputBox textarea:focus ~ span,
.contactForm .inputBox textarea:valid ~ span {
  color: #e91e63;
  font-size: 12px;
  transform: translateY(-20px);
}

.contactForm .inputBox input[type='submit'] {
  width: 100px;
  background: orange;
  color: #fff;
  border: none;
  cursor: pointer;
  padding: 10px;
  font-size: 18px;
}
</style>
