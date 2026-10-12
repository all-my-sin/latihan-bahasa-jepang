// ============================================================
// PENYIMPANAN PROGRES (localStorage)
// Semua progres disimpan di browser, bukan di internet.
// Kalau kamu menghapus data browser, progres juga ikut terhapus.
// ============================================================

const Penyimpanan = (() => {
  const KUNCI = "latihanBahasa.v1";

  function dataAwal() {
    return {
      pengaturan: {}, // pilihan terakhir di halaman Latihan
      tema: null, // "terang", "gelap", atau null (ikut HP/laptop)
      tampilan: { furigana: true, romaji: true, tips: true }, // tombol あ di atas
      riwayat: [], // ringkasan setiap sesi latihan
      kategori: {}, // jumlah benar/salah per kategori
      kata: {}, // jumlah benar/salah per kata
    };
  }

  function muat() {
    try {
      const teks = localStorage.getItem(KUNCI);
      if (teks) return { ...dataAwal(), ...JSON.parse(teks) };
    } catch (e) {
      // Browser menolak localStorage (mis. mode private). Website tetap jalan.
    }
    return dataAwal();
  }

  let data = muat();

  function simpan() {
    try {
      localStorage.setItem(KUNCI, JSON.stringify(data));
    } catch (e) {
      // Tidak bisa menyimpan; abaikan saja.
    }
  }

  function tambah(tempat, kunci, benar) {
    const catatan = tempat[kunci] || { benar: 0, salah: 0 };
    if (benar) catatan.benar++;
    else catatan.salah++;
    catatan.terakhir = Date.now();
    tempat[kunci] = catatan;
  }

  return {
    get data() {
      return data;
    },

    catatJawaban(kodeBahasa, kodeMateri, kategori, kunciKata, benar) {
      tambah(data.kategori, `${kodeBahasa}/${kodeMateri}/${kategori}`, benar);
      tambah(data.kata, `${kodeBahasa}/${kodeMateri}/${kunciKata}`, benar);
      simpan();
    },

    catatSesi(ringkasan) {
      data.riwayat.push({ ...ringkasan, tanggal: Date.now() });
      data.riwayat = data.riwayat.slice(-200);
      simpan();
    },

    simpanPengaturan(pengaturan) {
      data.pengaturan = pengaturan;
      simpan();
    },

    simpanTema(tema) {
      data.tema = tema;
      simpan();
    },

    simpanTampilan(tampilan) {
      data.tampilan = { ...data.tampilan, ...tampilan };
      simpan();
    },

    hapusSemua() {
      data = dataAwal();
      simpan();
    },
  };
})();
