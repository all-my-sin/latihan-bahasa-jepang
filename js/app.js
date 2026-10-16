// ============================================================
// PROGRAM UTAMA
// Mengatur pindah halaman, mode gelap, form pengaturan,
// jalannya soal, dan halaman hasil.
// ============================================================

const $ = (id) => document.getElementById(id);

// Mengamankan teks sebelum dimasukkan ke HTML.
function aman(teks) {
  return String(teks).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
}

function persen(benar, total) {
  return total ? Math.round((benar / total) * 100) : 0;
}

// ------------------------------------------------------------
// PINDAH HALAMAN
// Alamat #beranda, #latihan, #huruf, #kanji, #kanji/daftar, dst.
// menentukan halaman yang tampil.
// ------------------------------------------------------------
function tampilkanHalaman(nama) {
  document.querySelectorAll(".halaman").forEach((h) => (h.hidden = h.id !== `hal-${nama}`));
  const menu = nama.split("-")[0]; // "kanji-daftar" → menu "Kanji"
  document.querySelectorAll(".menu a").forEach((a) => a.classList.toggle("aktif", a.dataset.menu === menu));
  window.scrollTo(0, 0);
}

function bukaDariAlamat() {
  const nama = location.hash.replace("#", "") || "beranda";
  KartuDialog.tutup();

  if (nama === "latihan") {
    isiFormLatihan();
    tampilkanHalaman("latihan");
  } else if (nama === "huruf") {
    Huruf.tampilkanTabel();
    tampilkanHalaman("huruf");
  } else if (nama === "kanji") {
    tampilkanHalaman("kanji");
  } else if (nama === "kanji/latihan") {
    Kanji.tampilkanFormLatihan();
    tampilkanHalaman("kanji-latihan");
  } else if (nama === "kanji/daftar") {
    Kanji.tampilkanDaftar();
    tampilkanHalaman("kanji-daftar");
  } else {
    tampilkanBeranda();
    tampilkanHalaman("beranda");
  }
}

window.addEventListener("hashchange", bukaDariAlamat);

// ------------------------------------------------------------
// PENGATURAN TAMPILAN (tombol あ): furigana, romaji, tips
// Caranya: memberi tanda di <html>, lalu CSS yang menyembunyikan.
// ------------------------------------------------------------
function terapkanTampilan() {
  const t = Penyimpanan.data.tampilan;
  const html = document.documentElement.classList;
  html.toggle("sembunyi-furigana", !t.furigana);
  html.toggle("sembunyi-romaji", !t.romaji);
  html.toggle("sembunyi-tips", !t.tips);
  $("atur-furigana").checked = t.furigana;
  $("atur-romaji").checked = t.romaji;
  $("atur-tips").checked = t.tips;
}

$("menu-tampilan").addEventListener("change", () => {
  Penyimpanan.simpanTampilan({
    furigana: $("atur-furigana").checked,
    romaji: $("atur-romaji").checked,
    tips: $("atur-tips").checked,
  });
  terapkanTampilan();
});

// Tombol "Sembunyikan tips / Tampilkan tips" di kartu kanji
document.addEventListener("click", (e) => {
  if (e.target.closest('[data-aksi="tips"]')) {
    Penyimpanan.simpanTampilan({ tips: !Penyimpanan.data.tampilan.tips });
    terapkanTampilan();
  }
  // Tutup panel あ kalau klik di luar panel
  const panel = $("menu-tampilan");
  if (panel.open && !panel.contains(e.target)) panel.open = false;
});

// ------------------------------------------------------------
// MODE GELAP
// ------------------------------------------------------------
function sedangGelap() {
  const tema = document.documentElement.dataset.theme;
  if (tema) return tema === "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function perbaruiIkonTema() {
  $("tombol-tema").textContent = sedangGelap() ? "☀️" : "🌙";
}

$("tombol-tema").addEventListener("click", () => {
  const jadiGelap = !sedangGelap();
  document.documentElement.dataset.theme = jadiGelap ? "dark" : "light";
  Penyimpanan.simpanTema(jadiGelap ? "gelap" : "terang");
  perbaruiIkonTema();
});

