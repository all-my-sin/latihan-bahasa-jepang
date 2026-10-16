// ============================================================
// FITUR HURUF (hiragana dan katakana)
// - tampilkanTabel(): halaman "Huruf" berisi tabel huruf
// - kartuHuruf()    : detail satu huruf (dibuka di atas halaman)
// ============================================================

const Huruf = (() => {
  const { aman } = TeksJepang;
  const el = (id) => document.getElementById(id);

  // Susunan tabel standar
  const BARIS_DASAR = ["a", "ka", "sa", "ta", "na", "ha", "ma", "ya", "ra", "wa", "n"];
  const BARIS_DAKUTEN = ["ga", "za", "da", "ba", "pa"];
  const BARIS_KOMBINASI = ["kya", "sha", "cha", "nya", "hya", "mya", "rya", "gya", "ja", "bya", "pya"];
  const KOLOM_VOKAL = ["a", "i", "u", "e", "o"];

  const NAMA_JENIS = { dasar: "Huruf dasar", dakuten: "Dakuten & handakuten", kombinasi: "Kombinasi (yoon)" };
  const NAMA_STATUS = { baru: "Baru", belajar: "Sedang dipelajari", hafal: "Sudah hafal" };

  // Data hiragana & katakana dari daftar bahasa
  function materiHuruf() {
    for (const bahasa of DAFTAR_BAHASA) {
      const hiragana = bahasa.materi.find((m) => m.kode === "hiragana");
      const katakana = bahasa.materi.find((m) => m.kode === "katakana");
      if (hiragana && katakana) {
        const kosakata = bahasa.materi.filter((m) => m.jenis === "kata").flatMap((m) => m.data);
        return { bahasa, hiragana, katakana, kosakata };
      }
    }
    return null;
  }

  // Status hafalan: "baru", "belajar", atau "hafal".
  // Sistem hafalan (js/hafalan.js) dibuat di tahap 3; sebelum itu semua huruf "baru".
  function statusHuruf(kodeMateri, id) {
    return typeof Hafalan !== "undefined" ? Hafalan.status(kodeMateri, id) : "baru";
  }

  // Kolom vokal sebuah huruf: "ka" → "a", "shi" → "i". ん ditaruh di kolom pertama.
  function kolomDari(h) {
    return h.romaji === "n" ? "a" : h.romaji.slice(-1);
  }

  // ------------------------------------------------------------
  // HALAMAN TABEL
  // ------------------------------------------------------------
  let tulisan = Penyimpanan.data.pengaturanHuruf.tulisan || "hiragana";

  function sel(h, kode) {
    const status = statusHuruf(kode, h.id);
    return `<button type="button" class="sel-kana status-${status}" data-id="${h.id}" title="${NAMA_STATUS[status]}">
      <span class="sk-huruf" lang="ja">${aman(h.huruf)}</span>
      <span class="sk-romaji">${aman(h.romaji)}</span>
    </button>`;
  }

  // kolom: [{ kunci, label }] — kunci dicocokkan dengan kolomDari(huruf)
  function tabel(judul, data, daftarBaris, kolom, kode) {
    let isi = `<div class="tk-sudut"></div>` + kolom.map((k) => `<div class="tk-kepala">${k.label}</div>`).join("");
    daftarBaris.forEach((baris) => {
      isi += `<div class="tk-baris">${baris}</div>`;
      kolom.forEach((k) => {
        const h = data.find((x) => x.baris === baris && kolomDari(x) === k.kunci);
        isi += h ? sel(h, kode) : `<div class="tk-kosong" aria-hidden="true"></div>`;
      });
    });
    return `<h2>${judul}</h2><div class="tabel-kana kolom-${kolom.length}">${isi}</div>`;
  }

  function hitungHafal(data, kode, jenis) {
    const isi = data.filter((h) => h.jenis === jenis);
    return { hafal: isi.filter((h) => statusHuruf(kode, h.id) === "hafal").length, total: isi.length };
  }

  function tampilkanTabel() {
    const m = materiHuruf();
    if (!m) return;
    const materi = m[tulisan];
    const nama = materi.nama;

    el("huruf-tulisan").innerHTML = ["hiragana", "katakana"]
      .map(
        (t) => `<label class="chip">
          <input type="radio" name="huruf-tulisan" value="${t}" ${t === tulisan ? "checked" : ""}>
          <span>${m[t].nama} <span lang="ja">${t === "hiragana" ? "あ" : "ア"}</span></span>
        </label>`
      )
      .join("");

    el("huruf-progres").innerHTML = ["dasar", "dakuten", "kombinasi"]
      .map((jenis) => {
        const { hafal, total } = hitungHafal(materi.data, materi.kode, jenis);
        const persen = total ? Math.round((hafal / total) * 100) : 0;
        return `<div class="hp-baris">
          <div class="hp-judul"><span>${nama} ${NAMA_JENIS[jenis].toLowerCase()}</span><span>${hafal}/${total} sudah hafal</span></div>
          <div class="bilah kecil"><div style="width:${persen}%"></div></div>
        </div>`;
      })
      .join("");

    el("huruf-legenda").innerHTML = Object.entries(NAMA_STATUS)
      .map(([kunci, label]) => `<span class="legenda-isi"><span class="legenda-warna status-${kunci}"></span>${label}</span>`)
      .join("");

    const vokal = KOLOM_VOKAL.map((v) => ({ kunci: v, label: v }));
    const yoon = [
      { kunci: "a", label: "ya" },
      { kunci: "u", label: "yu" },
      { kunci: "o", label: "yo" },
    ];
    el("huruf-tabel").innerHTML =
      tabel(NAMA_JENIS.dasar, materi.data, BARIS_DASAR, vokal, materi.kode) +
      tabel(NAMA_JENIS.dakuten, materi.data, BARIS_DAKUTEN, vokal, materi.kode) +
      tabel(NAMA_JENIS.kombinasi, materi.data, BARIS_KOMBINASI, yoon, materi.kode) +
      `<p class="redup kecil">Klik huruf untuk melihat detail dan contoh katanya.</p>`;
  }

  el("huruf-tulisan").addEventListener("change", (e) => {
    tulisan = e.target.value;
    Penyimpanan.simpanPengaturanHuruf({ tulisan });
    tampilkanTabel();
  });

  el("huruf-tabel").addEventListener("click", (e) => {
    const tombol = e.target.closest(".sel-kana");
    if (!tombol) return;
    const m = materiHuruf();
    const materi = m[tulisan];
    const indeks = materi.data.findIndex((h) => h.id === Number(tombol.dataset.id));
    KartuDialog.buka(materi.data, indeks, (h) => kartuHuruf(h, materi, m.kosakata));
  });

  // ------------------------------------------------------------
  // DETAIL HURUF
  // ------------------------------------------------------------
  const HURUF_KECIL = /[ゃゅょャュョぁぃぅぇぉァィゥェォ]/;

  // Apakah teks memakai huruf ini? (き di きょう tidak dihitung, karena itu きょ)
  function memakai(teks, h) {
    let i = teks.indexOf(h.huruf);
    while (i >= 0) {
      const sesudah = teks[i + h.huruf.length] || "";
      if (h.jenis === "kombinasi" || !HURUF_KECIL.test(sesudah)) return true;
      i = teks.indexOf(h.huruf, i + 1);
    }
    return false;
  }

  function sorot(teks, h) {
    return aman(teks).split(h.huruf).join(`<mark class="sorot">${h.huruf}</mark>`);
  }

  // Contoh kata dari kosakata N5. Hiragana dicari di cara baca, katakana di tulisan katanya.
  function contohKata(h, kodeMateri, kosakata) {
    const sudah = new Set();
    return kosakata
      .map((v) => ({ v, teks: kodeMateri === "hiragana" ? v.baca.split(" / ")[0] : v.kata }))
      .filter(({ v, teks }) => !teks.includes("〜") && memakai(teks, h) && !sudah.has(v.kata) && sudah.add(v.kata))
      .sort((a, b) => (b.teks.startsWith(h.huruf) - a.teks.startsWith(h.huruf)) || a.teks.length - b.teks.length)
      .slice(0, 4);
  }

  function kartuHuruf(h, materi, kosakata) {
    const status = statusHuruf(materi.kode, h.id);
    const namaPasangan = materi.kode === "hiragana" ? "Katakana" : "Hiragana";
    const contoh = contohKata(h, materi.kode, kosakata);
    const daftarContoh = contoh.length
      ? `<ul class="kk-contoh">${contoh
          .map(
            ({ v, teks }) => `<li>
              <span class="kk-kata" lang="ja">${sorot(teks, h)}</span>
              ${v.kata !== teks ? `<span class="redup" lang="ja">${aman(v.kata)}</span>` : ""}
              <div><span class="romaji">${aman(v.romaji)} · </span>${aman(v.arti)}</div>
            </li>`
          )
          .join("")}</ul>`
      : `<p class="redup">Belum ada kata di kosakata N5 yang memakai huruf ini.</p>`;

    return `<article class="kartu-kanji kartu-huruf">
      <div class="kk-kepala">
        <div class="kk-huruf" lang="ja">${aman(h.huruf)}</div>
        <div>
          <p class="kh-romaji">${aman(h.romaji)}</p>
          <p class="kk-lencana">
            <span class="lencana">${aman(materi.nama)}</span>
            <span class="lencana">${NAMA_JENIS[h.jenis]}</span>
            <span class="lencana">baris ${aman(h.baris)}</span>
          </p>
          <p class="kh-status"><span class="legenda-warna status-${status}"></span>${NAMA_STATUS[status]}</p>
        </div>
      </div>
      <div class="kh-pasangan">
        <span>Pasangan ${namaPasangan}</span>
        <span class="kh-pasangan-huruf" lang="ja">${aman(h.pasangan)}</span>
      </div>
      ${
        h.romajiLain
          ? `<p class="redup kecil">Saat mengetik, ejaan ${h.romajiLain.map((r) => `"${aman(r)}"`).join(" atau ")} juga diterima.</p>`
          : ""
      }
      <h3 class="kk-judul">Contoh kata</h3>
      ${daftarContoh}
    </article>`;
  }

  return { materiHuruf, tampilkanTabel, kartuHuruf, statusHuruf, NAMA_STATUS, NAMA_JENIS };
})();
