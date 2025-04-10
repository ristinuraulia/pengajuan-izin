<template>
  <div class="container">
    <div class="row atas">
      <nuxt-link to="/izin" class="card bg-izin">
        <span class="card-text">Pengajuan Izin</span>
      </nuxt-link>

      <nuxt-link to="/notifikasi" class="card bg-status">
        <span class="card-text">Proses Izin Siswa</span>
      </nuxt-link>
    </div>

    <div class="row tengah">
      <nuxt-link to="/laporan" class="card bg-laporan">
        <span class="card-text">Rekap Izin Siswa</span>
      </nuxt-link>
    </div>
    <router-link v-if="role === 'siswa'" to="/izin">Pengajuan Izin</router-link>
    <router-link v-if="role === 'sekertaris'" to="/rekap">Rekap Izin Siswa</router-link>
    <router-link v-if="role === 'wali_kelas'" to="/dashboard">Proses Izin Siswa</router-link>
  </div>
</template>


<script>
export default {
  data() {
    return {
      role: ''
    }
  },
  mounted() {
  const user = JSON.parse(localStorage.getItem('userLogin'));
  if (user) {
    this.role = user.role;
  } else {
    // Kalau belum login, redirect ke login
    this.$router.push('/login');
  }
}
}
</script>

<style scoped>

html, body {
  height: 100vh;
  margin: 0;
  overflow: hidden;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #fec4cb;
  padding: 20px;
}

.row {
  display: flex;
  justify-content: center;
  gap: 50px;
}

.row.atas {
  margin-bottom: 30px;
}

.card {
  width: 600px;
  height: 250px;
  background-size: cover;
  background-position: center;
  border-radius: 15px;
  box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.3);
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  text-decoration: none;
  padding: 20px;
}

.card-text {
  color: rgb(122, 0, 0);
  font-size: 1.5rem;
  font-weight: bold;
}

.bg-izin {
  background-image: url('../assets/img/pengajuan.png');
}

.bg-status {
  background-image: url('../assets/img/proses.png');
}

.bg-laporan {
  background-image: url('../assets/img/laporan.png');
  width: 600px; 
  height: 250px;
}

@media (max-width: 768px) {
  .row {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
  .card {
    width: 90%;
  }
}
</style>