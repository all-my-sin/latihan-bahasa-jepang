// ============================================================
// DAFTAR BAHASA
// File ini adalah "buku daftar" semua bahasa yang ada di website.
// Setiap bahasa mendaftarkan dirinya lewat fungsi daftarkanBahasa()
// di file data/<nama-bahasa>/materi.js.
// ============================================================

const DAFTAR_BAHASA = [];

function daftarkanBahasa(bahasa) {
  DAFTAR_BAHASA.push(bahasa);
}

function cariBahasa(kode) {
  return DAFTAR_BAHASA.find((b) => b.kode === kode) || DAFTAR_BAHASA[0];
}

function cariMateri(bahasa, kodeMateri) {
  return bahasa.materi.find((m) => m.kode === kodeMateri) || bahasa.materi[0];
}
