<template>
  <div class="container">
    <h1>Tambah Izin</h1>
    <form @submit.prevent="submitForm">
      <label>Nama:</label>
      <input type="text" v-model="nama" required />

      <label>Kelas:</label>
      <input type="text" v-model="kelas" required />

      <label>Tanggal:</label>
      <input type="date" v-model="tanggal" required />

      <button type="submit">Kirim</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nama: '',
      kelas: '',
      tanggal: ''
    };
  },
  methods: {
    submitForm() {
      console.log("Data izin:", this.nama, this.kelas, this.tanggal);
      this.$router.push('/notifikasi'); 
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  background: #f4f4f4;
  text-align: center;
  border-radius: 10px;
}

input {
  width: 100%;
  padding: 8px;
  margin: 10px 0;
}

button {
  background: green;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
}
</style>
