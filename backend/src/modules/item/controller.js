const TodoItemService = require("./services.js");
const onHeaders = require("on-headers");

const BASE_URL = "/todolist/item";

async function getAll(req, res, next) {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;
    const items = await TodoItemService.getItems(limit, offset, req.user.email);
    return res.status(200).send({
      status: 200,
      detail: "items retrieved",
      ok: true,
      limit,
      offset,
      data: items,
      links: {
        self: {
          href: `${BASE_URL}?limit=${limit}&offset=${offset}`,
          method: "GET",
        },
      },
    });
  } catch (error) {
    next(error);
  }
}

async function getById(req, res, next) {
  try {
    const item = await TodoItemService.getById(req.params.id, req.user.email);
    if (!item)
      return res
        .status(404)
        .send({ status: 404, detail: "item not found", ok: false });
    return res.status(200).send({
      status: 200,
      detail: "item retrieved",
      ok: true,
      data: item,
      links: {
        self: { href: `${BASE_URL}/${item.id}`, method: "GET" },
        update: { href: `${BASE_URL}/${item.id}`, method: "PATCH" },
        delete: { href: `${BASE_URL}/${item.id}`, method: "DELETE" },
        collection: { href: BASE_URL, method: "GET" },
      },
    });
  } catch (error) {
    next(error);
  }
}

async function createItem(req, res, next) {
  try {
    const item = await TodoItemService.createItem(req.body, req.user.email);
    onHeaders(res, function () {
      this.removeHeader("ETag");
    });
    return res.status(201).send({
      status: 201,
      detail: "item created",
      ok: true,
      data: item,
      links: {
        self: { href: `${BASE_URL}/${item.id}`, method: "GET" },
        update: { href: `${BASE_URL}/${item.id}`, method: "PATCH" },
        delete: { href: `${BASE_URL}/${item.id}`, method: "DELETE" },
        collection: { href: BASE_URL, method: "GET" },
      },
    });
  } catch (error) {
    next(error);
  }
}

async function patchItem(req, res, next) {
  try {
    const item = await TodoItemService.patchItem(
      req.params.id,
      req.body,
      req.user.email,
    );
    if (!item)
      return res
        .status(404)
        .send({ status: 404, detail: "item not found", ok: false });
    onHeaders(res, function () {
      this.removeHeader("ETag");
    });
    return res.status(200).send({
      status: 200,
      detail: "item updated",
      ok: true,
      data: item,
      links: {
        self: { href: `${BASE_URL}/${item.id}`, method: "GET" },
        delete: { href: `${BASE_URL}/${item.id}`, method: "DELETE" },
        collection: { href: BASE_URL, method: "GET" },
      },
    });
  } catch (error) {
    next(error);
  }
}

async function deleteItem(req, res, next) {
  try {
    const result = await TodoItemService.deleteItem(
      req.params.id,
      req.user.email,
    );
    if (!result)
      return res
        .status(404)
        .send({ status: 404, detail: "item not found", ok: false });
    onHeaders(res, function () {
      this.removeHeader("ETag");
    });
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
}

module.exports = { getAll, getById, createItem, patchItem, deleteItem };
