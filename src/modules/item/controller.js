const TodoItemService = require("./services.js");

async function getAll(_req, res) {
  try {
    const items = await TodoItemService.getItems();
    return res.status(200).send({
      detail: "items retrieved",
      ok: true,
      data: items,
    });
  } catch {
    return res.status(500).send({ detail: "internal server error", ok: false });
  }
}

async function getById(req, res) {
  try {
    const item = await TodoItemService.getById(req.params.id);
    if (!item) {
      return res.status(404).send({ detail: "item not found", ok: false });
    }
    return res.status(200).send({
      detail: "item retrieved",
      ok: true,
      data: item,
    });
  } catch {
    return res.status(500).send({ detail: "internal server error", ok: false });
  }
}

async function createItem(req, res) {
  try {
    const item = await TodoItemService.createItem(req.body);
    return res.status(201).send({
      detail: "item created",
      ok: true,
      data: item,
    });
  } catch {
    return res.status(500).send({ detail: "internal server error", ok: false });
  }
}

async function patchItem(req, res) {
  try {
    const item = await TodoItemService.patchItem(req.params.id, req.body);
    if (!item) {
      return res.status(404).send({ detail: "item not found", ok: false });
    }
    return res.status(200).send({
      detail: "item updated",
      ok: true,
      data: item,
    });
  } catch {
    return res.status(500).send({ detail: "internal server error", ok: false });
  }
}

async function deleteItem(req, res) {
  try {
    const result = await TodoItemService.deleteItem(req.params.id);
    if (!result) {
      return res.status(404).send({ detail: "item not found", ok: false });
    }
    return res.status(204).send();
  } catch {
    return res.status(500).send({ detail: "internal server error", ok: false });
  }
}

module.exports = {
  getAll,
  getById,
  createItem,
  patchItem,
  deleteItem,
};
