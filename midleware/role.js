export default function ({ store, redirect, route }) {
    const user = store.state.user; // Asumsikan informasi pengguna disimpan di Vuex store
    const role = user ? user.role : null;
  
    const roleAccess = {
      siswa: ['/form-izin', '/rekap-riwayat'],
      sekretaris: ['/data-laporan'],
      wali_kelas: ['/proses-izin', '/laporan']
    };
  
    const allowedRoutes = roleAccess[role] || [];
  
    if (!allowedRoutes.includes(route.path)) {
      return redirect('/login'); // Atau rute lain yang sesuai
    }
  }
  