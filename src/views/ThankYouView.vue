<template>
  <section id="thank-you">
    <div class="container">
      <div class="thank-you-box">
        <div class="section-header text-center">
          <h1><strong>Thank You</strong></h1>
        </div>
        <div class="content">
          <h2>Your order has been successful, please check your email</h2>
          <p>
            We really appreciate that, please wait for the food to come to your place. May you
            always be healthy
          </p>
          <div class="social-icons">
            <a href="https://www.facebook.com" class="social-icon"
              ><i class="fab fa-facebook-f"></i
            ></a>
            <a href="https://twitter.com" class="social-icon"><i class="fab fa-twitter"></i></a>
            <a href="https://www.instagram.com" class="social-icon"
              ><i class="fab fa-instagram"></i
            ></a>
            <a href="https://www.linkedin.com" class="social-icon"
              ><i class="fab fa-linkedin-in"></i
            ></a>
          </div>
          <button class="cta-button" @click="goToHomePage">Go to Home</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ThankYouView',
  methods: {
    goToHomePage() {
      this.$router.push('/')
    }
  }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');

#thank-you {
  background: linear-gradient(135deg, #f9f9f9, #e3e3e3);
  padding: 50px 0;
  font-family: 'Poppins', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.thank-you-box {
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 600px;
  margin: auto;
}

.thank-you-box .section-header h1 {
  color: #ff6f61;
  font-size: 48px;
  margin-bottom: 20px;
  animation: fadeInDown 1s;
}

.thank-you-box .content h2 {
  color: #3f51b5;
  font-size: 28px;
  margin-top: 20px;
  animation: fadeInUp 1s;
}

.thank-you-box .content p {
  color: #616161;
  font-size: 18px;
  margin-top: 20px;
  animation: fadeInUp 1s;
}

.thank-you-box .cta-button {
  background-color: #ff6f61;
  color: white;
  border: none;
  padding: 15px 30px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 20px;
  animation: fadeIn 1s;
}

.thank-you-box .cta-button:hover {
  background-color: #ff3f2e;
}

.social-icons {
  margin-top: 20px;
  animation: fadeIn 1s;
}

.social-icon {
  margin: 0 10px;
  color: #ff6f61;
  font-size: 24px;
  transition: color 0.3s ease;
}

.social-icon:hover {
  color: #ff3f2e;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
