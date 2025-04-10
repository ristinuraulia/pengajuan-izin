<template>
  <div class="container">
    <h1 class="title">Proses Izin Siswa</h1>
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
          <th>Status</th>
          <th>Deskripsi</th>
          <th>Aksi</th> 
        </tr>
      </thead>
      <tbody>
        <tr v-for="(izin, index) in izinSiswa" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ izin.nama }}</td>
          <td>{{ izin.kelas }}</td>
          <td>{{ izin.tanggal }}</td>
          <td>{{ izin.alasan }}</td>
          <td>{{ izin.keterangan }}</td>
          <td>
            <img 
              v-if="izin.foto" 
              :src="izin.foto" 
              alt="Foto Izin" 
              class="izin-foto"
              @click="showImage(izin.foto)"
            />
            <span v-else>Tidak ada foto</span>
          </td>
          <td>
            <span 
              v-if="izin.status" 
              :class="izin.status === 'Diterima' ? 'accepted' : 'rejected'"
            >
              {{ izin.status }}
            </span>
            <span v-else>Menunggu</span>
          </td>
          <td>
            <textarea 
             v-model="izin.deskripsi" 
              class="deskripsi-input"
            ></textarea>

          </td>
          <td>
            <button class="accept-btn" @click="updateStatus(index, 'Diterima')">
              Terima
            </button>
            <button class="reject-btn" @click="updateStatus(index, 'Ditolak')">
              Tolak
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <button class="back-btn" @click="$router.replace('/home')">Kembali</button>

    <div v-if="modalImage" class="modal" @click="modalImage = null">
      <img :src="modalImage" class="modal-content" />
    </div>
    <Notifikasi @updateLaporan="loadRekapData" />

  </div>
</template>
<script>
export default {
  data() {
    return {
      izinSiswa: [],
      modalImage: null,
    };
  },
  mounted() {
    const user = JSON.parse(localStorage.getItem("userLogin"));
    if (!user) {
      this.$router.push("/login"); // Redirect kalau belum login
    } else {
      this.loadIzinData(); // Load data kalau sudah login
    }
  },
  methods: {
    loadIzinData() {
      let data = JSON.parse(localStorage.getItem("izinSiswa")) || [];
      // Tampilkan hanya yang belum diproses
      this.izinSiswa = data.filter(item => !item.status);
    },
    showImage(image) {
      this.modalImage = image;
    },
    updateStatus(index, status) {
      // Ambil data izin yang sedang diperbarui
      const izin = this.izinSiswa[index];
      izin.status = status;

      // Ambil semua data izin dari localStorage
      let allData = JSON.parse(localStorage.getItem("izinSiswa")) || [];

      // Update data izin di localStorage berdasarkan identitas unik
      const updatedData = allData.map(item => {
        if (
          item.nama === izin.nama &&
          item.kelas === izin.kelas &&
          item.tanggal === izin.tanggal
        ) {
          return {
            ...item,
            status: izin.status,
            deskripsi: izin.deskripsi || ""
          };
        }
        return item;
      });

      // Simpan kembali ke localStorage
      localStorage.setItem("izinSiswa", JSON.stringify(updatedData));

      // Perbarui daftar izin di tampilan
      this.izinSiswa.splice(index, 1); // Hapus dari daftar proses agar tidak muncul lagi di tabel ini

      // Emit event agar halaman laporan tahu ada perubahan
      this.$emit("updateLaporan");

      // Opsional: Paksa refresh halaman laporan agar langsung terlihat
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  }
};
</script>

<style scoped>
.container {
  width: 90%;
  margin: 20px auto;
  padding: 20px;
  background-color: #ffdde1;
  text-align: center;
  border-radius: 10px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 15px;
}

.izin-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}

.izin-table th, .izin-table td {
  border: 1px solid #f12356;
  padding: 10px;
  text-align: center;
}

.izin-foto {
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.2s;
}

.izin-foto:hover {
  transform: scale(1.1);
}

.accepted {
  color: green;
  font-weight: bold;
}

.rejected {
  color: red;
  font-weight: bold;
}

.deskripsi-input {
  width: 90%;
  height: 60px;
  padding: 10px;
  border: 1px solid #ed4ad2;
  border-radius: 5px;
  text-align: left;
  vertical-align: top;
  resize: none;
  font-size: 14px;
  font-family: Arial, sans-serif;
}

.back-btn {
  margin-top: 20px;
  padding: 10px 20px;
  background: #ADD8E6;
  border: 1px solid #4f7be9;
  border-radius: 5px;
  cursor: pointer;
}

.back-btn:hover {
  background: #AFCBFF;
}

/* Tombol Terima & Tolak */
.accept-btn {
  background-color: #4CAF50;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 5px;
}

.accept-btn:hover {
  background-color: #45a049;
}

.reject-btn {
  background-color: #f44336;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.reject-btn:hover {
  background-color: #d32f2f;
}

/* Modal Foto */
.modal {
  display: flex;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  align-items: center;
  justify-content: center;
}

.modal-content {
  max-width: 80%;
  max-height: 80%;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.5);
}

.modal:hover {
  cursor: pointer;
}
</style>