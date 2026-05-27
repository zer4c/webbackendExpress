const TodoItemService = require("./services.js");

async function getAll(_req, res, next) {
  try {
    const items = await TodoItemService.getItems();
    return res.status(200).send({
      detail: "items retrieved",
      ok: true,
      data: items,
    });
  } catch {
    next();
  }
}

async function getById(req, res, next) {
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
    next();
  }
}

async function createItem(req, res, next) {
  try {
    const item = await TodoItemService.createItem(req.body);
    return res.status(201).send({
      detail: "item created",
      ok: true,
      data: item,
    });
  } catch {
    next();
  }
}

async function patchItem(req, res, next) {
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
    next();
  }
}

async function deleteItem(req, res, next) {
  try {
    const result = await TodoItemService.deleteItem(req.params.id);
    if (!result) {
      return res.status(404).send({ detail: "item not found", ok: false });
    }
    return res.status(204).send();
  } catch {
    next();
  }
}

module.exports = {
  getAll,
  getById,
  createItem,
  patchItem,
  deleteItem,
};