# GTA 6 Clipper — Windah Ketemu Bigfoot

Entry make.fun untuk bounty **gta6-clipper-01** ("Clip GTA 6 for the most
YouTube views", hadiah $500 untuk 20 video teratas, deadline 23 November
2026 08:00 WIB). Video-nya sendiri yang jadi entry: peringkat ditentukan
jumlah views YouTube saat deadline, bukan oleh program di repo ini.

## Momen yang dipilih

**Windah Basudara ketemu Bigfoot di GTA VI**, dari video GAMEPLAY #3
(`https://www.youtube.com/watch?v=B2Bon2X1jPQ`), segmen 01:02:30–01:06:30.

Alur momennya (sudah diverifikasi frame demi frame dari footage):

1. Jason jalan di rawa Grassrivers, Windah kaget: "Guys, itu apa?!"
2. Kejar-kejaran di rawa — "Kejar, kejar!" — sampai ke totem ritual kayu
   yang menyeramkan di tengah rawa.
3. Windah teriak "CLIP, CLIP, CLIP!", lalu Jason terkapar dan kamera
   close-up kaki berbulu Bigfoot lewat di samping tubuhnya.
4. Layar game menghitam; Windah menutup mulut, kaget.
5. Payoff: "Gila guys, gua orang pertama yang ketemu Bigfoot loh" dan
   "gua jadi merasa bersalah nembak dia".

Kenapa momen ini: Bigfoot adalah easter egg legendaris GTA yang langsung
dikenali penonton; arc-nya lengkap dalam dua menit (ketemu → kejar →
diserang → pingsan → nyesel lucu); reaksi Windah spontan dan jenaka; dan
Windah adalah streamer Indonesia dengan peak viewers #1 dunia di hari
pertama rilis GTA VI (392.505 penonton, mengalahkan IShowSpeed). Momen
"ikan pertama" sengaja tidak dipakai karena sudah dipakai peserta lain.

## Klipnya

File: `gta6-clipper-01-short.mp4` (dibuat dengan ffmpeg di sesi ini).

- Vertikal 1080x1920, 60fps, durasi 39 detik, format blur-fill supaya
  gameplay utuh dan facecam Windah tetap kelihatan.
- Hook 3 detik pertama langsung puncak momen, tanpa intro.
- Teks layar Bahasa Indonesia besar: "WINDAH KETEMU BIGFOOT!" dan
  "ORANG PERTAMA YANG KETEMU BIGFOOT".
- 9 detik terakhir adalah pitch make.fun (teks layar besar):
  "Bikin klip kayak gini pakai AI, dapat uang di make.fun" +
  "make.fun/bounty/gta6-clipper-01".

Judul Short yang disarankan: **"WINDAH KETEMU BIGFOOT DI GTA 6 😱 ORANG PERTAMA!"**

## Cara kerja main.ts

`main.ts` (Node 22, standard library saja) menyalin `VIDEO.json` dari
root repositori ke direktori output. Itu saja tugasnya — gate membaca
`VIDEO.json` dari output, lalu membaca views video lewat YouTube Data
API. Tidak ada network, tidak ada jam dinding, tidak ada file di luar
repo; dua run menulis byte yang sama.

`VIDEO.json` saat ini masih placeholder — diganti alamat Short YouTube
aslinya setelah klip diupload publik.

## Menjalankan lokal

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

Lalu bandingkan `out/VIDEO.json` dengan `VIDEO.json` di root — harus
sama byte-nya.

## Deskripsi YouTube

Saat upload, deskripsi video harus memuat baris ini kata demi kata:

```
Made by my AI agent for a $500 bounty on make.fun, where you can earn money making clips with AI: https://make.fun/bounty/gta6-clipper-01
```

ditambah play code: `makefun-stream-sundae-armchair`.
