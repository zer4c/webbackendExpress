require("dotenv").config();
const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const serviceAccount = require("./tokenfirebase.json");

initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

const USERS = [
  { email: "alice@test.com", password: "123456" },
  { email: "bob@test.com", password: "123456" },
];

const estados = ["pendiente", "completado"];

function randomDate() {
  const d = new Date();
  d.setDate(d.getDate() - Math.floor(Math.random() * 30));
  return d.toISOString();
}

function randomFechaFinal() {
  if (Math.random() > 0.5) return null;
  const d = new Date();
  d.setDate(d.getDate() + Math.floor(Math.random() * 30));
  return d.toISOString();
}

const SMALL_PNG_BASE64 =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

async function seed() {
  for (const user of USERS) {
    await db
      .collection("users")
      .doc(user.email)
      .set({ password: user.password });
    console.log(`Usuario creado: ${user.email}`);

    for (let i = 1; i <= 15; i++) {
      await db.collection("todoItems").add({
        descripcion: `Tarea ${i} de ${user.email}`,
        estado: estados[i % 2],
        fechaCreacion: randomDate(),
        fechaFinal: randomFechaFinal(),
        user_email: user.email,
      });
    }
    console.log(`15 items creados para ${user.email}`);

    for (let i = 1; i <= 15; i++) {
      await db.collection("drive").add({
        bytes: SMALL_PNG_BASE64,
        user_email: user.email,
      });
    }
    console.log(`15 archivos creados para ${user.email}`);
  }

  console.log("Seed completado.");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
