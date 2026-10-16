// ============================================================
// KOTAK KARTU DI ATAS HALAMAN (dialog)
// Dipakai bersama oleh kartu kanji dan detail huruf.
// KartuDialog.buka(daftar, indeks, gambar)
//   daftar : semua isi yang bisa dilihat dengan tombol ‹ ›
//   indeks : yang dibuka pertama
//   gambar : fungsi yang membuat HTML kartu dari satu isi
// ============================================================

const KartuDialog = (() => {
  const el = (id) => document.getElementById(id);
  const dialog = el("dialog-kartu");
  let daftar = [];
  let posisi = -1;
  let gambar = () => "";

  function tampil(indeks) {
    if (indeks < 0 || indeks >= daftar.length) return;
    posisi = indeks;
    el("dialog-kartu-isi").innerHTML = gambar(daftar[indeks]);
    el("kartu-posisi").textContent = `${indeks + 1} / ${daftar.length}`;
    el("kartu-sebelum").disabled = indeks === 0;
    el("kartu-berikut").disabled = indeks === daftar.length - 1;
    if (!dialog.open) dialog.showModal();
    dialog.scrollTop = 0;
  }

  function buka(daftarBaru, indeks, fungsiGambar) {
    daftar = daftarBaru;
    gambar = fungsiGambar;
    tampil(indeks);
  }

  function tutup() {
    if (dialog.open) dialog.close();
  }

  el("kartu-sebelum").addEventListener("click", () => tampil(posisi - 1));
  el("kartu-berikut").addEventListener("click", () => tampil(posisi + 1));
  el("kartu-tutup").addEventListener("click", tutup);
  // Klik di luar kartu (bagian gelap) juga menutup
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) tutup();
  });
  // Tombol panah kiri/kanan di laptop
  dialog.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") tampil(posisi - 1);
    if (e.key === "ArrowRight") tampil(posisi + 1);
  });

  return { buka, tutup };
})();
