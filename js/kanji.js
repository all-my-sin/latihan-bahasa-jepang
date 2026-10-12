// ============================================================
// FITUR KANJI
// - kartu()          : membuat tampilan kartu kanji (dipakai di banyak tempat)
// - tampilkanDaftar(): halaman "Daftar kanji" berbentuk grid
// - bukaKartu()      : membuka kartu kanji di atas halaman
// ============================================================

const Kanji = (() => {
  const { aman, furigana, keRomaji, bacaanKanji, tanpaKurung } = TeksJepang;
  const el = (id) => document.getElementById(id);

  const LABEL_JENIS = { kunyomi: "Kunyomi", onyomi: "Onyomi", khusus: "Bacaan khusus" };

  // Semua data kanji dari bahasa yang punya materi berjenis "kanji".
  function semuaKanji() {
    for (const bahasa of DAFTAR_BAHASA) {
      const materi = bahasa.materi.find((m) => m.jenis === "kanji");
      if (materi) return { bahasa, materi, data: materi.data };
    }
    return { bahasa: null, materi: null, data: [] };
  }

  // ------------------------------------------------------------
  // KARTU KANJI
  // ------------------------------------------------------------
  function daftarBacaan(bacaan, jenis) {
    if (!bacaan.length) return `<span class="redup kecil">— tidak ada</span>`;
    return bacaan
      .map(
        (b) => `<span class="bacaan bacaan-${jenis}">
          <span lang="ja">${bacaanKanji(b)}</span>
          <span class="romaji">${aman(keRomaji(tanpaKurung(b)))}</span>
        </span>`
      )
      .join("");
  }

  function contohKata(c) {
    return `<li>
      <div class="kk-contoh-atas">
        <span class="kk-kata" lang="ja">${furigana(c.kata, c.baca)}</span>
        <span class="label label-${c.jenisBaca}">${LABEL_JENIS[c.jenisBaca]}</span>
      </div>
      <div><span class="romaji">${aman(keRomaji(c.baca))} · </span>${aman(c.arti)}</div>
      ${c.catatan ? `<p class="kk-catatan">⭐ ${aman(c.catatan)}</p>` : ""}
    </li>`;
  }

  function kotakTips(k) {
    return `<div class="kk-tips">
      <div class="tips"><b>💡 Tips mengingat</b><p>${aman(k.tips)}</p></div>
      <button type="button" class="tombol-kecil" data-aksi="tips">
        <span class="saat-tips-tampil">Sembunyikan tips</span>
        <span class="saat-tips-sembunyi">💡 Tampilkan tips</span>
      </button>
    </div>`;
  }

  function kartu(k) {
    return `<article class="kartu-kanji">
      <div class="kk-kepala">
        <div class="kk-huruf" lang="ja">${aman(k.kanji)}</div>
        <div>
          <p class="kk-arti">${aman(k.arti)}</p>
          <p class="kk-lencana">
            <span class="lencana">${aman(k.level)}</span>
            <span class="lencana">${k.jumlahGoresan} goresan</span>
            <span class="lencana">${aman(k.kategori)}</span>
          </p>
        </div>
      </div>

      <div class="kk-baris">
        <span class="label label-kunyomi">Kunyomi</span>
        <div class="kk-bacaan">${daftarBacaan(k.kunyomi, "kunyomi")}</div>
      </div>
      <div class="kk-baris">
        <span class="label label-onyomi">Onyomi</span>
        <div class="kk-bacaan">${daftarBacaan(k.onyomi, "onyomi")}</div>
      </div>

      <h3 class="kk-judul">Contoh kata</h3>
      <ul class="kk-contoh">${k.contoh.map(contohKata).join("")}</ul>

      ${kotakTips(k)}

      <details class="kk-penjelasan">
        <summary>Apa itu kunyomi dan onyomi?</summary>
        <ul>
          <li><span class="label label-kunyomi">Kunyomi</span> (<span lang="ja">訓読み</span>) = cara baca <b>asli Jepang</b>, ditulis dengan <b>hiragana</b>. Biasanya dipakai kalau kanji berdiri sendiri (<span lang="ja">山 = やま</span>) atau diikuti hiragana (<span lang="ja">食べる = たべる</span>).</li>
          <li><span class="label label-onyomi">Onyomi</span> (<span lang="ja">音読み</span>) = cara baca yang <b>berasal dari bahasa Tiongkok</b>, ditulis dengan <b>katakana</b>. Biasanya dipakai kalau kanji bergabung dengan kanji lain (<span lang="ja">火山 = かざん</span>).</li>
          <li><span class="label label-khusus">Bacaan khusus</span> = kata yang cara bacanya tidak mengikuti aturan di atas, jadi harus dihafal (<span lang="ja">今日 = きょう</span>).</li>
          <li>Huruf yang lebih <span class="okurigana">pudar</span> adalah <b>okurigana</b>: hiragana yang ditulis setelah kanji. Contoh: <span lang="ja">た<span class="okurigana">べる</span> → 食べる</span>.</li>
          <li>Label di setiap contoh kata menunjukkan cara baca kanji <span lang="ja">${aman(k.kanji)}</span> di dalam kata itu.</li>
        </ul>
      </details>
    </article>`;
  }

  // ------------------------------------------------------------
  // HALAMAN DAFTAR KANJI
  // ------------------------------------------------------------
  let levelDipilih = null;
  let urutanTampil = []; // urutan kanji seperti di layar (untuk tombol ‹ ›)
  let posisiKartu = -1;

  function tampilkanDaftar() {
    const { bahasa, data } = semuaKanji();
    if (!bahasa) return;
    const levelAda = bahasa.level.filter((lv) => data.some((k) => k.level === lv));
    if (!levelAda.includes(levelDipilih)) levelDipilih = levelAda[0];

    el("kanji-level").innerHTML = bahasa.level
      .map((lv) => {
        const ada = levelAda.includes(lv);
        return `<label class="chip${ada ? "" : " nonaktif"}">
          <input type="radio" name="kanji-level" value="${lv}" ${lv === levelDipilih ? "checked" : ""} ${ada ? "" : "disabled"}>
          <span>${lv}${ada ? "" : " <small>(belum ada)</small>"}</span>
        </label>`;
      })
      .join("");

    const kanjiLevel = data.filter((k) => k.level === levelDipilih);
    el("kanji-ringkasan").textContent = `${levelDipilih}: ${kanjiLevel.length} kanji. Klik kanji untuk membuka kartunya.`;

    // Kelompokkan sesuai kategori, urutan kategori mengikuti urutan di file data
    const kategori = [];
    kanjiLevel.forEach((k) => kategori.includes(k.kategori) || kategori.push(k.kategori));
    urutanTampil = [];
    el("kanji-grid").innerHTML = kategori
      .map((kat) => {
        const isi = kanjiLevel.filter((k) => k.kategori === kat);
        urutanTampil.push(...isi);
        return `<h2 class="judul-kategori">${aman(kat)} <small class="redup">${isi.length}</small></h2>
          <div class="grid-kanji">
            ${isi
              .map(
                (k) => `<button type="button" class="sel-kanji" data-id="${k.id}">
                  <span class="sel-huruf" lang="ja">${aman(k.kanji)}</span>
                  <span class="sel-arti">${aman(k.arti.split(";")[0])}</span>
                </button>`
              )
              .join("")}
          </div>`;
      })
      .join("");
  }

  el("kanji-level").addEventListener("change", (e) => {
    levelDipilih = e.target.value;
    tampilkanDaftar();
  });

  el("kanji-grid").addEventListener("click", (e) => {
    const sel = e.target.closest(".sel-kanji");
    if (!sel) return;
    const indeks = urutanTampil.findIndex((k) => k.id === Number(sel.dataset.id));
    bukaKartu(indeks);
  });

  // ------------------------------------------------------------
  // KARTU DI ATAS HALAMAN (dialog)
  // ------------------------------------------------------------
  const dialog = el("dialog-kanji");

  function bukaKartu(indeks) {
    if (indeks < 0 || indeks >= urutanTampil.length) return;
    posisiKartu = indeks;
    el("dialog-kanji-isi").innerHTML = kartu(urutanTampil[indeks]);
    el("kanji-posisi").textContent = `${indeks + 1} / ${urutanTampil.length}`;
    el("kanji-sebelum").disabled = indeks === 0;
    el("kanji-berikut").disabled = indeks === urutanTampil.length - 1;
    if (!dialog.open) dialog.showModal();
    dialog.scrollTop = 0;
  }

  el("kanji-sebelum").addEventListener("click", () => bukaKartu(posisiKartu - 1));
  el("kanji-berikut").addEventListener("click", () => bukaKartu(posisiKartu + 1));
  el("kanji-tutup").addEventListener("click", () => dialog.close());
  // Klik di luar kartu (bagian gelap) juga menutup
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) dialog.close();
  });
  // Tombol panah kiri/kanan di laptop
  dialog.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") bukaKartu(posisiKartu - 1);
    if (e.key === "ArrowRight") bukaKartu(posisiKartu + 1);
  });

  return { semuaKanji, kartu, tampilkanDaftar };
})();
