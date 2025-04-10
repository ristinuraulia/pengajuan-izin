<template>
  <div class="container">
    <h1 class="title">Notifikasi Izin Siswa</h1>
    <button @click="goToTambah">Tambah Izin</button>

    <table class="izin-table">
      <thead>
        <tr>
          <th>No</th>
          <th>Nama</th>
          <th>Kelas</th>
          <th>Tanggal</th>
          <th>Alasan</th>
          <th>Keperluan</th>
          <th>Foto</th>
          <th colspan="2">Notifikasi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(izin, index) in izinList" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ izin.nama }}</td>
          <td>{{ izin.kelas }}</td>
          <td>{{ izin.tanggal }}</td>
          <td>{{ izin.alasan }}</td>
          <td>{{ izin.keterangan }}</td>
          <td>
            <img v-if="izin.foto" :src="izin.foto" alt="Foto Izin" class="izin-foto">
            <span v-else>Tidak ada foto</span>
          </td>
          <td><button class="accept-btn" @click="terimaIzin(index)">Terima</button></td>
          <td><button class="reject-btn" @click="tolakIzin(index)">Tolak</button></td>
        </tr>
      </tbody>
    </table>

    <button class="back-btn" @click="goBack">Kembali</button>
  </div>
</template>

<script>
export default {
  name: "NotifikasiIzinSiswa",
  data() {
    return {
      izinList: JSON.parse(localStorage.getItem("izinSiswa")) || []
    };
  },
    methods: {
      goBack() {
      this.$router.push("/home"); // Ganti '/home' sesuai rute dashboard wali kelas jika berbeda
    },

    goToTambah() {
      this.$router.push("/notifikasi/tambah");
    },
    terimaIzin(index) {
      this.izinList[index].status = "Diterima";
      this.izinList[index].deskripsi = "Izin diterima oleh wali kelas";
      this.updateData();
    },
    tolakIzin(index) {
      this.izinList[index].status = "Ditolak";
      this.izinList[index].deskripsi = "Izin ditolak oleh wali kelas";
      this.updateData();
    },
    updateData() {
      localStorage.setItem("izinSiswa", JSON.stringify(this.izinList));
      this.$emit("updateLaporan"); // Untuk memberitahu komponen induk
    }
  }
};
</script>

<style scoped>
.container {
  width: 90%;
  margin: 20px auto;
  padding: 20px;
  background-color: #fce4ec;
  border-radius: 10px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 15px;
  text-align: center;
}

.izin-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  background: white;
}

.izin-table th,
.izin-table td {
  border: 1px solid #f06292;
  padding: 10px;
  text-align: center;
}

.izin-foto {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 5px;
}

.accept-btn,
.reject-btn,
.back-btn {
  padding: 6px 12px;
  margin: 4px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.accept-btn {
  background-color: #81c784;
  color: white;
}

.reject-btn {
  background-color: #e57373;
  color: white;
}

.back-btn {
  background-color: #90caf9;
  color: white;
}
</style>
