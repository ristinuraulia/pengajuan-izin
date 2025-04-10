<template>
  <div class="container">
    <h2>Rekap Izin Siswa</h2>

    <!-- Filter Form -->
    <div class="filter-bar">
      <input
        type="text"
        class="search-input"
        v-model="searchQuery"
        placeholder="Cari berdasarkan nama...."
      />

      <select v-model="selectedMonth" class="search-input">
        <option value="">Pilih Bulan</option>
        <option value="01">Januari</option>
        <option value="02">Februari</option>
        <option value="03">Maret</option>
        <option value="04">April</option>
        <option value="05">Mei</option>
        <option value="06">Juni</option>
        <option value="07">Juli</option>
        <option value="08">Agustus</option>
        <option value="09">September</option>
        <option value="10">Oktober</option>
        <option value="11">November</option>
        <option value="12">Desember</option>
      </select>

      <input
        type="date"
        class="search-input"
        v-model="selectedDate"
      />
    </div>

    <div id="printArea">
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
            <th>Komentar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(izin, index) in filteredLaporanIzin" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ izin?.nama || '-' }}</td>
            <td>{{ izin?.kelas || '-' }}</td>
            <td>{{ izin?.tanggal || '-' }}</td>
            <td>{{ izin?.alasan || '-' }}</td>
            <td>{{ izin?.keterangan || '-' }}</td>
            <td>
              <img v-if="izin.foto" :src="izin.foto" alt="Foto Izin" class="izin-foto" />
              <span v-else>Tidak ada foto</span>
            </td>
            <td :class="izin.status === 'Diterima' ? 'accepted' : 'rejected'">
              {{ izin.status }}
            </td>
            <td class="deskripsi-col">
              {{ izin.deskripsi || "Tidak ada komentar" }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="action-btns">
      <button class="back-btn" @click="goBackByRole">Kembali</button>
      <button class="print-btn" @click="printRekap">Print</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
      selectedMonth: "",
      selectedDate: "",
      laporanIzin: []
    };
  },
  computed: {
    filteredLaporanIzin() {
      return this.laporanIzin.filter((izin) => {
        const nameMatch = izin.nama.toLowerCase().includes(this.searchQuery.toLowerCase());
        const monthMatch = !this.selectedMonth || izin.tanggal.slice(5, 7) === this.selectedMonth;
        const dateMatch = !this.selectedDate || izin.tanggal === this.selectedDate;

        return nameMatch && monthMatch && dateMatch;
      });
    }
  },
  mounted() {
    const user = JSON.parse(localStorage.getItem("userLogin"));
    if (!user || !["siswa", "sekertaris", "wali_kelas", "walikelas"].includes(user.role)) {
      this.$router.push("/login");
    } else {
      this.loadRekapData();
    }
  },
  methods: {
    loadRekapData() {
      try {
        const user = JSON.parse(localStorage.getItem("userLogin"));
        const data = JSON.parse(localStorage.getItem("izinSiswa")) || [];

        if (user.role === "siswa") {
          this.laporanIzin = data.filter(
            (izin) =>
              izin.nama === user.nama &&
              (izin.status === "Diterima" || izin.status === "Ditolak")
          );
        } else {
          this.laporanIzin = data.filter(
            (izin) => izin.status === "Diterima" || izin.status === "Ditolak"
          );
        }
      } catch (e) {
        this.laporanIzin = [];
      }
    },
    goBackByRole() {
      const user = JSON.parse(localStorage.getItem("userLogin"));
      if (!user) {
        this.$router.push("/login");
      } else {
        this.$router.push("/home");
      }
    },
    printRekap() {
      const printContent = document.getElementById("printArea").innerHTML;
      const win = window.open('', '', 'height=700,width=1000');
      win.document.write('<html><head><title>Print Rekap</title>');
      win.document.write('<style>table { width: 100%; border-collapse: collapse; } th, td { border: 1px solid black; padding: 8px; text-align: center; } .deskripsi-col { text-align: left; }</style>');
      win.document.write('</head><body>');
      win.document.write(printContent);
      win.document.write('</body></html>');
      win.document.close();
      win.print();
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

.filter-bar {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 15px;
}

.search-input {
  padding: 10px;
  border: 1px solid #f12356;
  border-radius: 5px;
  background-color: #edc6ca;
  width: 32%;
}

.search-input::placeholder {
  color: black;
}

.izin-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}

.izin-table th,
.izin-table td {
  border: 1px solid #f12356;
  padding: 10px;
  text-align: center;
}

.izin-foto {
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 5px;
}

.accepted {
  color: green;
  font-weight: bold;
}

.rejected {
  color: red;
  font-weight: bold;
}

.deskripsi-col {
  text-align: left;
  padding: 10px;
  max-width: 250px;
  word-wrap: break-word;
  white-space: pre-line;
}

.action-btns {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.back-btn,
.print-btn {
  padding: 10px 20px;
  border: 1px solid #4f7be9;
  border-radius: 5px;
  cursor: pointer;
  background-color: #add8e6;
}

.back-btn:hover,
.print-btn:hover {
  background-color: #afcbff;
}
</style>
