// =============================================================
// DAFTAR KANJI JLPT N5 (105 kanji)
// -------------------------------------------------------------
// Sumber: file kanji-n5.js milikmu (103 kanji), ditambah 魚 dan 空.
//
// Keterangan tiap data:
//   id             : nomor urut (dipakai untuk menyimpan progres, jangan diubah)
//   kanji          : huruf kanjinya
//   kategori       : kelompok di halaman "Daftar kanji"
//   level          : "N5" atau "N4"
//   jumlahGoresan  : jumlah goresan
//   onyomi         : cara baca versi Tiongkok (ditulis dengan katakana)
//   kunyomi        : cara baca asli Jepang (ditulis dengan hiragana)
//                    Huruf di dalam kurung = okurigana, yaitu hiragana
//                    yang ditulis setelah kanji. Contoh: た(べる) → 食べる
//   bacaanJarang   : (tidak wajib) cara baca lain yang jarang dipakai.
//                    Tidak ditampilkan di kartu, tapi tidak akan dipakai
//                    sebagai pilihan jawaban yang salah.
//   arti           : arti dalam bahasa Indonesia
//   tips           : cerita singkat untuk membantu mengingat bentuknya
//   contoh         : 2–3 kata contoh. Setiap contoh berisi:
//                      kata, baca (hiragana), arti, dan
//                      jenisBaca = cara baca kanji INI di dalam kata itu:
//                        "kunyomi", "onyomi", atau
//                        "khusus" (bacaan khusus yang harus dihafal,
//                                  diberi penjelasan di "catatan")
//                    bacaLain (tidak wajib) = cara baca lain yang juga
//                      benar, supaya tidak dipakai sebagai pilihan salah.
//                      Contoh: 七時 → bacaLain: ["ななじ"]
//
// Catatan: daftar N5 resmi tidak diterbitkan lagi sejak 2010,
// jadi daftar ini mengikuti daftar yang umum dipakai buku latihan.
// =============================================================

