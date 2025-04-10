<template>
  <div class="login-container">
    <h2>Login Pengguna</h2>
    <form @submit.prevent="login">
      <div class="form-group">
        <label>Email</label>
        <input type="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login() {
      if (!this.email || !this.password) {
        alert("Email dan password tidak boleh kosong");
        return;
      }

      const users = [
        { email: "admin@smkn4.com", password: "admin123", role: "wali_kelas", nama: "Bu Wali" },
        { email: "sekertaris@smkn4.com", password: "sekertaris123", role: "sekertaris", nama: "Sekertaris" },
        { email: "agistina@smkn4.com", password: "agistina123", role: "siswa", nama: "Agistina", kelas: "XII PPLG 4" },
        { email: "agni@smkn4.com", password: "agni123", role: "siswa", nama: "Agni Anjelita", kelas: "XII PPLG 4" },
        { email: "ardiansyah@smkn4.com", password: "ardiansyah123", role: "siswa", nama: "Ardiansyah M", kelas: "XII PPLG 4" },
        { email: "ega@smkn4.com", password: "ega123", role: "siswa", nama: "Ega Suzana", kelas: "XII PPLG 4" },
        { email: "erina@smkn4.com", password: "erina123", role: "siswa", nama: "Erina Nazwa S", kelas: "XII PPLG 4" },
        { email: "gilang@smkn4.com", password: "gilang123", role: "siswa", nama: "Gilang Andriansyah", kelas: "XII PPLG 4" },
        { email: "husni@smkn4.com", password: "husni123", role: "siswa", nama: "Husni Hadiyani R", kelas: "XII PPLG 4" },
        { email: "ilham@smkn4.com", password: "ilham123", role: "siswa", nama: "Ilham Septihadi H", kelas: "XII PPLG 4" },
        { email: "irgi@smkn4.com", password: "irgi123", role: "siswa", nama: "Irgi Cahya S", kelas: "XII PPLG 4" },
        { email: "jian@smkn4.com", password: "jian123", role: "siswa", nama: "Jian Kamil", kelas: "XII PPLG 4" },
        { email: "melani@smkn4.com", password: "melani123", role: "siswa", nama: "Melani Siti N", kelas: "XII PPLG 4" },
        { email: "riqi@smkn4.com", password: "riqi123", role: "siswa", nama: "M Riqi A", kelas: "XII PPLG 4" },
        { email: "wapi@smkn4.com", password: "wapi123", role: "siswa", nama: "Neng Wafi", kelas: "XII PPLG 4" },
        { email: "rapi@smkn4.com", password: "rapi123", role: "siswa", nama: "Rapi Ahmad A", kelas: "XII PPLG 4" },
        { email: "raras@smkn4.com", password: "raras123", role: "siswa", nama: "Raras Ramadani", kelas: "XII PPLG 4" },
        { email: "resti@smkn4.com", password: "resti123", role: "siswa", nama: "Resti Oktapiani", kelas: "XII PPLG 4" },
        { email: "risti@smkn4.com", password: "risti123", role: "siswa", nama: "Risti Nur Aulia", kelas: "XII PPLG 4" },
        { email: "rizni@smkn4.com", password: "rizni123", role: "siswa", nama: "Rizni Rajbia", kelas: "XII PPLG 4" },
        { email: "sani@smkn4.com", password: "sani123", role: "siswa", nama: "Sani Sahrul M", kelas: "XII PPLG 4" },
        { email: "tiara@smkn4.com", password: "tiara123", role: "siswa", nama: "Tiara Andriyani", kelas: "XII PPLG 4" },
        { email: "wijdan@smkn4.com", password: "wijdan123", role: "siswa", nama: "Wijdan Fathu R", kelas: "XII PPLG 4" },
        { email: "wulanm@smkn4.com", password: "wulanm123", role: "siswa", nama: "Wulan Maulina", kelas: "XII PPLG 4" },
        { email: "wulantri@smkn4.com", password: "wulantri123", role: "siswa", nama: "Wulan Tri A", kelas: "XII PPLG 4" },
        { email: "zaskia@smkn4.com", password: "zaskia123", role: "siswa", nama: "Zaskia Nurul H", kelas: "XII PPLG 4" },
        { email: "ziankha@smkn4.com", password: "ziankha123", role: "siswa", nama: "Ziankha Islami ", kelas: "XII PPLG 4" },
        { email: "zulpa@smkn4.com", password: "zulpa123", role: "siswa", nama: "Zulpa Agustin", kelas: "XII PPLG 4" },
        // Tambahkan pengguna lain jika perlu
      ];

      const userLogin = users.find(
        user => user.email === this.email && user.password === this.password
      );

      if (userLogin) {
        localStorage.setItem("userLogin", JSON.stringify(userLogin));

        // Redirect berdasarkan role
        if (userLogin.role === "wali_kelas") {
          this.$router.push("/notifikasi");
        } else if (userLogin.role === "sekertaris") {
          this.$router.push("/laporan");
        } else if (userLogin.role === "siswa") {
          this.$router.push("/izin");
        }
      } else {
        alert("Email atau password salah");
      }
    }
  }
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: auto;
  padding: 40px;
  background: #ffe4e4;
  border-radius: 10px;
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #aaa;
  border-radius: 5px;
}

button {
  padding: 10px 30px;
  background: #e68fc1;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background: #d973b3;
}
</style>