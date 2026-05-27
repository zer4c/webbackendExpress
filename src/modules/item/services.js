const { db } = require("../../core/database.js");

const COLLECTION = "todoItems";

async function getItems(limit, offset) {
  const snapshot = await db
    .collection(COLLECTION)
    .offset(offset)
    .limit(limit)
    .get();

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

async function getById(id) {
  const doc = await db.collection(COLLECTION).doc(id).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() };
}

async function createItem(data) {
  const newItem = {
    estado: "pendiente",
    descripcion: data.descripcion,
    fechaCreacion: new Date().toISOString(),
    fechaFinal: data.fechaFinal ?? null,
  };
  const docRef = await db.collection(COLLECTION).add(newItem);
  return { id: docRef.id, ...newItem };
}

async function patchItem(id, data) {
  const docRef = db.collection(COLLECTION).doc(id);
  const doc = await docRef.get();

  if (!doc.exists) return null;

  const updatedFields = {};
  if ("estado" in data) updatedFields.estado = data.estado;
  if ("descripcion" in data) updatedFields.descripcion = data.descripcion;
  if ("fechaFinal" in data) updatedFields.fechaFinal = data.fechaFinal;
  await docRef.update(updatedFields);
  return { id, ...doc.data(), ...updatedFields };
}

async function deleteItem(id) {
  const docRef = db.collection(COLLECTION).doc(id);
  const doc = await docRef.get();

  if (!doc.exists) return null;

  await docRef.delete();
  return true;
}

module.exports = { getItems, getById, createItem, patchItem, deleteItem };