// ------------------------------------------------------------
// BERANDA
// ------------------------------------------------------------
function tampilkanBeranda() {
  const data = Penyimpanan.data;
  const totalSoal = data.riwayat.reduce((n, r) => n + r.total, 0);
  const totalBenar = data.riwayat.reduce((n, r) => n + r.benar, 0);

  $("ringkasan").innerHTML = `
    <div class="angka"><b>${data.riwayat.length}</b><span>latihan selesai</span></div>
    <div class="angka"><b>${totalSoal}</b><span>soal dijawab</span></div>
    <div class="angka"><b>${persen(totalBenar, totalSoal)}%</b><span>jawaban benar</span></div>`;

  // kunci = "bahasa/materi/kategori" → tampil sebagai "Kanji · Angka"
  const namaKategori = (kunci) => {
    const [kodeBahasa, kodeMateri, ...kategori] = kunci.split("/");
    const materi = cariBahasa(kodeBahasa).materi.find((m) => m.kode === kodeMateri);
    return `${materi ? materi.nama : kodeMateri} · ${kategori.join("/")}`;
  };
  const baris = Object.entries(data.kategori)
    .map(([kunci, c]) => ({ nama: namaKategori(kunci), ...c, total: c.benar + c.salah }))
    .sort((a, b) => b.total - a.total);

  $("ringkasan-kategori").innerHTML = baris.length
    ? `<h3>Benar per kategori</h3>` +
      baris
        .map((b) => {
          const p = persen(b.benar, b.total);
          return `<div class="baris-kategori">
            <div class="baris-kategori-judul"><span>${aman(b.nama)}</span><span>${p}% · ${b.total} soal</span></div>
            <div class="bilah kecil"><div style="width:${p}%"></div></div>
          </div>`;
        })
        .join("")
    : `<p class="redup">Belum ada latihan. Ayo mulai yang pertama!</p>`;
}

// ------------------------------------------------------------
// FORM PENGATURAN LATIHAN
// ------------------------------------------------------------
const PILIHAN_JUMLAH = [10, 20, 50];

let pengaturan = {
  bahasa: DAFTAR_BAHASA[0].kode,
  materi: DAFTAR_BAHASA[0].materi[0].kode,
  level: "N5",
  arah: "arti",
  kategori: null, // null = semua kategori
  jumlah: 10,
  ...Penyimpanan.data.pengaturan,
};

function buatChip(nama, nilai, teks, terpilih, jenis = "radio", nonaktif = false) {
  return `<label class="chip${nonaktif ? " nonaktif" : ""}">
    <input type="${jenis}" name="${nama}" value="${aman(nilai)}" ${terpilih ? "checked" : ""} ${nonaktif ? "disabled" : ""}>
    <span>${teks}</span>
  </label>`;
}

function daftarLevel(pilihan, bahasa) {
  return pilihan === "semua" ? bahasa.level : [pilihan];
}

function semuaKategori(materi, levelDipilih) {
  const hasil = [];
  materi.data.forEach((it) => {
    if (levelDipilih.includes(it.level) && !hasil.includes(it.kategori)) hasil.push(it.kategori);
  });
  return hasil;
}

// Materi yang bisa dipakai di halaman Latihan (yang soalnya bisa dibuat soal.js).
function materiLatihan(bahasa) {
  return bahasa.materi.filter((m) => Soal.JENIS.includes(m.jenis));
}

function cariMateriLatihan(bahasa, kodeMateri) {
  const daftar = materiLatihan(bahasa);
  return daftar.find((m) => m.kode === kodeMateri) || daftar[0];
}

