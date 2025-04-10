<template>
  <div class="container">
    <div class="content">
      <h1 class="title">Hallo! Butuh Izin Hari Ini? Ajukan Dengan Mudah!!</h1>
      <img src="@/assets/img/siswa.jpeg" alt="Kelas Sekolah" class="class-image" />
      <button class="next-button" @click="goToLogin">Next</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "PermissionRequest",
  methods: {
    goToLogin() {
      this.$router.push('/login');
    }
  }
};
</script>
  
<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #d5b5f3;
  
}

.content {
  text-align: center;
  position: relative;
}

.title {
  font-size: 1.8rem;
  font-weight: bold;
  color: #4f2e1d;
  margin-bottom: 10px; 
  margin-top: 1px; 
  padding-top: 10px; 
}

.class-image {
  width: 100%;
  max-width: 2000px;
  height: auto;
  border-radius: 8px;
  height: 600px;
}

.next-button {
  position: absolute;
  bottom: 10px;
  right: 20px;
  background-color: white;
  border: 1px solid #ccc;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
}

.next-button:hover {
  background-color: #f0f0f0;
}
</style>