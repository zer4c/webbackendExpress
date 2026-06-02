const { db } = require("../../core/database.js");
const COLLECTION = "todoItems";

async function getItems(limit, offset, user_email) {
  const snapshot = await db
    .collection(COLLECTION)
    .where("user_email", "==", user_email)
    .offset(offset)
    .limit(limit)
    .get();

  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

async function getById(id, user_email) {
  const doc = await db.collection(COLLECTION).doc(id).get();
  if (!doc.exists) return null;
  if (doc.data().user_email !== user_email) return null;
  return { id: doc.id, ...doc.data() };
}

async function createItem(data, user_email) {
  const newItem = {
    estado: "pendiente",
    descripcion: data.descripcion,
    fechaCreacion: new Date().toISOString(),
    fechaFinal: data.fechaFinal ?? null,
    user_email,
  };
  const docRef = await db.collection(COLLECTION).add(newItem);
  return { id: docRef.id, ...newItem };
}

async function patchItem(id, data, user_email) {
  const docRef = db.collection(COLLECTION).doc(id);
  const doc = await docRef.get();
  if (!doc.exists) return null;
  if (doc.data().user_email !== user_email) return null;

  const updatedFields = {};
  if ("estado" in data) updatedFields.estado = data.estado;
  if ("descripcion" in data) updatedFields.descripcion = data.descripcion;
  if ("fechaFinal" in data) updatedFields.fechaFinal = data.fechaFinal;

  await docRef.update(updatedFields);
  return { id, ...doc.data(), ...updatedFields };
}

async function deleteItem(id, user_email) {
  const docRef = db.collection(COLLECTION).doc(id);
  const doc = await docRef.get();
  if (!doc.exists) return null;
  if (doc.data().user_email !== user_email) return null;
  await docRef.delete();
  return true;
}

module.exports = { getItems, getById, createItem, patchItem, deleteItem };