function isiFormLatihan() {
  const bahasa = cariBahasa(pengaturan.bahasa);
  const materi = cariMateriLatihan(bahasa, pengaturan.materi);
  pengaturan.bahasa = bahasa.kode;
  pengaturan.materi = materi.kode;

  // Bahasa (hanya tampil kalau ada lebih dari satu bahasa)
  $("grup-bahasa").hidden = DAFTAR_BAHASA.length < 2;
  $("pilih-bahasa").innerHTML = DAFTAR_BAHASA.map((b) =>
    buatChip("bahasa", b.kode, `${b.bendera} ${aman(b.nama)}`, b === bahasa)
  ).join("");

  $("pilih-materi").innerHTML = materiLatihan(bahasa)
    .map((m) => buatChip("materi", m.kode, aman(m.nama), m === materi))
    .join("");

  // Level: yang belum ada datanya dibuat tidak bisa dipilih
  const levelAda = bahasa.level.filter((lv) => materi.data.some((it) => it.level === lv));
  if (pengaturan.level !== "semua" && !levelAda.includes(pengaturan.level)) pengaturan.level = levelAda[0];
  $("pilih-level").innerHTML =
    bahasa.level
      .map((lv) => {
        const ada = levelAda.includes(lv);
        return buatChip("level", lv, ada ? lv : `${lv} <small>(belum ada)</small>`, pengaturan.level === lv, "radio", !ada);
      })
      .join("") + buatChip("level", "semua", "Keduanya", pengaturan.level === "semua", "radio", levelAda.length < 2);

  $("pilih-arah").innerHTML = Object.entries(Soal.ARAH)
    .map(([kode, a]) => buatChip("arah", kode, a.label, pengaturan.arah === kode))
    .join("");

  isiKategori();

  $("pilih-jumlah").innerHTML = PILIHAN_JUMLAH.map((n) =>
    buatChip("jumlah", n, `${n} soal`, pengaturan.jumlah === n)
  ).join("");

  perbaruiInfoTersedia();
}

function isiKategori() {
  const bahasa = cariBahasa(pengaturan.bahasa);
  const materi = cariMateriLatihan(bahasa, pengaturan.materi);
  const levelDipilih = daftarLevel(pengaturan.level, bahasa);
  const kategori = semuaKategori(materi, levelDipilih);
  const dipilih = pengaturan.kategori || kategori;

  $("pilih-kategori").innerHTML = kategori
    .map((k) => {
      const jumlah = materi.data.filter((it) => it.kategori === k && levelDipilih.includes(it.level)).length;
      return buatChip("kategori", k, `${aman(k)} <small>${jumlah}</small>`, dipilih.includes(k), "checkbox");
    })
    .join("");
}

// Membaca isi form menjadi objek pengaturan.
function bacaForm() {
  const form = $("form-latihan");
  const nilai = (nama) => form.querySelector(`input[name="${nama}"]:checked`)?.value;
  const kategoriDicentang = [...form.querySelectorAll('input[name="kategori"]:checked')].map((i) => i.value);
  const semua = form.querySelectorAll('input[name="kategori"]').length;

  pengaturan = {
    bahasa: nilai("bahasa") || pengaturan.bahasa,
    materi: nilai("materi") || pengaturan.materi,
    level: nilai("level") || pengaturan.level,
    arah: nilai("arah") || "arti",
    kategori: kategoriDicentang.length === semua ? null : kategoriDicentang,
    jumlah: Number(nilai("jumlah")) || 10,
  };
}

function pengaturanLengkap() {
  const bahasa = cariBahasa(pengaturan.bahasa);
  const materi = cariMateriLatihan(bahasa, pengaturan.materi);
  const level = daftarLevel(pengaturan.level, bahasa);
  return {
    bahasa,
    materi,
    pilihan: {
      ...pengaturan,
      level,
      kategori: pengaturan.kategori || semuaKategori(materi, level),
    },
  };
}

function perbaruiInfoTersedia() {
  const { materi, pilihan } = pengaturanLengkap();
  const ada = Soal.hitungTersedia(materi, pilihan);
  const info = $("info-tersedia");
  if (ada === 0) info.textContent = "Belum ada kata yang cocok. Pilih minimal satu kategori.";
  else if (ada < pilihan.jumlah) info.textContent = `Hanya ada ${ada} kata yang cocok, jadi latihan berisi ${ada} soal.`;
  else info.textContent = `${ada} kata cocok dengan pilihanmu.`;
}

$("form-latihan").addEventListener("change", (e) => {
  const sebelum = { ...pengaturan };
  bacaForm();
  // Kalau bahasa/materi/level berubah, daftar kategori perlu dibuat ulang.
  if (e.target.name === "bahasa" || e.target.name === "materi") {
    pengaturan.kategori = null;
    isiFormLatihan();
  } else if (e.target.name === "level" && sebelum.level !== pengaturan.level) {
    pengaturan.kategori = null;
    isiKategori();
  }
  perbaruiInfoTersedia();
});

