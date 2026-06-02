const { db } = require("../../core/database.js");

const COLLECTION = "drive";

async function getFiles(limit, offset, user_email) {
  const snapshot = await db
    .collection(COLLECTION)
    .where("user_email", "==", user_email)
    .offset(offset)
    .limit(limit)
    .get();

  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

async function getFileById(id, user_email) {
  const doc = await db.collection(COLLECTION).doc(id).get();
  if (!doc.exists) return null;
  if (doc.data().user_email !== user_email) return null;
  return { id: doc.id, ...doc.data() };
}

async function createFile(data, user_email) {
  const newFile = {
    bytes: data.bytes,
    user_email,
  };
  const docRef = await db.collection(COLLECTION).add(newFile);
  return { id: docRef.id, ...newFile };
}

async function deleteFile(id, user_email) {
  const docRef = db.collection(COLLECTION).doc(id);
  const doc = await docRef.get();
  if (!doc.exists) return null;
  if (doc.data().user_email !== user_email) return null;
  await docRef.delete();
  return true;
}

module.exports = { getFiles, getFileById, createFile, deleteFile };
