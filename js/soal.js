// ============================================================
// PEMBUAT SOAL PILIHAN GANDA
// File ini mengambil data kosakata, lalu membuat soal dengan
// 1 jawaban benar dan 3 jawaban salah ("pengecoh").
// ============================================================

const Soal = (() => {
  const ADA_KANJI = /[㐀-鿿々〆ヶ]/;

  // Mengacak urutan isi daftar (tanpa mengubah daftar aslinya).
  function acak(daftar) {
    const hasil = [...daftar];
    for (let i = hasil.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [hasil[i], hasil[j]] = [hasil[j], hasil[i]];
    }
    return hasil;
  }

  // "Permisi / maaf" -> ["permisi", "maaf"]
  function pecah(teks) {
    return teks
      .toLowerCase()
      .split("/")
      .map((s) => s.trim())
      .filter(Boolean);
  }

  function adaYangSama(teksA, teksB) {
    const a = pecah(teksA);
    return pecah(teksB).some((x) => a.includes(x));
  }

  // Kunci unik sebuah kata. Kata yang muncul di dua kategori
  // (misalnya 誰) punya kunci yang sama, jadi dianggap satu kata.
  function kunciKata(item) {
    return `${item.kata}|${item.baca}`;
  }

  // ------------------------------------------------------------
  // ARAH SOAL
  // bentrok(a, b) = true kalau b TIDAK boleh jadi pengecoh untuk a,
  // karena b bisa dianggap benar juga (artinya sama, bacaannya sama, dst.)
  // ------------------------------------------------------------
  const ARAH = {
    arti: {
      label: "Kata Jepang → Arti",
      perintah: "Apa arti kata ini?",
      teksSoal: (it) => it.kata,
      teksJawaban: (it) => it.arti,
      bolehDipakai: () => true,
      bentrok: (a, b) =>
        a.kata === b.kata || adaYangSama(a.baca, b.baca) || adaYangSama(a.arti, b.arti),
    },
    kata: {
      label: "Arti → Kata Jepang",
      perintah: "Mana kata Jepang untuk arti ini?",
      teksSoal: (it) => it.arti,
      teksJawaban: (it) => it.kata,
      bolehDipakai: () => true,
      bentrok: (a, b) => a.kata === b.kata || adaYangSama(a.arti, b.arti),
    },
    baca: {
      label: "Kanji → Cara baca",
      perintah: "Bagaimana cara membaca kata ini?",
      teksSoal: (it) => it.kata,
      teksJawaban: (it) => it.baca,
      bolehDipakai: (it) => ADA_KANJI.test(it.kata), // hanya kata yang ada kanjinya
      bentrok: (a, b) => a.kata === b.kata || adaYangSama(a.baca, b.baca),
    },
  };

  // Ambil kata yang cocok dengan pengaturan (level + kategori),
  // dan buang kata yang dobel.
  function kumpulkan(materi, pengaturan, arah) {
    const sudahAda = new Set();
    return materi.data.filter((it) => {
      if (!pengaturan.level.includes(it.level)) return false;
      if (!pengaturan.kategori.includes(it.kategori)) return false;
      if (!arah.bolehDipakai(it)) return false;
      const k = kunciKata(it);
      if (sudahAda.has(k)) return false;
      sudahAda.add(k);
      return true;
    });
  }

  // Pilih 3 pengecoh. Utamakan kata dari kategori yang sama dan
  // yang panjang jawabannya mirip, supaya soal lebih menantang.
  function pilihPengecoh(benar, semuaData, arah, jumlah = 3) {
    const terpilih = [];
    const panjangBenar = arah.teksJawaban(benar).length;

    function coba(calon) {
      if (terpilih.length >= jumlah) return;
      if (calon === benar || arah.bentrok(benar, calon)) return;
      // Jangan sampai dua pengecoh sama atau mirip satu sama lain.
      if (terpilih.some((t) => arah.bentrok(t, calon))) return;
      if (terpilih.some((t) => arah.teksJawaban(t) === arah.teksJawaban(calon))) return;
      terpilih.push(calon);
    }

    const sekategori = semuaData
      .filter((it) => it.kategori === benar.kategori && arah.bolehDipakai(it))
      .map((it) => ({
        it,
        skor: Math.abs(arah.teksJawaban(it).length - panjangBenar) * 0.4 + Math.random() * 2,
      }))
      .sort((a, b) => a.skor - b.skor)
      .map((x) => x.it);
    sekategori.forEach(coba);

    // Kalau kategori ini terlalu kecil, ambil dari kategori lain.
    if (terpilih.length < jumlah) {
      acak(semuaData.filter((it) => arah.bolehDipakai(it))).forEach(coba);
    }
    return terpilih;
  }

  function buatSatuSoal(item, materi, arah) {
    const pilihan = acak([item, ...pilihPengecoh(item, materi.data, arah)]);
    return {
      item,
      perintah: arah.perintah,
      teksSoal: arah.teksSoal(item),
      soalJepang: arah !== ARAH.kata, // apakah teks soal berhuruf Jepang?
      pilihan: pilihan.map((p) => ({ item: p, teks: arah.teksJawaban(p) })),
      jawabanBenar: pilihan.indexOf(item),
    };
  }

  // Membuat satu sesi latihan berisi beberapa soal.
  function buatSesi(materi, pengaturan) {
    const arah = ARAH[pengaturan.arah] || ARAH.arti;
    const kumpulan = acak(kumpulkan(materi, pengaturan, arah));
    return kumpulan.slice(0, pengaturan.jumlah).map((it) => buatSatuSoal(it, materi, arah));
  }

  // Membuat ulang soal dari daftar kata tertentu (untuk "Ulangi yang salah").
  function buatSesiDariKata(materi, daftarKata, kodeArah) {
    const arah = ARAH[kodeArah] || ARAH.arti;
    return acak(daftarKata).map((it) => buatSatuSoal(it, materi, arah));
  }

  function hitungTersedia(materi, pengaturan) {
    const arah = ARAH[pengaturan.arah] || ARAH.arti;
    return kumpulkan(materi, pengaturan, arah).length;
  }

  // Jenis materi yang bisa dibuat soalnya oleh file ini.
  const JENIS = ["kata"];

  return { ARAH, JENIS, buatSesi, buatSesiDariKata, hitungTersedia, kunciKata };
})();
