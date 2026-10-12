// ============================================================
// MATERI BAHASA JEPANG
// Di sini kita memberi tahu website materi apa saja yang ada
// untuk bahasa Jepang, dan data mana yang dipakai.
//
// Kalau nanti ada file data baru (misalnya kosakata-n4.js):
//   1. Tambahkan <script src="data/jepang/kosakata-n4.js"> di index.html
//   2. Tambahkan namanya di bagian "data" di bawah.
// ============================================================

daftarkanBahasa({
  kode: "jepang",
  nama: "Bahasa Jepang",
  bendera: "🇯🇵",
  logo: "日本語",
  level: ["N5", "N4"],

  materi: [
    {
      kode: "kosakata",
      nama: "Kosakata",
      jenis: "kata", // jenis soal: kata (punya kolom kata, baca, romaji, arti)
      data: [...KOSAKATA_N5],
    },
    {
      kode: "kanji",
      nama: "Kanji",
      jenis: "kanji", // jenis soal: kanji (punya kolom kanji, onyomi, kunyomi, contoh)
      data: [...KANJI_N5],
    },
  ],
});
