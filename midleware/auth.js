export default function ({ store, redirect, route }) {
    const user = store.state.user;
  
    if (!user) {
      return redirect('/login');
    }
  
    const role = user.role;
  
    const akses = {
      siswa: ['/izin', '/izin/tambah', '/laporan'],
      sekertaris: ['/laporan'],
      walikelas: ['/notifikasi', '/laporan'],
    };
  
    const path = route.path;
  
    if (!akses[role].some(p => path.startsWith(p))) {
      return redirect('/home');
    }
  }