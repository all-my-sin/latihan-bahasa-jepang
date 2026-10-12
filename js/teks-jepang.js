// ============================================================
// ALAT BANTU TULISAN JEPANG
// - furigana()   : menaruh cara baca kecil di atas kanji
// - keRomaji()   : mengubah hiragana/katakana menjadi huruf latin
// - bacaanKanji(): menampilkan okurigana (bagian dalam kurung) lebih pudar
// ============================================================

const TeksJepang = (() => {
  const POLA_KANJI = /[㐀-鿿々〆ヶ]/;

  function aman(teks) {
    return String(teks).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  }

  // カタカナ → ひらがな
  function keHiragana(teks) {
    return teks.replace(/[ァ-ヶ]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0x60));
  }

  // ------------------------------------------------------------
  // ROMAJI (gaya Hepburn, sama seperti kolom romaji di kosakata-n5.js)
  // ------------------------------------------------------------
  const DUA_HURUF = {
    きゃ: "kya", きゅ: "kyu", きょ: "kyo", しゃ: "sha", しゅ: "shu", しょ: "sho", ちゃ: "cha", ちゅ: "chu", ちょ: "cho",
    にゃ: "nya", にゅ: "nyu", にょ: "nyo", ひゃ: "hya", ひゅ: "hyu", ひょ: "hyo", みゃ: "mya", みゅ: "myu", みょ: "myo",
    りゃ: "rya", りゅ: "ryu", りょ: "ryo", ぎゃ: "gya", ぎゅ: "gyu", ぎょ: "gyo", じゃ: "ja", じゅ: "ju", じょ: "jo",
    ぢゃ: "ja", ぢゅ: "ju", ぢょ: "jo", びゃ: "bya", びゅ: "byu", びょ: "byo", ぴゃ: "pya", ぴゅ: "pyu", ぴょ: "pyo",
    ふぁ: "fa", ふぃ: "fi", ふぇ: "fe", ふぉ: "fo", てぃ: "ti", でぃ: "di", しぇ: "she", じぇ: "je", ちぇ: "che",
  };
  const SATU_HURUF = {
    あ: "a", い: "i", う: "u", え: "e", お: "o", か: "ka", き: "ki", く: "ku", け: "ke", こ: "ko",
    さ: "sa", し: "shi", す: "su", せ: "se", そ: "so", た: "ta", ち: "chi", つ: "tsu", て: "te", と: "to",
    な: "na", に: "ni", ぬ: "nu", ね: "ne", の: "no", は: "ha", ひ: "hi", ふ: "fu", へ: "he", ほ: "ho",
    ま: "ma", み: "mi", む: "mu", め: "me", も: "mo", や: "ya", ゆ: "yu", よ: "yo",
    ら: "ra", り: "ri", る: "ru", れ: "re", ろ: "ro", わ: "wa", ゐ: "i", ゑ: "e", を: "o", ん: "n",
    が: "ga", ぎ: "gi", ぐ: "gu", げ: "ge", ご: "go", ざ: "za", じ: "ji", ず: "zu", ぜ: "ze", ぞ: "zo",
    だ: "da", ぢ: "ji", づ: "zu", で: "de", ど: "do", ば: "ba", び: "bi", ぶ: "bu", べ: "be", ぼ: "bo",
    ぱ: "pa", ぴ: "pi", ぷ: "pu", ぺ: "pe", ぽ: "po", ぁ: "a", ぃ: "i", ぅ: "u", ぇ: "e", ぉ: "o", ゔ: "vu",
    "〜": "~",
  };

  function keRomaji(kana) {
    const teks = keHiragana(kana);
    let hasil = "";
    let gandakan = false; // setelah っ, konsonan berikutnya digandakan
    let setelahN = false; // huruf sebelumnya ん
    for (let i = 0; i < teks.length; i++) {
      const c = teks[i];
      if (c === "っ") {
        gandakan = true;
        continue;
      }
      if (c === "ー") {
        hasil += hasil.slice(-1); // ー memanjangkan huruf hidup sebelumnya
        continue;
      }
      let r = DUA_HURUF[teks.slice(i, i + 2)];
      if (r) i++;
      else r = SATU_HURUF[c] ?? c;
      if (gandakan) {
        r = r.startsWith("ch") ? "t" + r : r[0] + r;
        gandakan = false;
      }
      // ん sebelum huruf hidup atau "y" ditulis n' (contoh: ten'in)
      if (setelahN && /^[aiueoy]/.test(r)) hasil += "'";
      setelahN = c === "ん";
      hasil += r;
    }
    return hasil;
  }

  // ------------------------------------------------------------
  // FURIGANA
  // 食べ物 + たべもの → <ruby>食<rt>た</rt></ruby>べ<ruby>物<rt>もの</rt></ruby>
  // Bagian hiragana dipakai sebagai "patokan" untuk memotong cara bacanya.
  // ------------------------------------------------------------
  function furigana(kata, baca) {
    const bacaUtama = String(baca).split(" / ")[0];
    if (!POLA_KANJI.test(kata)) return aman(kata);

    const bagian = kata.match(/[㐀-鿿々〆ヶ]+|[^㐀-鿿々〆ヶ]+/g);
    const pola = bagian
      .map((b) => (POLA_KANJI.test(b) ? "(.+?)" : "(" + keHiragana(b).replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")"))
      .join("");
    const cocok = new RegExp("^" + pola + "$").exec(bacaUtama);

    const ruby = (k, r) => `<ruby>${aman(k)}<rp>(</rp><rt>${aman(r)}</rt><rp>)</rp></ruby>`;
    if (!cocok) return ruby(kata, bacaUtama);
    return bagian.map((b, i) => (POLA_KANJI.test(b) ? ruby(b, cocok[i + 1]) : aman(b))).join("");
  }

  // ------------------------------------------------------------
  // BACAAN KANJI DENGAN OKURIGANA
  // "た(べる)" → た + <span class="okurigana">べる</span>
  // ------------------------------------------------------------
  function bacaanKanji(bacaan) {
    const [batang, oku] = bacaan.replace(")", "").split("(");
    return aman(batang) + (oku ? `<span class="okurigana">${aman(oku)}</span>` : "");
  }

  function tanpaKurung(bacaan) {
    return bacaan.replace(/[()]/g, "");
  }

  return { POLA_KANJI, aman, keHiragana, keRomaji, furigana, bacaanKanji, tanpaKurung };
})();