$("kategori-semua").addEventListener("click", () => {
  document.querySelectorAll('input[name="kategori"]').forEach((i) => (i.checked = true));
  bacaForm();
  perbaruiInfoTersedia();
});

$("kategori-kosong").addEventListener("click", () => {
  document.querySelectorAll('input[name="kategori"]').forEach((i) => (i.checked = false));
  bacaForm();
  perbaruiInfoTersedia();
});

$("form-latihan").addEventListener("submit", (e) => {
  e.preventDefault();
  bacaForm();
  Penyimpanan.simpanPengaturan(pengaturan);
  const { bahasa, materi, pilihan } = pengaturanLengkap();
  const daftarSoal = Soal.buatSesi(materi, pilihan);
  if (!daftarSoal.length) {
    perbaruiInfoTersedia();
    return;
  }
  mulaiSesi(bahasa, materi, pilihan.arah, daftarSoal);
});

// ------------------------------------------------------------
// JALANNYA SOAL
// ------------------------------------------------------------
let sesi = null;

// opsi (dipakai latihan kanji):
//   buatLagi()             → daftar soal baru dengan pengaturan yang sama
//   buatDariSalah(soal)    → daftar soal baru dari soal yang salah
//   alamatPengaturan       → halaman pengaturan untuk tombol "Ubah pengaturan"
function mulaiSesi(bahasa, materi, arah, daftarSoal, opsi = {}) {
  sesi = {
    bahasa,
    materi,
    arah,
    soal: daftarSoal,
    nomor: 0,
    benar: 0,
    jawaban: [],
    sudahDijawab: false,
    opsi: {
      buatLagi: () => {
        const { pilihan } = pengaturanLengkap();
        return Soal.buatSesi(materi, pilihan);
      },
      buatDariSalah: (soalSalah) => Soal.buatSesiDariKata(materi, soalSalah.map((s) => s.item), arah),
      alamatPengaturan: "#latihan",
      ...opsi,
    },
  };
  $("ubah-pengaturan").href = sesi.opsi.alamatPengaturan;
  // Ganti alamat ke #soal supaya menu "Latihan" tetap bisa diklik.
  history.replaceState(null, "", "#soal");
  tampilkanHalaman("soal");
  tampilkanSoal();
}

function teksJepang(teks) {
  return `<span lang="ja">${aman(teks)}</span>`;
}

// Kata Jepang dengan furigana (kalau furigana dinyalakan di tombol あ)
function kataFurigana(it) {
  return `<span lang="ja">${TeksJepang.furigana(it.kata, it.baca)}</span>`;
}

// Penjelasan singkat sebuah kata: 食べる (たべる · taberu) = Makan
// Bagian romaji disembunyikan kalau romaji dimatikan di tombol あ.
function penjelasanKata(it) {
  const romaji = aman(it.romaji);
  const keterangan =
    it.baca !== it.kata
      ? `<span class="redup">(${aman(it.baca)}<span class="romaji"> · ${romaji}</span>)</span>`
      : `<span class="redup romaji">(${romaji})</span>`;
  return `${teksJepang(it.kata)} ${keterangan} = ${aman(it.arti)}`;
}

