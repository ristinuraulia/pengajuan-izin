<template>
    <div class="container">
      <div class="row atas">
        <div class="card-container">
          <nuxt-link to="/pengajuan/tambah">
            <div class="card bg-pengajuan">
              Pengajuan Izin
            </div>
          </nuxt-link>
        </div>
  
        <div class="card-container">
          <nuxt-link to="/status/tambah">
            <div class="card bg-status">
              Notifikasi Status Izin
            </div>
          </nuxt-link>
        </div>
      </div>
  
      <div class="row tengah">
        <div class="card-container">
          <nuxt-link to="/rekap">
            <div class="card bg-rekap">
              Laporan Rekap Izin
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
  </template>
  
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
    background-color: #ccc; 
    padding: 20px;
  }
  
  .row.atas {
    display: flex;
    justify-content: center;
    gap: 50px;
    margin-bottom: 30px;
  }
  
  .row.tengah {
    display: flex;
    justify-content: center;
  }
  
  .card-container {
    display: flex;
    justify-content: center;
  }
  
  .card {
    width: 600px;
    height: 200px;
    background-size: cover;
    background-position: center;
    border-radius: 15px;
    box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.3);
    position: relative;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 15px;
    color: #6b3e26;
    font-size: 1.3rem;
    font-weight: bold;
  }
  
  .card.bg-pengajuan {
    background-image: url('../assets/img/smk.jpeg');
  }
  
  .card.bg-status {
    background-image: url('../assets/img/smk.jpeg');
  }
  
  .card.bg-rekap {
    background-image: url('../assets/img/sekola.jpeg');
    width: 600px; 
    height: 200px;
  }
  
  @media (max-width: 768px) {
    .row.atas {
      flex-direction: column;
      align-items: center;
      gap: 20px;
    }
    .row.tengah {
      flex-direction: column;
      align-items: center;
    }
    .card {
      width: 90%;
    }
  }
  </style>