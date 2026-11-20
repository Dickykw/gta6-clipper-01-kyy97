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
// VIDEO.json di sini masih placeholder — diganti alamat Short YouTube
// aslinya begitu klip diupload publik oleh user.
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

if (
  typeof parsed !== "object" ||
  parsed === null ||
  typeof (parsed as { url?: unknown }).url !== "string"
) {
  console.error('VIDEO.json harus objek JSON dengan field "url" string');
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