const KANJI_N5 = [
  // ---------- ANGKA ----------
  {
    id: 1, kanji: "一", kategori: "Angka", level: "N5", jumlahGoresan: 1,
    onyomi: ["イチ", "イツ"], kunyomi: ["ひと", "ひと(つ)"], arti: "satu",
    tips: "Satu garis mendatar = satu.",
    contoh: [
      { kata: "一つ", baca: "ひとつ", arti: "satu buah", jenisBaca: "kunyomi" },
      { kata: "一月", baca: "いちがつ", arti: "Januari", jenisBaca: "onyomi" },
      { kata: "一日", baca: "ついたち", arti: "tanggal 1", jenisBaca: "khusus", catatan: "Bacaan khusus untuk \"tanggal 1\". Kalau artinya \"satu hari\", dibaca いちにち." },
    ],
  },
  {
    id: 2, kanji: "二", kategori: "Angka", level: "N5", jumlahGoresan: 2,
    onyomi: ["ニ"], kunyomi: ["ふた", "ふた(つ)"], arti: "dua",
    tips: "Dua garis mendatar = dua. Garis bawah lebih panjang.",
    contoh: [
      { kata: "二つ", baca: "ふたつ", arti: "dua buah", jenisBaca: "kunyomi" },
      { kata: "二月", baca: "にがつ", arti: "Februari", jenisBaca: "onyomi" },
      { kata: "二人", baca: "ふたり", arti: "dua orang", jenisBaca: "khusus", catatan: "Bacaan khusus. Mulai tiga orang memakai 〜にん, misalnya 三人 (さんにん)." },
    ],
  },
  {
    id: 3, kanji: "三", kategori: "Angka", level: "N5", jumlahGoresan: 3,
    onyomi: ["サン"], kunyomi: ["み", "みっ(つ)"], arti: "tiga",
    bacaanJarang: ["み(つ)"],
    tips: "Tiga garis mendatar = tiga. Garis paling bawah paling panjang.",
    contoh: [
      { kata: "三月", baca: "さんがつ", arti: "bulan Maret", jenisBaca: "onyomi" },
      { kata: "三つ", baca: "みっつ", arti: "tiga buah", jenisBaca: "kunyomi" },
      { kata: "三日", baca: "みっか", arti: "tanggal 3 / 3 hari", jenisBaca: "kunyomi" },
    ],
  },
  {
    id: 4, kanji: "四", kategori: "Angka", level: "N5", jumlahGoresan: 5,
    onyomi: ["シ"], kunyomi: ["よ", "よん", "よっ(つ)"], arti: "empat",
    tips: "Sebuah jendela dengan empat sisi, di dalamnya ada tirai yang terbuka.",
    contoh: [
      { kata: "四時", baca: "よじ", arti: "jam empat", jenisBaca: "kunyomi" },
      { kata: "四月", baca: "しがつ", arti: "April", jenisBaca: "onyomi" },
      { kata: "四つ", baca: "よっつ", arti: "empat buah", jenisBaca: "kunyomi" },
    ],
  },
  {
    id: 5, kanji: "五", kategori: "Angka", level: "N5", jumlahGoresan: 4,
    onyomi: ["ゴ"], kunyomi: ["いつ", "いつ(つ)"], arti: "lima",
    tips: "Garis atas dan bawah mengapit bentuk zig-zag di tengah — bayangkan angka 5 yang ditulis kaku.",
    contoh: [
      { kata: "五分", baca: "ごふん", arti: "lima menit", jenisBaca: "onyomi" },
      { kata: "五つ", baca: "いつつ", arti: "lima buah", jenisBaca: "kunyomi" },
      { kata: "五日", baca: "いつか", arti: "tanggal 5 / 5 hari", jenisBaca: "kunyomi" },
    ],
  },
  {
    id: 6, kanji: "六", kategori: "Angka", level: "N5", jumlahGoresan: 4,
    onyomi: ["ロク"], kunyomi: ["む", "むっ(つ)"], arti: "enam",
    bacaanJarang: ["むい"],
    tips: "Orang memakai topi (titik dan garis di atas) dengan dua kaki terbuka.",
    contoh: [
      { kata: "六月", baca: "ろくがつ", arti: "bulan Juni", jenisBaca: "onyomi" },
      { kata: "六つ", baca: "むっつ", arti: "enam buah", jenisBaca: "kunyomi" },
    ],
  },
  {
    id: 7, kanji: "七", kategori: "Angka", level: "N5", jumlahGoresan: 2,
    onyomi: ["シチ"], kunyomi: ["なな", "なな(つ)", "なの"], arti: "tujuh",
    tips: "Mirip angka 7 yang terbalik dan dicoret di tengahnya.",
    contoh: [
      { kata: "七時", baca: "しちじ", arti: "jam tujuh", jenisBaca: "onyomi", bacaLain: ["ななじ"] },
      { kata: "七つ", baca: "ななつ", arti: "tujuh buah", jenisBaca: "kunyomi" },
      { kata: "七日", baca: "なのか", arti: "tanggal 7 / 7 hari", jenisBaca: "kunyomi" },
    ],
  },
  {
    id: 8, kanji: "八", kategori: "Angka", level: "N5", jumlahGoresan: 2,
    onyomi: ["ハチ"], kunyomi: ["や", "やっ(つ)", "よう"], arti: "delapan",
    tips: "Dua garis yang berpisah ke bawah, seperti kumis yang terbelah dua.",
    contoh: [
      { kata: "八百", baca: "はっぴゃく", arti: "delapan ratus", jenisBaca: "onyomi" },
      { kata: "八つ", baca: "やっつ", arti: "delapan buah", jenisBaca: "kunyomi" },
      { kata: "八百屋", baca: "やおや", arti: "toko sayur", jenisBaca: "khusus", catatan: "Bacaan khusus yang harus dihafal, bukan はっぴゃくや." },
    ],
  },
  {
    id: 9, kanji: "九", kategori: "Angka", level: "N5", jumlahGoresan: 2,
    onyomi: ["キュウ", "ク"], kunyomi: ["ここの", "ここの(つ)"], arti: "sembilan",
    tips: "Mirip huruf カ (ka) yang ekornya melengkung ke kanan.",
    contoh: [
      { kata: "九時", baca: "くじ", arti: "jam sembilan", jenisBaca: "onyomi" },
      { kata: "九つ", baca: "ここのつ", arti: "sembilan buah", jenisBaca: "kunyomi" },
      { kata: "九月", baca: "くがつ", arti: "September", jenisBaca: "onyomi" },
    ],
  },
  {
    id: 10, kanji: "十", kategori: "Angka", level: "N5", jumlahGoresan: 2,
    onyomi: ["ジュウ"], kunyomi: ["とお", "と"], arti: "sepuluh",
    bacaanJarang: ["ジッ"],
    tips: "Tanda tambah (+), seperti angka Romawi X yang diputar.",
    contoh: [
      { kata: "十日", baca: "とおか", arti: "tanggal sepuluh", jenisBaca: "kunyomi" },
      { kata: "十月", baca: "じゅうがつ", arti: "Oktober", jenisBaca: "onyomi" },
      { kata: "二十日", baca: "はつか", arti: "tanggal 20 / 20 hari", jenisBaca: "khusus", catatan: "Bacaan khusus untuk tanggal 20 dan 20 hari. Harus dihafal." },
    ],
  },
  {
    id: 11, kanji: "百", kategori: "Angka", level: "N5", jumlahGoresan: 6,
    onyomi: ["ヒャク"], kunyomi: [], arti: "seratus",
    tips: "Satu (一) di atas putih (白) → seratus.",
    contoh: [
      { kata: "百円", baca: "ひゃくえん", arti: "seratus yen", jenisBaca: "onyomi" },
      { kata: "三百", baca: "さんびゃく", arti: "tiga ratus", jenisBaca: "onyomi" },
      { kata: "八百屋", baca: "やおや", arti: "toko sayur", jenisBaca: "khusus", catatan: "Bacaan khusus yang harus dihafal, bukan はっぴゃくや." },
    ],
  },
  {
    id: 12, kanji: "千", kategori: "Angka", level: "N5", jumlahGoresan: 3,
    onyomi: ["セン"], kunyomi: ["ち"], arti: "seribu",
    tips: "Sepuluh (十) dengan topi miring di atasnya → seribu.",
    contoh: [
      { kata: "千円", baca: "せんえん", arti: "seribu yen", jenisBaca: "onyomi" },
      { kata: "三千", baca: "さんぜん", arti: "tiga ribu", jenisBaca: "onyomi" },
    ],
  },
  {
    id: 13, kanji: "万", kategori: "Angka", level: "N5", jumlahGoresan: 3,
    onyomi: ["マン", "バン"], kunyomi: [], arti: "sepuluh ribu",
    tips: "Mirip huruf カ (ka) yang diberi atap garis di atasnya.",
    contoh: [
      { kata: "一万円", baca: "いちまんえん", arti: "sepuluh ribu yen", jenisBaca: "onyomi" },
      { kata: "万年筆", baca: "まんねんひつ", arti: "pulpen tinta", jenisBaca: "onyomi" },
    ],
  },
  {
    id: 14, kanji: "円", kategori: "Angka", level: "N5", jumlahGoresan: 4,
    onyomi: ["エン"], kunyomi: ["まる(い)"], arti: "yen; lingkaran",
    tips: "Seperti loket kasir dengan sekat di dalamnya — tempat membayar dengan yen.",
    contoh: [
      { kata: "百円", baca: "ひゃくえん", arti: "seratus yen", jenisBaca: "onyomi" },
      { kata: "円い", baca: "まるい", arti: "bulat", jenisBaca: "kunyomi" },
    ],
  },

  // ---------- HARI & WAKTU ----------
  {
    id: 15, kanji: "日", kategori: "Hari & Waktu", level: "N5", jumlahGoresan: 4,
    onyomi: ["ニチ", "ジツ"], kunyomi: ["ひ", "か"], arti: "hari; matahari",
    tips: "Gambar matahari: dulu digambar lingkaran dengan titik, sekarang jadi kotak dengan garis di tengah.",
    contoh: [
      { kata: "日曜日", baca: "にちようび", arti: "hari Minggu", jenisBaca: "onyomi" },
      { kata: "日", baca: "ひ", arti: "hari; matahari", jenisBaca: "kunyomi" },
      { kata: "今日", baca: "きょう", arti: "hari ini", jenisBaca: "khusus", catatan: "Bacaan khusus: 今日 dibaca きょう sebagai satu kesatuan. Harus dihafal." },
    ],
  },
  {
    id: 16, kanji: "月", kategori: "Hari & Waktu", level: "N5", jumlahGoresan: 4,
    onyomi: ["ゲツ", "ガツ"], kunyomi: ["つき"], arti: "bulan",
    bacaanJarang: ["ガツ"],
    tips: "Bulan sabit yang berdiri, dengan dua garis di dalamnya.",
    contoh: [
      { kata: "月曜日", baca: "げつようび", arti: "hari Senin", jenisBaca: "onyomi" },
      { kata: "一月", baca: "いちがつ", arti: "Januari", jenisBaca: "onyomi" },
      { kata: "月", baca: "つき", arti: "bulan (di langit)", jenisBaca: "kunyomi" },
    ],
  },
  {
    id: 17, kanji: "火", kategori: "Hari & Waktu", level: "N5", jumlahGoresan: 4,
    onyomi: ["カ"], kunyomi: ["ひ"], arti: "api",
    bacaanJarang: ["ほ"],
    tips: "Api unggun: lidah api di tengah dan percikan api di kiri-kanan.",
    contoh: [
      { kata: "火曜日", baca: "かようび", arti: "hari Selasa", jenisBaca: "onyomi" },
      { kata: "火", baca: "ひ", arti: "api", jenisBaca: "kunyomi" },
      { kata: "火山", baca: "かざん", arti: "gunung berapi", jenisBaca: "onyomi" },
    ],
  },
  {
    id: 18, kanji: "水", kategori: "Hari & Waktu", level: "N5", jumlahGoresan: 4,
    onyomi: ["スイ"], kunyomi: ["みず"], arti: "air",
    tips: "Garis tengah seperti aliran air, dengan percikan di kiri dan kanan.",
    contoh: [
      { kata: "水曜日", baca: "すいようび", arti: "hari Rabu", jenisBaca: "onyomi" },
      { kata: "水", baca: "みず", arti: "air", jenisBaca: "kunyomi" },
    ],
  },
  {
    id: 19, kanji: "木", kategori: "Hari & Waktu", level: "N5", jumlahGoresan: 4,
    onyomi: ["モク", "ボク"], kunyomi: ["き"], arti: "pohon; kayu",
    bacaanJarang: ["こ"],
    tips: "Gambar pohon: batang tegak, dahan mendatar, dan akar di bawah.",
    contoh: [
      { kata: "木曜日", baca: "もくようび", arti: "hari Kamis", jenisBaca: "onyomi" },
      { kata: "木", baca: "き", arti: "pohon", jenisBaca: "kunyomi" },
    ],
  },
  {
    id: 20, kanji: "金", kategori: "Hari & Waktu", level: "N5", jumlahGoresan: 8,
    onyomi: ["キン", "コン"], kunyomi: ["かね"], arti: "emas; uang",
    bacaanJarang: ["かな"],
    tips: "Atap di atas tanah (土), dengan dua bongkah emas berkilau di dalamnya — tambang emas.",
    contoh: [
      { kata: "お金", baca: "おかね", arti: "uang", jenisBaca: "kunyomi" },
      { kata: "金曜日", baca: "きんようび", arti: "hari Jumat", jenisBaca: "onyomi" },
    ],
  },
  {
    id: 21, kanji: "土", kategori: "Hari & Waktu", level: "N5", jumlahGoresan: 3,
    onyomi: ["ド", "ト"], kunyomi: ["つち"], arti: "tanah",
    tips: "Tunas kecil tumbuh dari tanah; garis bawah yang panjang adalah permukaan tanah. Bedakan dengan 士 (garis bawahnya lebih pendek).",
    contoh: [
      { kata: "土曜日", baca: "どようび", arti: "hari Sabtu", jenisBaca: "onyomi" },
      { kata: "土", baca: "つち", arti: "tanah", jenisBaca: "kunyomi" },
    ],
  },
  {
    id: 22, kanji: "曜", kategori: "Hari & Waktu", level: "N5", jumlahGoresan: 18,
    onyomi: ["ヨウ"], kunyomi: [], arti: "hari (dalam seminggu)",
    tips: "Matahari (日) di kiri, sayap (羽) dan burung (隹) di kanan — hari-hari terbang seperti burung.",
    contoh: [
      { kata: "何曜日", baca: "なんようび", arti: "hari apa", jenisBaca: "onyomi" },
      { kata: "日曜日", baca: "にちようび", arti: "hari Minggu", jenisBaca: "onyomi" },
    ],
  },
  {
    id: 23, kanji: "年", kategori: "Hari & Waktu", level: "N5", jumlahGoresan: 6,
    onyomi: ["ネン"], kunyomi: ["とし"], arti: "tahun",
    tips: "Seperti orang memikul seikat padi — panen datang sekali setahun.",
    contoh: [
      { kata: "今年", baca: "ことし", arti: "tahun ini", jenisBaca: "khusus", catatan: "Bacaan khusus: 今年 dibaca ことし sebagai satu kesatuan. Harus dihafal." },
      { kata: "来年", baca: "らいねん", arti: "tahun depan", jenisBaca: "onyomi" },
      { kata: "年", baca: "とし", arti: "tahun; usia", jenisBaca: "kunyomi" },
    ],
  },
  {
    id: 24, kanji: "時", kategori: "Hari & Waktu", level: "N5", jumlahGoresan: 10,
    onyomi: ["ジ"], kunyomi: ["とき"], arti: "waktu; jam",
    tips: "Matahari (日) + kuil (寺): dulu kuil menandai waktu dengan bunyi lonceng.",
    contoh: [
      { kata: "時間", baca: "じかん", arti: "waktu", jenisBaca: "onyomi" },
      { kata: "時", baca: "とき", arti: "saat; ketika", jenisBaca: "kunyomi" },
      { kata: "時計", baca: "とけい", arti: "jam; arloji", jenisBaca: "khusus", catatan: "Bacaan khusus: 時計 dibaca とけい sebagai satu kesatuan. Harus dihafal." },
    ],
  },
  {
    id: 25, kanji: "分", kategori: "Hari & Waktu", level: "N5", jumlahGoresan: 4,
    onyomi: ["ブン", "フン", "ブ"], kunyomi: ["わ(ける)", "わ(かる)"], arti: "menit; bagian; mengerti",
    tips: "Pisau (刀) di bawah membelah sesuatu menjadi dua (八) → membagi, bagian.",
    contoh: [
      { kata: "分かる", baca: "わかる", arti: "mengerti", jenisBaca: "kunyomi" },
      { kata: "五分", baca: "ごふん", arti: "lima menit", jenisBaca: "onyomi" },
      { kata: "何分", baca: "なんぷん", arti: "berapa menit", jenisBaca: "onyomi" },
    ],
  },
  {
    id: 26, kanji: "半", kategori: "Hari & Waktu", level: "N5", jumlahGoresan: 5,
    onyomi: ["ハン"], kunyomi: ["なか(ば)"], arti: "setengah",
    tips: "Garis tegak membelah benda tepat di tengahnya → setengah.",
    contoh: [
      { kata: "三時半", baca: "さんじはん", arti: "jam setengah empat (3:30)", jenisBaca: "onyomi" },
      { kata: "半分", baca: "はんぶん", arti: "setengah bagian", jenisBaca: "onyomi" },
    ],
  },
  {
    id: 27, kanji: "午", kategori: "Hari & Waktu", level: "N5", jumlahGoresan: 4,
    onyomi: ["ゴ"], kunyomi: [], arti: "tengah hari",
    tips: "Mirip 牛 (sapi) tapi tanpa tonjolan di atas — sapi beristirahat saat tengah hari.",
    contoh: [
      { kata: "午後", baca: "ごご", arti: "siang/sore (PM)", jenisBaca: "onyomi" },
      { kata: "午前", baca: "ごぜん", arti: "pagi (AM)", jenisBaca: "onyomi" },
    ],
  },
  {
    id: 28, kanji: "前", kategori: "Hari & Waktu", level: "N5", jumlahGoresan: 9,
    onyomi: ["ゼン"], kunyomi: ["まえ"], arti: "depan; sebelum",
    tips: "Bagian bawah ada daging (月) dan pisau (刂) — tukang daging berdiri di depan tokonya.",
    contoh: [
      { kata: "名前", baca: "なまえ", arti: "nama", jenisBaca: "kunyomi" },
      { kata: "午前", baca: "ごぜん", arti: "pagi (AM)", jenisBaca: "onyomi" },
      { kata: "前", baca: "まえ", arti: "depan; sebelum", jenisBaca: "kunyomi" },
    ],
  },
  {
    id: 29, kanji: "後", kategori: "Hari & Waktu", level: "N5", jumlahGoresan: 9,
    onyomi: ["ゴ", "コウ"], kunyomi: ["うし(ろ)", "あと", "のち"], arti: "belakang; setelah",
    bacaanJarang: ["おく(れる)"],
    tips: "Langkah kaki (彳) + benang kecil + kaki diseret (夂): berjalan lambat sehingga tertinggal di belakang.",
    contoh: [
      { kata: "後ろ", baca: "うしろ", arti: "belakang", jenisBaca: "kunyomi" },
      { kata: "午後", baca: "ごご", arti: "siang/sore (PM)", jenisBaca: "onyomi" },
      { kata: "後で", baca: "あとで", arti: "nanti; setelah itu", jenisBaca: "kunyomi" },
    ],
  },
  {
    id: 30, kanji: "毎", kategori: "Hari & Waktu", level: "N5", jumlahGoresan: 6,
    onyomi: ["マイ"], kunyomi: [], arti: "setiap",
    bacaanJarang: ["ごと"],
    tips: "Ibu (母) memakai topi di atasnya — setiap hari ibu memakai topinya.",
    contoh: [
      { kata: "毎日", baca: "まいにち", arti: "setiap hari", jenisBaca: "onyomi" },
      { kata: "毎朝", baca: "まいあさ", arti: "setiap pagi", jenisBaca: "onyomi" },
      { kata: "毎年", baca: "まいとし", arti: "setiap tahun", jenisBaca: "onyomi" },
    ],
  },
  {
    id: 31, kanji: "週", kategori: "Hari & Waktu", level: "N5", jumlahGoresan: 11,
    onyomi: ["シュウ"], kunyomi: [], arti: "minggu (pekan)",
    tips: "Jalan (辶) + keliling (周): berjalan berkeliling selama satu minggu.",
    contoh: [
      { kata: "今週", baca: "こんしゅう", arti: "minggu ini", jenisBaca: "onyomi" },
      { kata: "来週", baca: "らいしゅう", arti: "minggu depan", jenisBaca: "onyomi" },
      { kata: "毎週", baca: "まいしゅう", arti: "setiap minggu", jenisBaca: "onyomi" },
    ],
  },
  {
    id: 32, kanji: "今", kategori: "Hari & Waktu", level: "N5", jumlahGoresan: 4,
    onyomi: ["コン", "キン"], kunyomi: ["いま"], arti: "sekarang",
    tips: "Atap (人) dengan garis di bawahnya — sekarang kita berteduh di bawah atap.",
    contoh: [
      { kata: "今日", baca: "きょう", arti: "hari ini", jenisBaca: "khusus", catatan: "Bacaan khusus: 今日 dibaca きょう sebagai satu kesatuan. Harus dihafal." },
      { kata: "今", baca: "いま", arti: "sekarang", jenisBaca: "kunyomi" },
      { kata: "今晩", baca: "こんばん", arti: "malam ini", jenisBaca: "onyomi" },
    ],
  },
  {
    id: 33, kanji: "先", kategori: "Hari & Waktu", level: "N5", jumlahGoresan: 6,
    onyomi: ["セン"], kunyomi: ["さき"], arti: "dulu; lebih dulu",
    tips: "Bagian bawahnya kaki (儿) yang melangkah lebih dulu.",
    contoh: [
      { kata: "先生", baca: "せんせい", arti: "guru", jenisBaca: "onyomi" },
      { kata: "先週", baca: "せんしゅう", arti: "minggu lalu", jenisBaca: "onyomi" },
      { kata: "先", baca: "さき", arti: "ujung; lebih dulu", jenisBaca: "kunyomi" },
    ],
  },

  // ---------- ARAH & POSISI ----------
  {
    id: 34, kanji: "上", kategori: "Arah & Posisi", level: "N5", jumlahGoresan: 3,
    onyomi: ["ジョウ"], kunyomi: ["うえ", "あ(がる)", "のぼ(る)"], arti: "atas",
    bacaanJarang: ["ショウ", "うわ", "かみ"],
    tips: "Ada garis kecil di ATAS garis dasar → atas. Kebalikan dari 下.",
    contoh: [
      { kata: "上手", baca: "じょうず", arti: "pandai", jenisBaca: "khusus", catatan: "Bacaan khusus: 上手 dibaca じょうず sebagai satu kesatuan. Harus dihafal." },
      { kata: "上", baca: "うえ", arti: "atas", jenisBaca: "kunyomi" },
      { kata: "上げる", baca: "あげる", arti: "memberi; menaikkan", jenisBaca: "kunyomi" },
    ],
  },
  {
    id: 35, kanji: "下", kategori: "Arah & Posisi", level: "N5", jumlahGoresan: 3,
    onyomi: ["カ", "ゲ"], kunyomi: ["した", "さ(がる)", "くだ(さる)", "お(りる)"], arti: "bawah",
    bacaanJarang: ["しも", "もと", "くだ(る)"],
    tips: "Ada garis kecil di BAWAH garis atas → bawah. Kebalikan dari 上.",
    contoh: [
      { kata: "下さい", baca: "ください", arti: "tolong berikan", jenisBaca: "kunyomi" },
      { kata: "地下鉄", baca: "ちかてつ", arti: "kereta bawah tanah", jenisBaca: "onyomi" },
      { kata: "下手", baca: "へた", arti: "tidak pandai", jenisBaca: "khusus", catatan: "Bacaan khusus: 下手 dibaca へた sebagai satu kesatuan. Harus dihafal." },
    ],
  },
  {
    id: 36, kanji: "中", kategori: "Arah & Posisi", level: "N5", jumlahGoresan: 4,
    onyomi: ["チュウ"], kunyomi: ["なか"], arti: "dalam; tengah",
    bacaanJarang: ["ジュウ"],
    tips: "Kotak yang ditusuk garis tepat di TENGAH-nya.",
    contoh: [
      { kata: "中国", baca: "ちゅうごく", arti: "Tiongkok", jenisBaca: "onyomi" },
      { kata: "中", baca: "なか", arti: "dalam; tengah", jenisBaca: "kunyomi" },
    ],
  },
  {
    id: 37, kanji: "外", kategori: "Arah & Posisi", level: "N5", jumlahGoresan: 5,
    onyomi: ["ガイ", "ゲ"], kunyomi: ["そと", "ほか"], arti: "luar",
    tips: "Sore (夕) + ramalan (卜): peramal bekerja di luar rumah pada sore hari.",
    contoh: [
      { kata: "外国", baca: "がいこく", arti: "luar negeri", jenisBaca: "onyomi" },
      { kata: "外", baca: "そと", arti: "luar", jenisBaca: "kunyomi" },
      { kata: "外国人", baca: "がいこくじん", arti: "orang asing", jenisBaca: "onyomi" },
    ],
  },
  {
    id: 38, kanji: "右", kategori: "Arah & Posisi", level: "N5", jumlahGoresan: 5,
    onyomi: ["ウ", "ユウ"], kunyomi: ["みぎ"], arti: "kanan",
    tips: "Tangan (ナ) + mulut (口): tangan kanan menyuapkan makanan ke mulut. Bedakan dengan 左 yang memakai 工.",
    contoh: [
      { kata: "右手", baca: "みぎて", arti: "tangan kanan", jenisBaca: "kunyomi" },
      { kata: "右", baca: "みぎ", arti: "kanan", jenisBaca: "kunyomi" },
      { kata: "左右", baca: "さゆう", arti: "kiri dan kanan", jenisBaca: "onyomi" },
    ],
  },
  {
    id: 39, kanji: "左", kategori: "Arah & Posisi", level: "N5", jumlahGoresan: 5,
    onyomi: ["サ"], kunyomi: ["ひだり"], arti: "kiri",
    tips: "Tangan (ナ) + alat (工): tangan kiri memegang alat. Bedakan dengan 右 yang memakai 口.",
    contoh: [
      { kata: "左手", baca: "ひだりて", arti: "tangan kiri", jenisBaca: "kunyomi" },
      { kata: "左", baca: "ひだり", arti: "kiri", jenisBaca: "kunyomi" },
      { kata: "左右", baca: "さゆう", arti: "kiri dan kanan", jenisBaca: "onyomi" },
    ],
  },
  {
    id: 40, kanji: "東", kategori: "Arah & Posisi", level: "N5", jumlahGoresan: 8,
    onyomi: ["トウ"], kunyomi: ["ひがし"], arti: "timur",
    tips: "Matahari (日) terbit di balik pohon (木) → timur.",
    contoh: [
      { kata: "東京", baca: "とうきょう", arti: "Tokyo", jenisBaca: "onyomi" },
      { kata: "東", baca: "ひがし", arti: "timur", jenisBaca: "kunyomi" },
    ],
  },
  {
    id: 41, kanji: "西", kategori: "Arah & Posisi", level: "N5", jumlahGoresan: 6,
    onyomi: ["セイ", "サイ"], kunyomi: ["にし"], arti: "barat",
    tips: "Seperti jendela bertirai; dari jendela itu terlihat matahari terbenam di barat.",
    contoh: [
      { kata: "西口", baca: "にしぐち", arti: "pintu barat", jenisBaca: "kunyomi" },
      { kata: "西", baca: "にし", arti: "barat", jenisBaca: "kunyomi" },
      { kata: "関西", baca: "かんさい", arti: "daerah Kansai", jenisBaca: "onyomi" },
    ],
  },
  {
    id: 42, kanji: "南", kategori: "Arah & Posisi", level: "N5", jumlahGoresan: 9,
    onyomi: ["ナン"], kunyomi: ["みなみ"], arti: "selatan",
    tips: "Di dalam kotaknya ada bentuk seperti tanda ¥ — bayangkan membawa uang yen berlibur ke selatan.",
    contoh: [
      { kata: "南口", baca: "みなみぐち", arti: "pintu selatan", jenisBaca: "kunyomi" },
      { kata: "南", baca: "みなみ", arti: "selatan", jenisBaca: "kunyomi" },
      { kata: "東南アジア", baca: "とうなんあじあ", arti: "Asia Tenggara", jenisBaca: "onyomi" },
    ],
  },
  {
    id: 43, kanji: "北", kategori: "Arah & Posisi", level: "N5", jumlahGoresan: 5,
    onyomi: ["ホク"], kunyomi: ["きた"], arti: "utara",
    tips: "Dua orang duduk saling membelakangi, kabur dari dinginnya utara.",
    contoh: [
      { kata: "北口", baca: "きたぐち", arti: "pintu utara", jenisBaca: "kunyomi" },
      { kata: "北", baca: "きた", arti: "utara", jenisBaca: "kunyomi" },
      { kata: "北海道", baca: "ほっかいどう", arti: "Hokkaido", jenisBaca: "onyomi" },
    ],
  },

  // ---------- ORANG & TUBUH ----------
  {
    id: 44, kanji: "人", kategori: "Orang & Tubuh", level: "N5", jumlahGoresan: 2,
    onyomi: ["ジン", "ニン"], kunyomi: ["ひと"], arti: "orang",
    tips: "Orang berdiri dengan dua kaki. Bedakan dengan 入 (masuk), yang garis kanannya lebih tinggi.",
    contoh: [
      { kata: "日本人", baca: "にほんじん", arti: "orang Jepang", jenisBaca: "onyomi" },
      { kata: "人", baca: "ひと", arti: "orang", jenisBaca: "kunyomi" },
      { kata: "一人", baca: "ひとり", arti: "satu orang; sendirian", jenisBaca: "khusus", catatan: "Bacaan khusus. Mulai tiga orang memakai 〜にん, misalnya 三人 (さんにん)." },
    ],
  },
  {
    id: 45, kanji: "子", kategori: "Orang & Tubuh", level: "N5", jumlahGoresan: 3,
    onyomi: ["シ", "ス"], kunyomi: ["こ"], arti: "anak",
    bacaanJarang: ["ね"],
    tips: "Bayi yang dibedong dengan kedua tangan terentang.",
    contoh: [
      { kata: "子ども", baca: "こども", arti: "anak-anak", jenisBaca: "kunyomi" },
      { kata: "女の子", baca: "おんなのこ", arti: "anak perempuan", jenisBaca: "kunyomi" },
      { kata: "椅子", baca: "いす", arti: "kursi", jenisBaca: "onyomi" },
    ],
  },
  {
    id: 46, kanji: "女", kategori: "Orang & Tubuh", level: "N5", jumlahGoresan: 3,
    onyomi: ["ジョ", "ニョ"], kunyomi: ["おんな"], arti: "perempuan",
    bacaanJarang: ["ニョウ", "め"],
    tips: "Perempuan yang duduk bersimpuh dengan anggun.",
    contoh: [
      { kata: "女の子", baca: "おんなのこ", arti: "anak perempuan", jenisBaca: "kunyomi" },
      { kata: "女の人", baca: "おんなのひと", arti: "perempuan (dewasa)", jenisBaca: "kunyomi" },
      { kata: "彼女", baca: "かのじょ", arti: "dia (perempuan); pacar", jenisBaca: "onyomi" },
    ],
  },
  {
    id: 47, kanji: "男", kategori: "Orang & Tubuh", level: "N5", jumlahGoresan: 7,
    onyomi: ["ダン", "ナン"], kunyomi: ["おとこ"], arti: "laki-laki",
    tips: "Sawah (田) + tenaga (力): laki-laki bekerja keras di sawah.",
    contoh: [
      { kata: "男の人", baca: "おとこのひと", arti: "laki-laki (dewasa)", jenisBaca: "kunyomi" },
      { kata: "男の子", baca: "おとこのこ", arti: "anak laki-laki", jenisBaca: "kunyomi" },
      { kata: "男性", baca: "だんせい", arti: "pria", jenisBaca: "onyomi" },
    ],
  },
  {
    id: 48, kanji: "父", kategori: "Orang & Tubuh", level: "N5", jumlahGoresan: 4,
    onyomi: ["フ"], kunyomi: ["ちち"], arti: "ayah",
    tips: "Dua alat seperti kapak yang bersilang — ayah bekerja dengan alatnya.",
    contoh: [
      { kata: "お父さん", baca: "おとうさん", arti: "ayah (orang lain)", jenisBaca: "khusus", catatan: "Bacaan khusus: di お父さん, 父 dibaca とう. Harus dihafal." },
      { kata: "父", baca: "ちち", arti: "ayah (sendiri)", jenisBaca: "kunyomi" },
      { kata: "祖父", baca: "そふ", arti: "kakek", jenisBaca: "onyomi" },
    ],
  },
  {
    id: 49, kanji: "母", kategori: "Orang & Tubuh", level: "N5", jumlahGoresan: 5,
    onyomi: ["ボ"], kunyomi: ["はは"], arti: "ibu",
    tips: "Mirip 女 (perempuan) dengan dua titik di dalamnya — seorang ibu yang menyusui.",
    contoh: [
      { kata: "お母さん", baca: "おかあさん", arti: "ibu (orang lain)", jenisBaca: "khusus", catatan: "Bacaan khusus: di お母さん, 母 dibaca かあ. Harus dihafal." },
      { kata: "母", baca: "はは", arti: "ibu (sendiri)", jenisBaca: "kunyomi" },
      { kata: "祖母", baca: "そぼ", arti: "nenek", jenisBaca: "onyomi" },
    ],
  },
  {
    id: 50, kanji: "友", kategori: "Orang & Tubuh", level: "N5", jumlahGoresan: 4,
    onyomi: ["ユウ"], kunyomi: ["とも"], arti: "teman",
    tips: "Dua tangan (ナ dan 又) saling bergandengan → teman.",
    contoh: [
      { kata: "友だち", baca: "ともだち", arti: "teman", jenisBaca: "kunyomi" },
      { kata: "友人", baca: "ゆうじん", arti: "teman (formal)", jenisBaca: "onyomi" },
    ],
  },
  {
    id: 51, kanji: "名", kategori: "Orang & Tubuh", level: "N5", jumlahGoresan: 6,
    onyomi: ["メイ", "ミョウ"], kunyomi: ["な"], arti: "nama",
    tips: "Sore (夕) + mulut (口): saat hari gelap, kita memanggil nama orang karena wajahnya tidak terlihat.",
    contoh: [
      { kata: "名前", baca: "なまえ", arti: "nama", jenisBaca: "kunyomi" },
      { kata: "有名", baca: "ゆうめい", arti: "terkenal", jenisBaca: "onyomi" },
    ],
  },
  {
    id: 52, kanji: "目", kategori: "Orang & Tubuh", level: "N5", jumlahGoresan: 5,
    onyomi: ["モク"], kunyomi: ["め"], arti: "mata",
    bacaanJarang: ["ボク", "ま"],
    tips: "Gambar mata yang diputar berdiri: kotak dengan dua garis di dalamnya.",
    contoh: [
      { kata: "目", baca: "め", arti: "mata", jenisBaca: "kunyomi" },
      { kata: "一番目", baca: "いちばんめ", arti: "yang pertama (urutan)", jenisBaca: "kunyomi" },
      { kata: "目的", baca: "もくてき", arti: "tujuan", jenisBaca: "onyomi" },
    ],
  },
  {
    id: 53, kanji: "耳", kategori: "Orang & Tubuh", level: "N5", jumlahGoresan: 6,
    onyomi: ["ジ"], kunyomi: ["みみ"], arti: "telinga",
    tips: "Gambar daun telinga dengan lekukan-lekukan di dalamnya.",
    contoh: [
      { kata: "耳", baca: "みみ", arti: "telinga", jenisBaca: "kunyomi" },
      { kata: "耳鼻科", baca: "じびか", arti: "klinik THT", jenisBaca: "onyomi" },
    ],
  },
  {
    id: 54, kanji: "口", kategori: "Orang & Tubuh", level: "N5", jumlahGoresan: 3,
    onyomi: ["コウ", "ク"], kunyomi: ["くち"], arti: "mulut; pintu",
    tips: "Kotak = mulut yang terbuka lebar.",
    contoh: [
      { kata: "入口", baca: "いりぐち", arti: "pintu masuk", jenisBaca: "kunyomi" },
      { kata: "出口", baca: "でぐち", arti: "pintu keluar", jenisBaca: "kunyomi" },
      { kata: "人口", baca: "じんこう", arti: "jumlah penduduk", jenisBaca: "onyomi" },
    ],
  },
  {
    id: 55, kanji: "手", kategori: "Orang & Tubuh", level: "N5", jumlahGoresan: 4,
    onyomi: ["シュ"], kunyomi: ["て"], arti: "tangan",
    bacaanJarang: ["た"],
    tips: "Telapak tangan dengan jari-jari (garis mendatar) dan lengan (garis tegak yang melengkung).",
    contoh: [
      { kata: "手紙", baca: "てがみ", arti: "surat", jenisBaca: "kunyomi" },
      { kata: "歌手", baca: "かしゅ", arti: "penyanyi", jenisBaca: "onyomi" },
      { kata: "上手", baca: "じょうず", arti: "pandai", jenisBaca: "khusus", catatan: "Bacaan khusus: 上手 dibaca じょうず sebagai satu kesatuan. Harus dihafal." },
    ],
  },
  {
    id: 56, kanji: "足", kategori: "Orang & Tubuh", level: "N5", jumlahGoresan: 7,
    onyomi: ["ソク"], kunyomi: ["あし", "た(りる)"], arti: "kaki; cukup",
    tips: "Lutut (口) di atas, telapak kaki yang melangkah di bawah.",
    contoh: [
      { kata: "足", baca: "あし", arti: "kaki", jenisBaca: "kunyomi" },
      { kata: "足りる", baca: "たりる", arti: "cukup", jenisBaca: "kunyomi" },
      { kata: "一足", baca: "いっそく", arti: "sepasang (sepatu/kaus kaki)", jenisBaca: "onyomi" },
    ],
  },

  // ---------- ALAM ----------
  {
    id: 57, kanji: "山", kategori: "Alam", level: "N5", jumlahGoresan: 3,
    onyomi: ["サン"], kunyomi: ["やま"], arti: "gunung",
    tips: "Tiga puncak gunung, yang tengah paling tinggi.",
    contoh: [
      { kata: "富士山", baca: "ふじさん", arti: "Gunung Fuji", jenisBaca: "onyomi" },
      { kata: "山", baca: "やま", arti: "gunung", jenisBaca: "kunyomi" },
      { kata: "火山", baca: "かざん", arti: "gunung berapi", jenisBaca: "onyomi" },
    ],
  },
  {
    id: 58, kanji: "川", kategori: "Alam", level: "N5", jumlahGoresan: 3,
    onyomi: ["セン"], kunyomi: ["かわ"], arti: "sungai",
    tips: "Tiga garis aliran air sungai.",
    contoh: [
      { kata: "川", baca: "かわ", arti: "sungai", jenisBaca: "kunyomi" },
      { kata: "小川", baca: "おがわ", arti: "sungai kecil", jenisBaca: "kunyomi" },
    ],
  },
  {
    id: 59, kanji: "田", kategori: "Alam", level: "N5", jumlahGoresan: 5,
    onyomi: ["デン"], kunyomi: ["た"], arti: "sawah",
    tips: "Sawah yang dibagi menjadi empat petak.",
    contoh: [
      { kata: "田中", baca: "たなか", arti: "Tanaka (nama orang)", jenisBaca: "kunyomi" },
      { kata: "田んぼ", baca: "たんぼ", arti: "sawah", jenisBaca: "kunyomi" },
      { kata: "水田", baca: "すいでん", arti: "sawah berair", jenisBaca: "onyomi" },
    ],
  },
  {
    id: 60, kanji: "天", kategori: "Alam", level: "N5", jumlahGoresan: 4,
    onyomi: ["テン"], kunyomi: ["あめ", "あま"], arti: "langit",
    tips: "Orang besar (大) dengan garis di atas kepalanya — langit di atas kepala.",
    contoh: [
      { kata: "天気", baca: "てんき", arti: "cuaca", jenisBaca: "onyomi" },
      { kata: "天の川", baca: "あまのがわ", arti: "Bima Sakti", jenisBaca: "kunyomi" },
    ],
  },
  {
    id: 61, kanji: "気", kategori: "Alam", level: "N5", jumlahGoresan: 6,
    onyomi: ["キ", "ケ"], kunyomi: [], arti: "semangat; perasaan; udara",
    tips: "Uap yang mengepul (气) dengan tanda メ di dalamnya — udara, perasaan.",
    contoh: [
      { kata: "元気", baca: "げんき", arti: "sehat; bersemangat", jenisBaca: "onyomi" },
      { kata: "天気", baca: "てんき", arti: "cuaca", jenisBaca: "onyomi" },
      { kata: "電気", baca: "でんき", arti: "listrik; lampu", jenisBaca: "onyomi" },
    ],
  },
  {
    id: 62, kanji: "雨", kategori: "Alam", level: "N5", jumlahGoresan: 8,
    onyomi: ["ウ"], kunyomi: ["あめ", "あま"], arti: "hujan",
    tips: "Langit (garis atas), awan, dan titik-titik hujan yang berjatuhan.",
    contoh: [
      { kata: "雨", baca: "あめ", arti: "hujan", jenisBaca: "kunyomi" },
      { kata: "大雨", baca: "おおあめ", arti: "hujan lebat", jenisBaca: "kunyomi" },
      { kata: "雨季", baca: "うき", arti: "musim hujan", jenisBaca: "onyomi" },
    ],
  },
  {
    id: 63, kanji: "花", kategori: "Alam", level: "N5", jumlahGoresan: 7,
    onyomi: ["カ"], kunyomi: ["はな"], arti: "bunga",
    tips: "Rumput (艹) di atas + berubah (化): tunas berubah menjadi bunga.",
    contoh: [
      { kata: "花見", baca: "はなみ", arti: "piknik melihat bunga sakura", jenisBaca: "kunyomi" },
      { kata: "花屋", baca: "はなや", arti: "toko bunga", jenisBaca: "kunyomi" },
      { kata: "花瓶", baca: "かびん", arti: "vas bunga", jenisBaca: "onyomi" },
    ],
  },

  // ---------- SEKOLAH & BUKU ----------
  {
    id: 64, kanji: "学", kategori: "Sekolah & Buku", level: "N5", jumlahGoresan: 8,
    onyomi: ["ガク"], kunyomi: ["まな(ぶ)"], arti: "belajar",
    tips: "Anak (子) di bawah atap sekolah, dengan tiga titik \"cahaya ilmu\" di atasnya.",
    contoh: [
      { kata: "学生", baca: "がくせい", arti: "pelajar/mahasiswa", jenisBaca: "onyomi" },
      { kata: "学校", baca: "がっこう", arti: "sekolah", jenisBaca: "onyomi" },
      { kata: "大学", baca: "だいがく", arti: "universitas", jenisBaca: "onyomi" },
    ],
  },
  {
    id: 65, kanji: "校", kategori: "Sekolah & Buku", level: "N5", jumlahGoresan: 10,
    onyomi: ["コウ"], kunyomi: [], arti: "sekolah",
    tips: "Pohon (木) + bertemu (交): sekolah kayu tempat anak-anak bertemu.",
    contoh: [
      { kata: "学校", baca: "がっこう", arti: "sekolah", jenisBaca: "onyomi" },
      { kata: "高校", baca: "こうこう", arti: "SMA", jenisBaca: "onyomi" },
    ],
  },
  {
    id: 66, kanji: "生", kategori: "Sekolah & Buku", level: "N5", jumlahGoresan: 5,
    onyomi: ["セイ", "ショウ"], kunyomi: ["い(きる)", "う(まれる)", "なま"], arti: "hidup; lahir; mentah",
    bacaanJarang: ["お(う)", "は(える)", "き"],
    tips: "Tunas yang tumbuh dari tanah (土) → hidup, lahir.",
    contoh: [
      { kata: "先生", baca: "せんせい", arti: "guru", jenisBaca: "onyomi" },
      { kata: "生まれる", baca: "うまれる", arti: "lahir", jenisBaca: "kunyomi" },
      { kata: "誕生日", baca: "たんじょうび", arti: "ulang tahun", jenisBaca: "onyomi" },
    ],
  },
  {
    id: 67, kanji: "本", kategori: "Sekolah & Buku", level: "N5", jumlahGoresan: 5,
    onyomi: ["ホン"], kunyomi: ["もと"], arti: "buku; asal",
    tips: "Pohon (木) dengan garis di bagian akarnya → asal-usul. Bedakan dengan 木 dan 休.",
    contoh: [
      { kata: "日本", baca: "にほん", arti: "Jepang", jenisBaca: "onyomi" },
      { kata: "本", baca: "ほん", arti: "buku", jenisBaca: "onyomi" },
      { kata: "本屋", baca: "ほんや", arti: "toko buku", jenisBaca: "onyomi" },
    ],
  },
  {
    id: 68, kanji: "何", kategori: "Sekolah & Buku", level: "N5", jumlahGoresan: 7,
    onyomi: ["カ"], kunyomi: ["なに", "なん"], arti: "apa",
    tips: "Orang (亻) + boleh (可): orang bertanya \"apa boleh?\" → apa.",
    contoh: [
      { kata: "何時", baca: "なんじ", arti: "jam berapa", jenisBaca: "kunyomi" },
      { kata: "何", baca: "なに", arti: "apa", jenisBaca: "kunyomi" },
      { kata: "何人", baca: "なんにん", arti: "berapa orang", jenisBaca: "kunyomi" },
    ],
  },

  // ---------- KATA KERJA ----------
  {
    id: 69, kanji: "見", kategori: "Kata Kerja", level: "N5", jumlahGoresan: 7,
    onyomi: ["ケン"], kunyomi: ["み(る)", "み(せる)"], arti: "melihat",
    tips: "Mata (目) di atas kaki (儿): mata yang berjalan-jalan untuk melihat.",
    contoh: [
      { kata: "見る", baca: "みる", arti: "melihat", jenisBaca: "kunyomi" },
      { kata: "見せる", baca: "みせる", arti: "menunjukkan", jenisBaca: "kunyomi" },
      { kata: "見学", baca: "けんがく", arti: "kunjungan belajar", jenisBaca: "onyomi" },
    ],
  },
  {
    id: 70, kanji: "行", kategori: "Kata Kerja", level: "N5", jumlahGoresan: 6,
    onyomi: ["コウ", "ギョウ"], kunyomi: ["い(く)", "おこな(う)"], arti: "pergi",
    bacaanJarang: ["アン", "ゆ(く)"],
    tips: "Gambar persimpangan jalan (彳 dan 亍): pergi melewati jalan.",
    contoh: [
      { kata: "行く", baca: "いく", arti: "pergi", jenisBaca: "kunyomi" },
      { kata: "旅行", baca: "りょこう", arti: "perjalanan; wisata", jenisBaca: "onyomi" },
      { kata: "銀行", baca: "ぎんこう", arti: "bank", jenisBaca: "onyomi" },
    ],
  },
  {
    id: 71, kanji: "来", kategori: "Kata Kerja", level: "N5", jumlahGoresan: 7,
    onyomi: ["ライ"], kunyomi: ["く(る)", "き(ます)"], arti: "datang",
    bacaanJarang: ["きた(る)", "きた(す)"],
    tips: "Pohon (木) yang sedang berbuah dengan garis di atasnya — musim panen datang.",
    contoh: [
      { kata: "来年", baca: "らいねん", arti: "tahun depan", jenisBaca: "onyomi" },
      { kata: "来る", baca: "くる", arti: "datang", jenisBaca: "kunyomi" },
      { kata: "来週", baca: "らいしゅう", arti: "minggu depan", jenisBaca: "onyomi" },
    ],
  },
  {
    id: 72, kanji: "出", kategori: "Kata Kerja", level: "N5", jumlahGoresan: 5,
    onyomi: ["シュツ"], kunyomi: ["で(る)", "だ(す)"], arti: "keluar",
    bacaanJarang: ["スイ"],
    tips: "Dua gunung (山) yang bertumpuk — keluar dari lembah.",
    contoh: [
      { kata: "出口", baca: "でぐち", arti: "pintu keluar", jenisBaca: "kunyomi" },
      { kata: "出す", baca: "だす", arti: "mengeluarkan; mengirim", jenisBaca: "kunyomi" },
      { kata: "出発", baca: "しゅっぱつ", arti: "keberangkatan", jenisBaca: "onyomi" },
    ],
  },
  {
    id: 73, kanji: "入", kategori: "Kata Kerja", level: "N5", jumlahGoresan: 2,
    onyomi: ["ニュウ"], kunyomi: ["い(る)", "い(れる)", "はい(る)"], arti: "masuk",
    tips: "Seperti orang yang masuk ke pintu tenda. Garis kanannya lebih tinggi — bedakan dengan 人.",
    contoh: [
      { kata: "入る", baca: "はいる", arti: "masuk", jenisBaca: "kunyomi" },
      { kata: "入口", baca: "いりぐち", arti: "pintu masuk", jenisBaca: "kunyomi" },
      { kata: "入学", baca: "にゅうがく", arti: "masuk sekolah", jenisBaca: "onyomi" },
    ],
  },
  {
    id: 74, kanji: "食", kategori: "Kata Kerja", level: "N5", jumlahGoresan: 9,
    onyomi: ["ショク"], kunyomi: ["た(べる)"], arti: "makan",
    bacaanJarang: ["ジキ", "く(う)"],
    tips: "Atap (人) di atas makanan yang baik (良) → makan.",
    contoh: [
      { kata: "食べる", baca: "たべる", arti: "makan", jenisBaca: "kunyomi" },
      { kata: "食堂", baca: "しょくどう", arti: "kantin", jenisBaca: "onyomi" },
      { kata: "食事", baca: "しょくじ", arti: "makan; hidangan", jenisBaca: "onyomi" },
    ],
  },
  {
    id: 75, kanji: "飲", kategori: "Kata Kerja", level: "N5", jumlahGoresan: 12,
    onyomi: ["イン"], kunyomi: ["の(む)"], arti: "minum",
    tips: "Makan (食) + orang membuka mulut lebar (欠) → minum.",
    contoh: [
      { kata: "飲み物", baca: "のみもの", arti: "minuman", jenisBaca: "kunyomi" },
      { kata: "飲む", baca: "のむ", arti: "minum", jenisBaca: "kunyomi" },
    ],
  },
  {
    id: 76, kanji: "言", kategori: "Kata Kerja", level: "N5", jumlahGoresan: 7,
    onyomi: ["ゲン", "ゴン"], kunyomi: ["い(う)", "こと"], arti: "berkata",
    tips: "Garis-garis kata yang keluar dari mulut (口) → berkata.",
    contoh: [
      { kata: "言う", baca: "いう", arti: "berkata", jenisBaca: "kunyomi" },
      { kata: "言葉", baca: "ことば", arti: "kata; bahasa", jenisBaca: "kunyomi" },
      { kata: "方言", baca: "ほうげん", arti: "dialek", jenisBaca: "onyomi" },
    ],
  },
  {
    id: 77, kanji: "話", kategori: "Kata Kerja", level: "N5", jumlahGoresan: 13,
    onyomi: ["ワ"], kunyomi: ["はな(す)", "はなし"], arti: "berbicara; cerita",
    tips: "Berkata (言) + lidah (舌): lidah bergerak saat kita berbicara.",
    contoh: [
      { kata: "電話", baca: "でんわ", arti: "telepon", jenisBaca: "onyomi" },
      { kata: "話す", baca: "はなす", arti: "berbicara", jenisBaca: "kunyomi" },
      { kata: "会話", baca: "かいわ", arti: "percakapan", jenisBaca: "onyomi" },
    ],
  },
  {
    id: 78, kanji: "読", kategori: "Kata Kerja", level: "N5", jumlahGoresan: 14,
    onyomi: ["ドク"], kunyomi: ["よ(む)"], arti: "membaca",
    bacaanJarang: ["トク", "トウ"],
    tips: "Berkata (言) + menjual (売): pedagang membacakan barang jualannya keras-keras.",
    contoh: [
      { kata: "読む", baca: "よむ", arti: "membaca", jenisBaca: "kunyomi" },
      { kata: "読書", baca: "どくしょ", arti: "membaca buku", jenisBaca: "onyomi" },
    ],
  },
  {
    id: 79, kanji: "書", kategori: "Kata Kerja", level: "N5", jumlahGoresan: 10,
    onyomi: ["ショ"], kunyomi: ["か(く)"], arti: "menulis",
    tips: "Tangan memegang kuas (聿) di atas kertas (日) → menulis.",
    contoh: [
      { kata: "書く", baca: "かく", arti: "menulis", jenisBaca: "kunyomi" },
      { kata: "辞書", baca: "じしょ", arti: "kamus", jenisBaca: "onyomi" },
      { kata: "図書館", baca: "としょかん", arti: "perpustakaan", jenisBaca: "onyomi" },
    ],
  },
  {
    id: 80, kanji: "聞", kategori: "Kata Kerja", level: "N5", jumlahGoresan: 14,
    onyomi: ["ブン", "モン"], kunyomi: ["き(く)"], arti: "mendengar; bertanya",
    tips: "Telinga (耳) di dalam pintu gerbang (門) → menguping, mendengar.",
    contoh: [
      { kata: "新聞", baca: "しんぶん", arti: "koran", jenisBaca: "onyomi" },
      { kata: "聞く", baca: "きく", arti: "mendengar; bertanya", jenisBaca: "kunyomi" },
    ],
  },
  {
    id: 81, kanji: "休", kategori: "Kata Kerja", level: "N5", jumlahGoresan: 6,
    onyomi: ["キュウ"], kunyomi: ["やす(む)"], arti: "istirahat; libur",
    tips: "Orang (亻) bersandar di pohon (木) → istirahat. Bedakan dengan 木 dan 本.",
    contoh: [
      { kata: "休み", baca: "やすみ", arti: "libur", jenisBaca: "kunyomi" },
      { kata: "夏休み", baca: "なつやすみ", arti: "liburan musim panas", jenisBaca: "kunyomi" },
      { kata: "休日", baca: "きゅうじつ", arti: "hari libur", jenisBaca: "onyomi" },
    ],
  },
  {
    id: 82, kanji: "買", kategori: "Kata Kerja", level: "N5", jumlahGoresan: 12,
    onyomi: ["バイ"], kunyomi: ["か(う)"], arti: "membeli",
    tips: "Jaring (罒) di atas kerang/uang (貝): mengumpulkan uang untuk membeli.",
    contoh: [
      { kata: "買い物", baca: "かいもの", arti: "belanja", jenisBaca: "kunyomi" },
      { kata: "買う", baca: "かう", arti: "membeli", jenisBaca: "kunyomi" },
    ],
  },
  {
    id: 83, kanji: "立", kategori: "Kata Kerja", level: "N5", jumlahGoresan: 5,
    onyomi: ["リツ"], kunyomi: ["た(つ)"], arti: "berdiri",
    bacaanJarang: ["リュウ"],
    tips: "Orang berdiri tegak di atas tanah (garis bawah).",
    contoh: [
      { kata: "立つ", baca: "たつ", arti: "berdiri", jenisBaca: "kunyomi" },
      { kata: "国立", baca: "こくりつ", arti: "negeri (milik negara)", jenisBaca: "onyomi" },
    ],
  },
  {
    id: 84, kanji: "会", kategori: "Kata Kerja", level: "N5", jumlahGoresan: 6,
    onyomi: ["カイ", "エ"], kunyomi: ["あ(う)"], arti: "bertemu; pertemuan",
    tips: "Atap (人) di atas awan (云): orang-orang berkumpul di bawah satu atap.",
    contoh: [
      { kata: "会社", baca: "かいしゃ", arti: "perusahaan", jenisBaca: "onyomi" },
      { kata: "会う", baca: "あう", arti: "bertemu", jenisBaca: "kunyomi" },
      { kata: "会社員", baca: "かいしゃいん", arti: "karyawan perusahaan", jenisBaca: "onyomi" },
    ],
  },

  // ---------- KATA SIFAT ----------
  {
    id: 85, kanji: "大", kategori: "Kata Sifat", level: "N5", jumlahGoresan: 3,
    onyomi: ["ダイ", "タイ"], kunyomi: ["おお(きい)"], arti: "besar",
    tips: "Orang (人) yang merentangkan kedua tangannya lebar-lebar → besar.",
    contoh: [
      { kata: "大学", baca: "だいがく", arti: "universitas", jenisBaca: "onyomi" },
      { kata: "大きい", baca: "おおきい", arti: "besar", jenisBaca: "kunyomi" },
      { kata: "大人", baca: "おとな", arti: "orang dewasa", jenisBaca: "khusus", catatan: "Bacaan khusus: 大人 dibaca おとな sebagai satu kesatuan. Harus dihafal." },
    ],
  },
  {
    id: 86, kanji: "小", kategori: "Kata Sifat", level: "N5", jumlahGoresan: 3,
    onyomi: ["ショウ"], kunyomi: ["ちい(さい)", "こ", "お"], arti: "kecil",
    tips: "Garis tengah dengan dua titik kecil di sampingnya → kecil.",
    contoh: [
      { kata: "小学校", baca: "しょうがっこう", arti: "sekolah dasar", jenisBaca: "onyomi" },
      { kata: "小さい", baca: "ちいさい", arti: "kecil", jenisBaca: "kunyomi" },
      { kata: "小川", baca: "おがわ", arti: "sungai kecil", jenisBaca: "kunyomi" },
    ],
  },
  {
    id: 87, kanji: "長", kategori: "Kata Sifat", level: "N5", jumlahGoresan: 8,
    onyomi: ["チョウ"], kunyomi: ["なが(い)"], arti: "panjang; kepala/pemimpin",
    tips: "Seperti orang tua berambut panjang yang terurai.",
    contoh: [
      { kata: "社長", baca: "しゃちょう", arti: "direktur perusahaan", jenisBaca: "onyomi" },
      { kata: "長い", baca: "ながい", arti: "panjang", jenisBaca: "kunyomi" },
    ],
  },
  {
    id: 88, kanji: "高", kategori: "Kata Sifat", level: "N5", jumlahGoresan: 10,
    onyomi: ["コウ"], kunyomi: ["たか(い)"], arti: "tinggi; mahal",
    tips: "Gambar menara atau gedung bertingkat yang tinggi.",
    contoh: [
      { kata: "高校", baca: "こうこう", arti: "SMA", jenisBaca: "onyomi" },
      { kata: "高い", baca: "たかい", arti: "tinggi; mahal", jenisBaca: "kunyomi" },
    ],
  },
  {
    id: 89, kanji: "安", kategori: "Kata Sifat", level: "N5", jumlahGoresan: 6,
    onyomi: ["アン"], kunyomi: ["やす(い)"], arti: "murah; tenang",
    tips: "Perempuan (女) di bawah atap rumah (宀) → tenang, aman.",
    contoh: [
      { kata: "安い", baca: "やすい", arti: "murah", jenisBaca: "kunyomi" },
      { kata: "安心", baca: "あんしん", arti: "lega; tenang", jenisBaca: "onyomi" },
    ],
  },
  {
    id: 90, kanji: "新", kategori: "Kata Sifat", level: "N5", jumlahGoresan: 13,
    onyomi: ["シン"], kunyomi: ["あたら(しい)"], arti: "baru",
    bacaanJarang: ["あら(た)", "にい"],
    tips: "Berdiri (立) + pohon (木) + kapak (斤): pohon yang baru saja ditebang → baru.",
    contoh: [
      { kata: "新しい", baca: "あたらしい", arti: "baru", jenisBaca: "kunyomi" },
      { kata: "新聞", baca: "しんぶん", arti: "koran", jenisBaca: "onyomi" },
    ],
  },
  {
    id: 91, kanji: "古", kategori: "Kata Sifat", level: "N5", jumlahGoresan: 5,
    onyomi: ["コ"], kunyomi: ["ふる(い)"], arti: "lama; tua (benda)",
    tips: "Sepuluh (十) + mulut (口): cerita yang sudah diceritakan sepuluh generasi → lama.",
    contoh: [
      { kata: "古い", baca: "ふるい", arti: "lama/kuno", jenisBaca: "kunyomi" },
      { kata: "中古", baca: "ちゅうこ", arti: "barang bekas", jenisBaca: "onyomi" },
    ],
  },
  {
    id: 92, kanji: "白", kategori: "Kata Sifat", level: "N5", jumlahGoresan: 5,
    onyomi: ["ハク"], kunyomi: ["しろ", "しろ(い)"], arti: "putih",
    bacaanJarang: ["ビャク", "しら"],
    tips: "Matahari (日) dengan seberkas sinar di atasnya → putih bersinar.",
    contoh: [
      { kata: "白い", baca: "しろい", arti: "putih", jenisBaca: "kunyomi" },
      { kata: "面白い", baca: "おもしろい", arti: "menarik; lucu", jenisBaca: "kunyomi" },
      { kata: "白鳥", baca: "はくちょう", arti: "angsa", jenisBaca: "onyomi" },
    ],
  },
  {
    id: 93, kanji: "少", kategori: "Kata Sifat", level: "N5", jumlahGoresan: 4,
    onyomi: ["ショウ"], kunyomi: ["すく(ない)", "すこ(し)"], arti: "sedikit",
    tips: "Kecil (小) dengan coretan miring di bawah — dikurangi lagi → sedikit.",
    contoh: [
      { kata: "少し", baca: "すこし", arti: "sedikit", jenisBaca: "kunyomi" },
      { kata: "少ない", baca: "すくない", arti: "sedikit (jumlah)", jenisBaca: "kunyomi" },
      { kata: "少年", baca: "しょうねん", arti: "anak laki-laki; remaja", jenisBaca: "onyomi" },
    ],
  },
  {
    id: 94, kanji: "多", kategori: "Kata Sifat", level: "N5", jumlahGoresan: 6,
    onyomi: ["タ"], kunyomi: ["おお(い)"], arti: "banyak",
    tips: "Dua sore (夕) yang bertumpuk — banyak sore telah berlalu → banyak.",
    contoh: [
      { kata: "多い", baca: "おおい", arti: "banyak", jenisBaca: "kunyomi" },
      { kata: "多分", baca: "たぶん", arti: "mungkin", jenisBaca: "onyomi" },
    ],
  },

  // ---------- TEMPAT & BENDA ----------
  {
    id: 95, kanji: "国", kategori: "Tempat & Benda", level: "N5", jumlahGoresan: 8,
    onyomi: ["コク"], kunyomi: ["くに"], arti: "negara",
    tips: "Kotak (batas negara) dengan permata raja (玉) di dalamnya.",
    contoh: [
      { kata: "外国", baca: "がいこく", arti: "luar negeri", jenisBaca: "onyomi" },
      { kata: "国", baca: "くに", arti: "negara", jenisBaca: "kunyomi" },
      { kata: "中国", baca: "ちゅうごく", arti: "Tiongkok", jenisBaca: "onyomi" },
    ],
  },
  {
    id: 96, kanji: "語", kategori: "Tempat & Benda", level: "N5", jumlahGoresan: 14,
    onyomi: ["ゴ"], kunyomi: ["かた(る)"], arti: "bahasa; kata",
    tips: "Berkata (言) + lima (五) + mulut (口): lima mulut berbicara → bahasa.",
    contoh: [
      { kata: "日本語", baca: "にほんご", arti: "bahasa Jepang", jenisBaca: "onyomi" },
      { kata: "英語", baca: "えいご", arti: "bahasa Inggris", jenisBaca: "onyomi" },
      { kata: "物語", baca: "ものがたり", arti: "cerita; kisah", jenisBaca: "kunyomi" },
    ],
  },
  {
    id: 97, kanji: "電", kategori: "Tempat & Benda", level: "N5", jumlahGoresan: 13,
    onyomi: ["デン"], kunyomi: [], arti: "listrik",
    tips: "Hujan (雨) di atas dan kilat yang menyambar di bawahnya → listrik.",
    contoh: [
      { kata: "電車", baca: "でんしゃ", arti: "kereta listrik", jenisBaca: "onyomi" },
      { kata: "電話", baca: "でんわ", arti: "telepon", jenisBaca: "onyomi" },
      { kata: "電気", baca: "でんき", arti: "listrik; lampu", jenisBaca: "onyomi" },
    ],
  },
  {
    id: 98, kanji: "車", kategori: "Tempat & Benda", level: "N5", jumlahGoresan: 7,
    onyomi: ["シャ"], kunyomi: ["くるま"], arti: "mobil; kendaraan",
    tips: "Gerobak dilihat dari atas: kotak di tengah adalah badannya, garis tegak adalah as roda.",
    contoh: [
      { kata: "車", baca: "くるま", arti: "mobil", jenisBaca: "kunyomi" },
      { kata: "電車", baca: "でんしゃ", arti: "kereta listrik", jenisBaca: "onyomi" },
      { kata: "自転車", baca: "じてんしゃ", arti: "sepeda", jenisBaca: "onyomi" },
    ],
  },
  {
    id: 99, kanji: "道", kategori: "Tempat & Benda", level: "N5", jumlahGoresan: 12,
    onyomi: ["ドウ"], kunyomi: ["みち"], arti: "jalan",
    bacaanJarang: ["トウ"],
    tips: "Kepala (首) + jalan (辶): kepala menunjukkan arah jalan.",
    contoh: [
      { kata: "道", baca: "みち", arti: "jalan", jenisBaca: "kunyomi" },
      { kata: "水道", baca: "すいどう", arti: "air ledeng", jenisBaca: "onyomi" },
      { kata: "北海道", baca: "ほっかいどう", arti: "Hokkaido", jenisBaca: "onyomi" },
    ],
  },
  {
    id: 100, kanji: "店", kategori: "Tempat & Benda", level: "N5", jumlahGoresan: 8,
    onyomi: ["テン"], kunyomi: ["みせ"], arti: "toko",
    tips: "Atap miring (广) + menempati (占): tempat beratap untuk berjualan → toko.",
    contoh: [
      { kata: "店", baca: "みせ", arti: "toko", jenisBaca: "kunyomi" },
      { kata: "店員", baca: "てんいん", arti: "pramuniaga", jenisBaca: "onyomi" },
      { kata: "喫茶店", baca: "きっさてん", arti: "kedai kopi", jenisBaca: "onyomi" },
    ],
  },
  {
    id: 101, kanji: "駅", kategori: "Tempat & Benda", level: "N5", jumlahGoresan: 14,
    onyomi: ["エキ"], kunyomi: [], arti: "stasiun",
    tips: "Kuda (馬) di sebelah kiri: dulu stasiun adalah tempat mengganti kuda.",
    contoh: [
      { kata: "駅", baca: "えき", arti: "stasiun", jenisBaca: "onyomi" },
      { kata: "駅員", baca: "えきいん", arti: "petugas stasiun", jenisBaca: "onyomi" },
    ],
  },
  {
    id: 102, kanji: "社", kategori: "Tempat & Benda", level: "N5", jumlahGoresan: 7,
    onyomi: ["シャ"], kunyomi: ["やしろ"], arti: "perusahaan; kuil",
    tips: "Altar (ネ) + tanah (土): altar dewa tanah → kuil; kemudian juga berarti perusahaan.",
    contoh: [
      { kata: "会社", baca: "かいしゃ", arti: "perusahaan", jenisBaca: "onyomi" },
      { kata: "神社", baca: "じんじゃ", arti: "kuil Shinto", jenisBaca: "onyomi" },
      { kata: "社長", baca: "しゃちょう", arti: "direktur perusahaan", jenisBaca: "onyomi" },
    ],
  },
  {
    id: 103, kanji: "間", kategori: "Tempat & Benda", level: "N5", jumlahGoresan: 12,
    onyomi: ["カン", "ケン"], kunyomi: ["あいだ", "ま"], arti: "antara; jarak waktu",
    tips: "Matahari (日) terlihat di antara daun pintu gerbang (門) → antara.",
    contoh: [
      { kata: "時間", baca: "じかん", arti: "waktu", jenisBaca: "onyomi" },
      { kata: "間", baca: "あいだ", arti: "antara; selama", jenisBaca: "kunyomi" },
      { kata: "一週間", baca: "いっしゅうかん", arti: "satu minggu (lamanya)", jenisBaca: "onyomi" },
    ],
  },

  // ---------- TAMBAHAN (kategori Alam) ----------
  {
    id: 104, kanji: "魚", kategori: "Alam", level: "N5", jumlahGoresan: 11,
    onyomi: ["ギョ"], kunyomi: ["うお", "さかな"], arti: "ikan",
    tips: "Kepala ikan di atas, badan bersisik di tengah (田), dan sirip ekor di bawah (灬).",
    contoh: [
      { kata: "魚", baca: "さかな", arti: "ikan", jenisBaca: "kunyomi" },
      { kata: "魚屋", baca: "さかなや", arti: "toko ikan", jenisBaca: "kunyomi" },
      { kata: "金魚", baca: "きんぎょ", arti: "ikan mas koki", jenisBaca: "onyomi" },
    ],
  },
  {
    id: 105, kanji: "空", kategori: "Alam", level: "N5", jumlahGoresan: 8,
    onyomi: ["クウ"], kunyomi: ["そら", "あ(く)", "あ(ける)", "から"], arti: "langit; kosong",
    tips: "Lubang (穴) di atas + kerja (工): ruang kosong yang luas di atas kita → langit.",
    contoh: [
      { kata: "空", baca: "そら", arti: "langit", jenisBaca: "kunyomi" },
      { kata: "空港", baca: "くうこう", arti: "bandara", jenisBaca: "onyomi" },
      { kata: "空く", baca: "あく", arti: "kosong (tempat duduk dll.)", jenisBaca: "kunyomi" },
    ],
  },
];