function tampilkanSoal() {
  const s = sesi.soal[sesi.nomor];
  sesi.sudahDijawab = false;

  $("nomor-soal").textContent = `Soal ${sesi.nomor + 1} / ${sesi.soal.length}`;
  $("skor-sementara").textContent = `Benar: ${sesi.benar}`;
  $("bilah-isi").style.width = `${(sesi.nomor / sesi.soal.length) * 100}%`;

  const teksSoal = $("teks-soal");
  let kelasPilihan = "";

  if (s.kanji) {
    // Soal kanji: tampilannya sudah disiapkan oleh soal-kanji.js
    $("perintah").innerHTML = s.perintahHtml;
    teksSoal.innerHTML = s.soalHtml;
    teksSoal.className = `teks-soal ${s.kelasSoal}`;
    kelasPilihan = s.kelasPilihan || "";
  } else {
    $("perintah").textContent = s.perintah;
    // Furigana hanya di soal "Kata → Arti". Di soal "Cara baca", furigana = jawabannya.
    if (sesi.arah === "arti") teksSoal.innerHTML = kataFurigana(s.item);
    else teksSoal.innerHTML = s.soalJepang ? teksJepang(s.teksSoal) : aman(s.teksSoal);
    teksSoal.className = "teks-soal";
    teksSoal.classList.toggle("jepang", s.soalJepang);
    teksSoal.classList.toggle("panjang", s.teksSoal.length > 8);
    if (!s.soalJepang) kelasPilihan = "jepang";
  }

  const isiPilihan = (p) => (s.kanji ? p.html : s.soalJepang ? aman(p.teks) : kataFurigana(p.item));
  // Pilihan berupa satu kanji cukup kecil, jadi selalu 2 kolom (juga di HP)
  $("daftar-pilihan").className = `daftar-pilihan${s.jenisSoal === "kanji" ? " dua-kolom" : ""}`;
  $("daftar-pilihan").innerHTML = s.pilihan
    .map(
      (p, i) => `<button type="button" class="pilihan ${kelasPilihan}" data-i="${i}">
        <span class="nomor">${i + 1}</span>
        <span class="teks">${isiPilihan(p)}</span>
      </button>`
    )
    .join("");

  $("umpan-balik").hidden = true;
  $("umpan-kartu").hidden = true;
  $("tombol-lanjut").hidden = true;
}

function jawab(indeks) {
  if (sesi.sudahDijawab) return;
  sesi.sudahDijawab = true;

  const s = sesi.soal[sesi.nomor];
  const benar = indeks === s.jawabanBenar;
  if (benar) sesi.benar++;
  sesi.jawaban.push({ soal: s, dipilih: indeks, benar });

  if (s.kanji) Penyimpanan.catatJawaban(sesi.bahasa.kode, sesi.materi.kode, s.kategori, s.kunci, benar);
  else Penyimpanan.catatJawaban(sesi.bahasa.kode, sesi.materi.kode, s.item.kategori, Soal.kunciKata(s.item), benar);

  // Warnai tombol: hijau = jawaban benar, merah = pilihanmu yang salah
  document.querySelectorAll("#daftar-pilihan .pilihan").forEach((btn, i) => {
    btn.disabled = true;
    if (i === s.jawabanBenar) btn.classList.add("benar");
    else if (i === indeks) btn.classList.add("salah");
  });

  let isi;
  if (s.kanji) {
    isi = Kanji.umpanBalik(s, indeks, benar);
    // Kartu kanji lengkap, supaya sekalian belajar
    $("umpan-kartu").innerHTML = Kanji.kartuSetelahJawab(s, benar);
    $("umpan-kartu").hidden = false;
  } else {
    const dipilih = s.pilihan[indeks].item;
    isi = benar ? `<p class="judul-umpan">✓ Benar!</p>` : `<p class="judul-umpan">✗ Belum tepat</p>`;
    isi += `<p>${penjelasanKata(s.item)}</p>`;
    if (!benar) isi += `<p class="redup">Pilihanmu: ${penjelasanKata(dipilih)}</p>`;
    isi += `<p class="redup kecil">Kategori: ${aman(s.item.kategori)}</p>`;
    if (s.item.catatan) isi += `<p class="redup kecil">Catatan: ${aman(s.item.catatan)}</p>`;
  }

  const umpan = $("umpan-balik");
  umpan.innerHTML = isi;
  umpan.className = `umpan-balik ${benar ? "benar" : "salah"}`;
  umpan.hidden = false;

  $("skor-sementara").textContent = `Benar: ${sesi.benar}`;
  const lanjut = $("tombol-lanjut");
  lanjut.textContent = sesi.nomor + 1 < sesi.soal.length ? "Lanjut →" : "Lihat hasil →";
  lanjut.hidden = false;
  lanjut.focus({ preventScroll: true });
  lanjut.scrollIntoView({ block: "nearest", behavior: "smooth" });
}

