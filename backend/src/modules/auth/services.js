const { db } = require("../../core/database");

const COLLECTION = "users";

async function findUserByEmail(email) {
  const userDoc = await db.collection(COLLECTION).doc(email).get();
  if (!userDoc.exists) return null;
  return {
    email: userDoc.id,
    ...userDoc.data(),
  };
}

async function createUser(email, password) {
  const userRef = db.collection(COLLECTION).doc(email);
  const existing = await userRef.get();

  if (existing.exists) return null;

  await userRef.set({ password });

  return { email: email };
}

module.exports = { findUserByEmail, createUser };
