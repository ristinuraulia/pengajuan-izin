<template>
  <div class="container">
    <div class="description">
      Halaman ini digunakan untuk menambahkan data izin siswa secara manual.
      Silakan isi data siswa yang akan ditambahkan.
    </div>

    <form class="form">
      <div class="form-group">
        <label>Nama Lengkap Siswa</label>
        <select v-model="form.nama">
          <option value="" disabled>Pilih Nama</option>
          <option v-for="siswa in siswaList" :key="siswa" :value="siswa">{{ siswa }}</option>
        </select>
      </div>

      <div class="form-group">
        <label>Kelas</label>
        <select v-model="form.kelas">
          <option value="" disabled>Pilih Kelas</option>
          <option v-for="kelas in kelasList" :key="kelas" :value="kelas">{{ kelas }}</option>
        </select>
      </div>

      <div class="form-group">
        <label>Tanggal</label>
        <input type="date" v-model="form.tanggal" />
      </div>

      <div class="form-group">
        <label>Alasan</label>
        <select v-model="form.alasan">
          <option value="" disabled>Pilih Alasan</option>
          <option v-for="alasan in alasanList" :key="alasan" :value="alasan">{{ alasan }}</option>
        </select>
      </div>

      <div class="form-group">
        <label>Keterangan</label>
        <input type="text" v-model="form.keterangan" placeholder="Tulis keterangan..." />
        <input type="file" @change="uploadFoto" />
      </div>

      <div v-if="form.foto" class="preview">
        <img :src="form.foto" alt="Preview Foto" />
      </div>

      <div class="button-group">
        <button type="button" @click="kembali">Kembali</button>
        <button type="submit" @click.prevent="kirim">Kirim</button>
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
        foto: null,
      },
      siswaList: ["Agistina", "Melani Siti Nurhasanah", "Gilang Ardiansyah", "Erina Nazwa Salsabila"],
      kelasList: ["XII PPLG 4"],
      alasanList: ["Sakit", "Izin", "Lainnya"]
    };
  },
  methods: {
    uploadFoto(event) {
      const file = event.target.files[0];
      if (file) {
        this.form.foto = URL.createObjectURL(file);
      }
    },
    kembali() {
      this.$router.push("/laporan");
    },
    kirim() {
      if (!this.form.nama || !this.form.kelas || !this.form.tanggal || !this.form.alasan) {
        alert("Mohon lengkapi semua data.");
        return;
      }

      let izinSiswa = JSON.parse(localStorage.getItem("izinSiswa")) || [];
      izinSiswa.push({ ...this.form });
      localStorage.setItem("izinSiswa", JSON.stringify(izinSiswa));

      alert("Data berhasil ditambahkan!");
      this.resetForm();
    },
    resetForm() {
      this.form = {
        nama: "",
        kelas: "",
        tanggal: "",
        alasan: "",
        keterangan: "",
        foto: null,
      };
    }
  }
};
</script>
