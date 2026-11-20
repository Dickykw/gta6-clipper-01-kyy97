// gta6-clipper-01 entry — kyy97
//
// Program ini cuma melakukan satu hal: menyalin VIDEO.json dari root
// repositori ke direktori output, tempat gate membacanya. Video-nya
// sendiri yang dinilai (views YouTube), bukan apa pun yang ditulis
// program ini. Node 22, standard library saja, tanpa network, tanpa
// jam dinding, tanpa file di luar repositori. Dua run menulis byte
// yang sama karena isi VIDEO.json disalin apa adanya.
//
// Klipnya: Windah Basudara ketemu Bigfoot di GTA VI (GAMEPLAY #3),
// dipotong vertikal 1080x1920 dengan pitch make.fun di akhirnya.
// Video aslinya sudah publik di YouTube sebagai Short:
// https://www.youtube.com/shorts/Zk54l_KxfbA
// (channel MomentClipers, upload 20 Nov 2026) — VIDEO.json menunjuk
// ke alamat itu, dan gate membaca views-nya lewat YouTube Data API.
//
// Menjalankan lokal seperti grader:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Di dalam grader, file repo ada di /bot dan output di /output.
// Di luar grader, dua env var ini menggantikannya.
const repoRoot = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const sourcePath = join(repoRoot, "VIDEO.json");
const targetPath = join(outDir, "VIDEO.json");

let raw: string;
try {
  raw = readFileSync(sourcePath, "utf8");
} catch (err) {
  console.error(`tidak bisa membaca ${sourcePath}: ${(err as Error).message}`);
  process.exit(1);
}

// VIDEO.json harus objek JSON dengan satu field url yang bentuknya
// alamat video YouTube; kalau tidak, lebih baik gagal di sini
// daripada menyerahkan file rusak ke gate.
let parsed: unknown;
try {
  parsed = JSON.parse(raw);
} catch {
  console.error("VIDEO.json bukan JSON yang valid");
  process.exit(1);
}

const url = (parsed as { url?: unknown }).url;
if (typeof parsed !== "object" || parsed === null || typeof url !== "string") {
  console.error(
    `VIDEO.json di ${sourcePath} harus objek JSON dengan field "url" string`,
  );
  process.exit(1);
}

// Kontrak gate: url harus alamat video YouTube (shorts, watch, atau
// youtu.be) dengan id 11 karakter. Kalau bentuknya salah, gagal di sini
// dengan pesan yang jelas daripada menyerahkan file rusak ke gate.
if (
  !/^https:\/\/(www\.|m\.)?(youtube\.com\/(shorts\/|watch\?v=)|youtu\.be\/)[A-Za-z0-9_-]{11}/.test(
    url,
  )
) {
  console.error(
    `VIDEO.json di ${sourcePath} punya url yang bukan alamat video YouTube: ${url}`,
  );
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(targetPath, raw, "utf8");

// Verifikasi: baca balik file yang baru ditulis dan pastikan isinya
// sama persis dengan sumber — grader menjalankan program dua kali
// dan mengharapkan byte yang sama di kedua run.
const writtenBack = readFileSync(targetPath, "utf8");
if (writtenBack !== raw) {
  console.error("verifikasi gagal: isi out/VIDEO.json tidak sama dengan sumber");
  process.exit(1);
}
