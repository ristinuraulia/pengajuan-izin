<template>
    <div class="login-page">
      <div class="login-container">
        <h2 class="login-title">Login</h2>
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="email" required />
          </div>
          <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" required />
          </div>
          <button type="submit">Login</button>
        </form>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Login",
    data() {
      return {
        email: "",
        password: "",
        errorMessage: null,
      };
    },
    methods: {
      handleLogin() {
        if (this.email === "admin@smkn4.com" && this.password === "admin12345") {
          alert("Login berhasil!");
          this.$router.push("/home"); // Ganti '/home' dengan halaman utama setelah login
        } else {
          this.errorMessage = "Email atau password salah!";
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Warna background pink muda */
  .login-page {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #ffdde1; /* Pink muda */
  }
  
  /* Kotak login */
  .login-container {
    background-color: #ffffff;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 350px;
    text-align: center;
    border: 2px solid #ff8fab; /* Border pink */
  }
  
  /* Judul login */
  .login-title {
    text-align: center;
    margin-bottom: 1rem;
    color: #d63384; /* Warna pink lebih tua */
  }
  
  /* Form input */
  .form-group {
    margin-bottom: 1rem;
    text-align: left;
  }
  
  label {
    font-weight: bold;
    color: #d63384;
  }
  
  input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ff8fab;
    border-radius: 5px;
    outline: none;
  }
  
  /* Tombol login */
  button {
    width: 100%;
    padding: 10px;
    background-color: #ff8fab;
    border: none;
    border-radius: 5px;
    color: white;
    font-weight: bold;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #d63384;
  }
  
  /* Pesan error */
  .error-message {
    color: red;
    margin-top: 10px;
  }
  </style>