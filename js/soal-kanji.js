// ============================================================
// PEMBUAT SOAL PILIHAN GANDA KANJI
// Empat jenis soal:
//   arti  : 山 → pilih "gunung"
//   baca  : 山 → pilih kunyomi / onyomi yang benar
//   kanji : "gunung" → pilih 山
//   contoh: 火山 → pilih かざん
// Aturan: selalu 4 pilihan, tidak ada pilihan yang sama, dan tidak
// ada dua pilihan yang sama-sama benar.
// ============================================================

const SoalKanji = (() => {
  const { aman, keHiragana, keRomaji, bacaanKanji, tanpaKurung, furigana } = TeksJepang;

  const JENIS = {
    arti: { label: "Kanji → Arti", contoh: "山 → gunung" },
    baca: { label: "Kanji → Cara baca", contoh: "山 → やま / サン" },
    kanji: { label: "Arti → Kanji", contoh: "gunung → 山" },
    contoh: { label: "Kata contoh → Cara baca", contoh: "火山 → かざん" },
  };

  // ------------------------------------------------------------
  // ALAT BANTU
  // ------------------------------------------------------------
  function acak(daftar) {
    const hasil = [...daftar];
    for (let i = hasil.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [hasil[i], hasil[j]] = [hasil[j], hasil[i]];
    }
    return hasil;
  }
  const pilihAcak = (daftar) => daftar[Math.floor(Math.random() * daftar.length)];

  // "hari (dalam seminggu); matahari" → ["hari", "matahari"]
  function bagianArti(arti) {
    return arti
      .toLowerCase()
      .split(/[;/]/)
      .map((s) => s.replace(/\(.*?\)/g, "").trim())
      .filter(Boolean);
  }
  // true kalau dua arti punya bagian yang sama (bisa sama-sama benar)
  function artiBentrok(a, b) {
    const x = bagianArti(a);
    return bagianArti(b).some((p) => x.includes(p));
  }

  // Bacaan dalam hiragana tanpa kurung: "タ" → "た", "た(べる)" → "たべる"
  const lengkap = (r) => keHiragana(tanpaKurung(r));
  // Bagian sebelum okurigana: "た(べる)" → "た"
  const batang = (r) => keHiragana(r.split("(")[0]);

  // Semua bentuk bacaan sebuah kanji (lengkap dan batangnya),
  // termasuk bacaan jarang, supaya tidak ada yang dipakai sebagai pilihan salah.
  function semuaBacaan(k) {
    const hasil = new Set();
    [...k.kunyomi, ...k.onyomi, ...(k.bacaanJarang || [])].forEach((r) => {
      hasil.add(lengkap(r));
      hasil.add(batang(r));
    });
    return hasil;
  }

  // Peta kanji mirip: 木 → {本, 休, ...}
  function buatPetaMirip(materi) {
    const peta = new Map();
    (materi.mirip || []).forEach((grup) => {
      const isi = [...grup];
      isi.forEach((k) => {
        if (!peta.has(k)) peta.set(k, new Set());
        isi.forEach((l) => l !== k && peta.get(k).add(l));
      });
    });
    return peta;
  }

  // ------------------------------------------------------------
  // HTML untuk pilihan dan penjelasan
  // ------------------------------------------------------------
  const htmlBacaan = (r) =>
    `<span class="opsi-baca"><span lang="ja">${bacaanKanji(r)}</span><span class="romaji">${aman(keRomaji(tanpaKurung(r)))}</span></span>`;
  const htmlHiragana = (teks) =>
    `<span class="opsi-baca"><span lang="ja">${aman(teks)}</span><span class="romaji">${aman(keRomaji(teks))}</span></span>`;
  const htmlKanjiBesar = (k) => `<span class="opsi-kanji" lang="ja">${aman(k.kanji)}</span>`;
  const LABEL = {
    kunyomi: `<span class="label label-kunyomi">Kunyomi</span>`,
    onyomi: `<span class="label label-onyomi">Onyomi</span>`,
    khusus: `<span class="label label-khusus">Bacaan khusus</span>`,
  };

  // ------------------------------------------------------------
  // MEMILIH PENGECOH (pilihan yang salah)
  // kandidat: [{ nilai, kunci, skor, ... }]  (skor kecil = lebih diutamakan)
  // bentrok(a, b): true kalau a dan b tidak boleh muncul bersamaan
  // ------------------------------------------------------------
  function pilihPengecoh(kandidat, benar, bentrok, jumlah = 3) {
    const terpilih = [];
    kandidat
      .map((c) => ({ ...c, skor: c.skor + Math.random() * 1.5 }))
      .sort((a, b) => a.skor - b.skor)
      .forEach((c) => {
        if (terpilih.length >= jumlah) return;
        if (bentrok(benar, c)) return;
        if (terpilih.some((t) => bentrok(t, c))) return;
        terpilih.push(c);
      });
    return terpilih;
  }

  function susunPilihan(benar, pengecoh) {
    const semua = acak([{ ...benar, benar: true }, ...pengecoh]);
    return { pilihan: semua, jawabanBenar: semua.findIndex((p) => p.benar) };
  }

  // ------------------------------------------------------------
  // JENIS 1 & 3: arti ↔ kanji
  // ------------------------------------------------------------
  function kandidatKanji(k, ctx) {
    const mirip = ctx.peta.get(k.kanji) || new Set();
    return ctx.semua
      .filter((x) => x !== k)
      .map((x) => ({
        asal: x,
        skor: mirip.has(x.kanji) ? 0 : x.kategori === k.kategori ? 1.2 : 2.6,
      }));
  }
  const bentrokArti = (a, b) => a.asal.kanji === b.asal.kanji || artiBentrok(a.asal.arti, b.asal.arti);

  function soalArti(k, ctx) {
    const benar = { asal: k };
    const pengecoh = pilihPengecoh(kandidatKanji(k, ctx), benar, bentrokArti);
    const { pilihan, jawabanBenar } = susunPilihan(benar, pengecoh);
    return {
      perintahHtml: "Apa arti kanji ini?",
      soalHtml: `<span lang="ja">${aman(k.kanji)}</span>`,
      kelasSoal: "jepang kanji",
      pilihan: pilihan.map((p) => ({ ...p, html: aman(p.asal.arti) })),
      jawabanBenar,
      teksBenar: `${aman(k.kanji)} = <b>${aman(k.arti)}</b>`,
      jelaskanPilihan: (p) => `<span lang="ja">${aman(p.asal.kanji)}</span> artinya ${aman(p.asal.arti)}`,
    };
  }

  function soalKanji(k, ctx) {
    const benar = { asal: k };
    const pengecoh = pilihPengecoh(kandidatKanji(k, ctx), benar, bentrokArti);
    const { pilihan, jawabanBenar } = susunPilihan(benar, pengecoh);
    return {
      perintahHtml: "Mana kanji untuk arti ini?",
      soalHtml: aman(k.arti),
      kelasSoal: "",
      kelasPilihan: "pilihan-kanji",
      pilihan: pilihan.map((p) => ({ ...p, html: htmlKanjiBesar(p.asal) })),
      jawabanBenar,
      teksBenar: `<b lang="ja">${aman(k.kanji)}</b> = ${aman(k.arti)}`,
      jelaskanPilihan: (p) => `<span lang="ja">${aman(p.asal.kanji)}</span> artinya ${aman(p.asal.arti)}`,
    };
  }

  // ------------------------------------------------------------
  // JENIS 2: kanji → kunyomi / onyomi
  // ------------------------------------------------------------
  function soalBaca(k, ctx) {
    const jenis = pilihAcak(["kunyomi", "onyomi"].filter((j) => k[j].length));
    const bacaanBenar = pilihAcak(k[jenis]);
    const milikTarget = semuaBacaan(k);
    const mirip = ctx.peta.get(k.kanji) || new Set();
    const awalBenar = batang(bacaanBenar)[0];

    const kandidat = [];
    ctx.semua
      .filter((x) => x !== k)
      .forEach((x) =>
        x[jenis].forEach((r) =>
          kandidat.push({
            r,
            asal: x,
            skor:
              (mirip.has(x.kanji) ? 0 : 1.5) +
              (batang(r)[0] === awalBenar ? 0 : 1) +
              Math.abs(lengkap(r).length - lengkap(bacaanBenar).length) * 0.3,
          })
        )
      );

    // Bacaan yang juga milik kanji target tidak boleh jadi pengecoh,
    // dan dua pilihan tidak boleh tertulis sama.
    const bentrok = (a, b) =>
      lengkap(a.r) === lengkap(b.r) ||
      (a === benar && (milikTarget.has(lengkap(b.r)) || milikTarget.has(batang(b.r))));
    const benar = { r: bacaanBenar, asal: k };
    const pengecoh = pilihPengecoh(kandidat, benar, bentrok);
    const { pilihan, jawabanBenar } = susunPilihan(benar, pengecoh);

    return {
      perintahHtml: `Pilih ${LABEL[jenis]} yang benar untuk kanji ini`,
      soalHtml: `<span lang="ja">${aman(k.kanji)}</span>`,
      kelasSoal: "jepang kanji",
      kelasPilihan: "pilihan-baca",
      pilihan: pilihan.map((p) => ({ ...p, html: htmlBacaan(p.r) })),
      jawabanBenar,
      teksBenar: `${jenis === "kunyomi" ? "Kunyomi" : "Onyomi"} <span lang="ja">${aman(k.kanji)}</span>: <b lang="ja">${bacaanKanji(bacaanBenar)}</b>`,
      jelaskanPilihan: (p) =>
        `<span lang="ja">${bacaanKanji(p.r)}</span> adalah ${jenis} dari <span lang="ja">${aman(p.asal.kanji)}</span> (${aman(p.asal.arti)})`,
      jenisBaca: jenis,
    };
  }

  // ------------------------------------------------------------
  // JENIS 4: kata contoh → cara baca
  // Pilihan salah dibuat dari "jebakan" yang biasa ada di soal JLPT:
  //   - bacaan lain dari kanji yang sama (火山: かざん → ひざん)
  //   - tanda dakuten (かざん → かさん)
  //   - bunyi panjang (こうこう → ここう)
  //   - huruf kecil っ / ゃゅょ (がっこう → がこう, きょう → きよう)
  // ------------------------------------------------------------
  const DAKUTEN = {};
  [
    ["か", "が"], ["き", "ぎ"], ["く", "ぐ"], ["け", "げ"], ["こ", "ご"],
    ["さ", "ざ"], ["し", "じ"], ["す", "ず"], ["せ", "ぜ"], ["そ", "ぞ"],
    ["た", "だ"], ["て", "で"], ["と", "ど"],
    ["は", "ば", "ぱ"], ["ひ", "び", "ぴ"], ["ふ", "ぶ", "ぷ"], ["へ", "べ", "ぺ"], ["ほ", "ぼ", "ぽ"],
  ].forEach((grup) => grup.forEach((h) => (DAKUTEN[h] = grup.filter((x) => x !== h))));
  const KECIL = { ゃ: "や", ゅ: "ゆ", ょ: "よ" };
  const BARIS_O_U = /[おこごそぞとどのほぼぽもよろょうくぐすずつづぬふぶぷむゆるゅ]/;
  const BISA_DIGANDAKAN = /[かきくけこさしすせそたちつてとぱぴぷぺぽ]/;

  function mutasi(baca) {
    const hasil = new Set();
    const ganti = (i, isi, panjang = 1) => hasil.add(baca.slice(0, i) + isi + baca.slice(i + panjang));
    for (let i = 0; i < baca.length; i++) {
      const c = baca[i];
      (DAKUTEN[c] || []).forEach((alt) => ganti(i, alt));
      if (KECIL[c]) ganti(i, KECIL[c]);
      if ((c === "う" || c === "お") && i > 0 && BARIS_O_U.test(baca[i - 1])) {
        ganti(i, ""); // hapus bunyi panjang
        ganti(i, c === "う" ? "お" : "う");
      }
      // hapus っ (kecuali pola hitungan seperti みっつ)
      if (c === "っ" && !baca.endsWith("つ")) ganti(i, "");
      // sisipkan っ
      if (i > 0 && BISA_DIGANDAKAN.test(c) && !/[っんー]/.test(baca[i - 1])) ganti(i, "っ" + c, 1);
      // sisipkan bunyi panjang う
      if (BARIS_O_U.test(c) && c !== "う" && baca[i + 1] !== "う" && baca[i + 1] !== "お" && !KECIL[baca[i + 1]]) {
        ganti(i + 1, "う", 0);
      }
    }
    return hasil;
  }

  // Bentuk bacaan kanji di dalam kata (dengan perubahan bunyi)
  const DAKU_AWAL = { か: "が", き: "ぎ", く: "ぐ", け: "げ", こ: "ご", さ: "ざ", し: "じ", す: "ず", せ: "ぜ", そ: "ぞ", た: "だ", ち: "ぢ", つ: "づ", て: "で", と: "ど", は: "ば", ひ: "び", ふ: "ぶ", へ: "べ", ほ: "ぼ" };
  const HANDAKU_AWAL = { は: "ぱ", ひ: "ぴ", ふ: "ぷ", へ: "ぺ", ほ: "ぽ" };
  function bentukBunyi(r) {
    const dasar = batang(r);
    const hasil = new Set([dasar]);
    if (DAKU_AWAL[dasar[0]]) hasil.add(DAKU_AWAL[dasar[0]] + dasar.slice(1));
    if (HANDAKU_AWAL[dasar[0]]) hasil.add(HANDAKU_AWAL[dasar[0]] + dasar.slice(1));
    [...hasil].forEach((x) => /[つくちき]$/.test(x) && x.length > 1 && hasil.add(x.slice(0, -1) + "っ"));
    return [...hasil].sort((a, b) => b.length - a.length);
  }

  // Ganti bagian bacaan kanji target dengan bacaan lainnya (火山: か → ひ)
  function gantiBagian(k, c) {
    if (c.jenisBaca === "khusus" || c.kata.length < 2) return [];
    const daftar = c.jenisBaca === "onyomi" ? k.onyomi : k.kunyomi;
    for (const r of daftar) {
      for (const bentuk of bentukBunyi(r)) {
        const posisi = c.baca.indexOf(bentuk);
        if (posisi < 0) continue;
        const lain = [...new Set([...k.kunyomi, ...k.onyomi].map(batang))].filter((x) => x !== batang(r));
        return lain.map((x) => c.baca.slice(0, posisi) + x + c.baca.slice(posisi + bentuk.length));
      }
    }
    return [];
  }

  const POLA_ANEH = /^[っんーゃゅょ]|っっ|んっ|っ$|ー$|[ゃゅょ][ゃゅょ]|っ[あいうえおなにぬねのまみむめもやゆよらりるれろわをんゃゅょ]/;

  function soalContoh(k, ctx) {
    const c = pilihAcak(k.contoh);

    // Semua cara baca yang BENAR untuk kata ini (tidak boleh jadi pengecoh)
    const sah = new Set([c.baca, ...(c.bacaLain || [])]);
    ctx.semua.forEach((x) => x.contoh.forEach((y) => y.kata === c.kata && [y.baca, ...(y.bacaLain || [])].forEach((b) => sah.add(b))));
    ctx.kosakata.forEach((v) => v.kata === c.kata && v.baca.split(" / ").forEach((b) => sah.add(b.trim())));
    // Kata yang hanya satu kanji: semua bacaan kanji itu (juga bentuk
    // perubahan bunyinya, misalnya ひ → び) dianggap mungkin benar
    if (c.kata.length === 1) {
      [...k.kunyomi, ...k.onyomi, ...(k.bacaanJarang || [])].forEach((r) => {
        sah.add(lengkap(r));
        bentukBunyi(r).forEach((b) => sah.add(b));
      });
    }

    const kandidat = [];
    gantiBagian(k, c).forEach((b) => kandidat.push({ b, skor: 0 }));
    mutasi(c.baca).forEach((b) => kandidat.push({ b, skor: 0.8 }));
    // Cadangan: bacaan kata contoh lain yang huruf awal dan panjangnya mirip
    ctx.semua.forEach((x) =>
      x.contoh.forEach((y) =>
        kandidat.push({ b: y.baca, skor: 3 + Math.abs(y.baca.length - c.baca.length) * 0.6 + (y.baca[0] === c.baca[0] ? 0 : 2.5) })
      )
    );

    const bentrok = (a, b) => a.b === b.b || sah.has(b.b) || POLA_ANEH.test(b.b);
    const benar = { b: c.baca };
    const pengecoh = pilihPengecoh(kandidat, benar, bentrok);
    const { pilihan, jawabanBenar } = susunPilihan(benar, pengecoh);

    const tandaKhusus = c.jenisBaca === "khusus" ? `<span class="label label-khusus tanda-khusus">bacaan khusus</span>` : "";
    return {
      perintahHtml: "Bagaimana cara membaca kata ini?",
      soalHtml: `<span lang="ja">${aman(c.kata)}</span>${tandaKhusus}<span class="arti-soal">${aman(c.arti)}</span>`,
      kelasSoal: "jepang",
      kelasPilihan: "pilihan-baca",
      pilihan: pilihan.map((p) => ({ ...p, html: htmlHiragana(p.b) })),
      jawabanBenar,
      teksBenar: `<span class="kk-kata" lang="ja">${furigana(c.kata, c.baca)}</span> <span class="romaji">(${aman(keRomaji(c.baca))})</span> = ${aman(c.arti)} ${LABEL[c.jenisBaca]}${
        c.catatan ? `<span class="kk-catatan blok">⭐ ${aman(c.catatan)}</span>` : ""
      }`,
      jelaskanPilihan: (p) => `<span lang="ja">${aman(p.b)}</span> bukan cara baca <span lang="ja">${aman(c.kata)}</span>`,
      contoh: c,
    };
  }

  // ------------------------------------------------------------
  // MEMBUAT SESI
  // ------------------------------------------------------------
  const PEMBUAT = { arti: soalArti, baca: soalBaca, kanji: soalKanji, contoh: soalContoh };

  function konteks(materi, kosakata) {
    return { semua: materi.data, peta: buatPetaMirip(materi), kosakata: kosakata || [] };
  }

  function buatSatu(k, jenis, ctx) {
    const s = PEMBUAT[jenis](k, ctx);
    return {
      ...s,
      jenisSoal: jenis,
      kanji: k,
      kunci: `id:${k.id}`,
      kategori: k.kategori,
    };
  }

  // pengaturan: { level: ["N5"], jenis: ["arti", "baca", ...], jumlah: 10 }
  function buatSesi(materi, pengaturan, kosakata) {
    const ctx = konteks(materi, kosakata);
    const kumpulan = acak(materi.data.filter((k) => pengaturan.level.includes(k.level))).slice(0, pengaturan.jumlah);
    // Bagi jenis soal secara merata, lalu acak urutannya
    const jenis = acak(kumpulan.map((_, i) => pengaturan.jenis[i % pengaturan.jenis.length]));
    return kumpulan.map((k, i) => buatSatu(k, jenis[i], ctx));
  }

  // Soal baru untuk kanji (dan jenis soal) yang sama — untuk "Ulangi yang salah"
  function buatUlang(materi, soalLama, kosakata) {
    const ctx = konteks(materi, kosakata);
    return acak(soalLama).map((s) => buatSatu(s.kanji, s.jenisSoal, ctx));
  }

  function hitungTersedia(materi, level) {
    return materi.data.filter((k) => level.includes(k.level)).length;
  }

  return { JENIS, buatSesi, buatUlang, hitungTersedia, mutasi, artiBentrok, semuaBacaan, lengkap, batang };
})();