function lanjut() {
  sesi.nomor++;
  if (sesi.nomor < sesi.soal.length) tampilkanSoal();
  else selesai();
}

$("daftar-pilihan").addEventListener("click", (e) => {
  const tombol = e.target.closest(".pilihan");
  if (tombol) jawab(Number(tombol.dataset.i));
});

$("tombol-lanjut").addEventListener("click", lanjut);

$("tombol-berhenti").addEventListener("click", () => {
  if (sesi && sesi.jawaban.length) selesai();
  else location.hash = sesi ? sesi.opsi.alamatPengaturan : "#latihan";
});

// Di laptop: tekan 1-4 untuk memilih, Enter untuk lanjut.
document.addEventListener("keydown", (e) => {
  if ($("hal-soal").hidden || !sesi) return;
  if (!sesi.sudahDijawab && ["1", "2", "3", "4"].includes(e.key)) {
    const i = Number(e.key) - 1;
    if (i < sesi.soal[sesi.nomor].pilihan.length) jawab(i);
  } else if (sesi.sudahDijawab && e.key === "Enter" && document.activeElement !== $("tombol-lanjut")) {
    lanjut();
  }
});

// ------------------------------------------------------------
// HALAMAN HASIL
// ------------------------------------------------------------
function selesai() {
  const total = sesi.jawaban.length;
  const p = persen(sesi.benar, total);
  Penyimpanan.catatSesi({
    bahasa: sesi.bahasa.kode,
    materi: sesi.materi.kode,
    arah: sesi.arah,
    benar: sesi.benar,
    total,
  });

  $("skor-besar").textContent = `${sesi.benar} / ${total}`;
  $("pesan-skor").textContent =
    p === 100 ? `${p}% — Sempurna! すごい！` : p >= 80 ? `${p}% — Bagus sekali!` : p >= 50 ? `${p}% — Lumayan, terus berlatih!` : `${p}% — Tidak apa-apa, ulangi lagi ya.`;

  const salah = sesi.jawaban.filter((j) => !j.benar);
  $("daftar-salah").innerHTML = salah.length
    ? `<h2>Soal yang salah (${salah.length})</h2>` +
      salah
        .map((j) =>
          j.soal.kanji
            ? `<div class="kartu-salah">
            <p class="kecil redup">${j.soal.perintahHtml}</p>
            <p class="soal-salah">${j.soal.soalHtml}</p>
            <p>✗ Jawabanmu: ${j.soal.pilihan[j.dipilih].html}</p>
            <p>✓ Jawaban benar: ${j.soal.teksBenar}</p>
          </div>`
            : `<div class="kartu-salah">
            <p class="kecil redup">${aman(j.soal.perintah)}</p>
            <p class="soal-salah">${j.soal.soalJepang ? teksJepang(j.soal.teksSoal) : aman(j.soal.teksSoal)}</p>
            <p>✗ Jawabanmu: ${j.soal.soalJepang ? aman(j.soal.pilihan[j.dipilih].teks) : teksJepang(j.soal.pilihan[j.dipilih].teks)}</p>
            <p>✓ Jawaban benar: ${penjelasanKata(j.soal.item)}</p>
          </div>`
        )
        .join("")
    : `<p>Tidak ada yang salah. Hebat!</p>`;

  $("ulangi-salah").hidden = !salah.length;
  tampilkanHalaman("hasil");
}

$("ulangi-salah").addEventListener("click", () => {
  const soalSalah = sesi.jawaban.filter((j) => !j.benar).map((j) => j.soal);
  const { bahasa, materi, arah, opsi } = sesi;
  mulaiSesi(bahasa, materi, arah, opsi.buatDariSalah(soalSalah), opsi);
});

$("latihan-lagi").addEventListener("click", () => {
  const { bahasa, materi, arah, opsi } = sesi;
  mulaiSesi(bahasa, materi, arah, opsi.buatLagi(), opsi);
});

// ------------------------------------------------------------
// MULAI
// ------------------------------------------------------------
$("logo-bahasa").textContent = DAFTAR_BAHASA[0].logo;
perbaruiIkonTema();
terapkanTampilan();
bukaDariAlamat();
