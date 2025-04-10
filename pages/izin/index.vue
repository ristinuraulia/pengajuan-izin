<template>
  <div class="container">
    <h2>Form Izin Siswa</h2>

    <form class="form" @submit.prevent="kirim">
      <div class="form-group">
        <label>Nama Lengkap</label>
        <input type="text" v-model="form.nama" readonly />
      </div>

      <div class="form-group">
        <label>Kelas</label>
        <input type="text" v-model="form.kelas" readonly />
      </div>

      <div class="form-group">
        <label>Tanggal</label>
        <input type="date" v-model="form.tanggal" required />
      </div>

      <div class="form-group">
        <label>Alasan Tidak Masuk</label>
        <select v-model="form.alasan" required>
          <option value="" disabled>Pilih Alasan</option>
          <option v-for="alasan in alasanList" :key="alasan" :value="alasan">{{ alasan }}</option>
        </select>
      </div>

      <div class="form-group">
        <label>Keterangan</label>
        <input type="text" v-model="form.keterangan" placeholder="Opsional..." />
      </div>

      <div class="form-group">
        <label>Bukti Foto (opsional)</label>
        <input type="file" @change="handleFileUpload" />
      </div>

      <div v-if="form.foto" class="preview">
        <img :src="form.foto" alt="Preview Foto" width="200" />
      </div>

      <div class="button-group">
        <button type="submit">Kirim</button>
        <button type="button" @click="gohome">Kembali</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        nama: "",
        kelas: "",
        tanggal: "",
        alasan: "",
        keterangan: "",
        foto: ""
      },
      alasanList: ["Sakit", "Izin", "Lainnya"]
    };
  },
  mounted() {
    const user = JSON.parse(localStorage.getItem("userLogin"));
    if (!user || user.role !== "siswa") {
      this.$router.push("/login");
    } else {
      this.form.nama = user.nama;
      this.form.kelas = user.kelas;
    }
  },
  methods: {
    kirim() {
      if (!this.form.tanggal || !this.form.alasan) {
        alert("Mohon lengkapi data wajib!");
        return;
      }

      const izinList = JSON.parse(localStorage.getItem("izinSiswa")) || [];
      izinList.push({ ...this.form });
      localStorage.setItem("izinSiswa", JSON.stringify(izinList));

      alert("Izin berhasil dikirim!");
      this.resetForm();
    },
    resetForm() {
      this.form.nama ="";
      this.form.kelas = "";
      this.form.tanggal = "";
      this.form.alasan = "";
      this.form.keterangan = "";
      this.form.foto = "";
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.form.foto = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    gohome() {
      this.$router.push("/home"); // ganti sesuai nama rute halaman siswa setelah login
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 500px;
  margin: auto;
  padding: 30px;
  background: #f9f9f9;
  border-radius: 10px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

input, select {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.button-group {
  display: flex;
  justify-content: space-between;
}

button {
  padding: 10px 20px;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background: #388e3c;
}

.preview {
  margin-top: 10px;
  text-align: center;
}
</style>