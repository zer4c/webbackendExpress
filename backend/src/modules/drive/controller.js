const DriveService = require("./services.js");

const BASE_URL = "/drive";

async function getAll(req, res, next) {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;
    const files = await DriveService.getFiles(limit, offset, req.user.email);
    return res.status(200).send({
      status: 200,
      detail: "files retrieved",
      ok: true,
      limit,
      offset,
      data: files,
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
    const file = await DriveService.getFileById(req.params.id, req.user.email);
    if (!file)
      return res
        .status(404)
        .send({ status: 404, detail: "file not found", ok: false });
    return res.status(200).send({
      status: 200,
      detail: "file retrieved",
      ok: true,
      data: file,
      links: {
        self: { href: `${BASE_URL}/${file.id}`, method: "GET" },
        delete: { href: `${BASE_URL}/${file.id}`, method: "DELETE" },
        collection: { href: BASE_URL, method: "GET" },
      },
    });
  } catch (error) {
    next(error);
  }
}

async function createFile(req, res, next) {
  try {
    const file = await DriveService.createFile(req.body, req.user.email);
    return res.status(201).send({
      status: 201,
      detail: "file uploaded",
      ok: true,
      data: file,
      links: {
        self: { href: `${BASE_URL}/${file.id}`, method: "GET" },
        delete: { href: `${BASE_URL}/${file.id}`, method: "DELETE" },
        collection: { href: BASE_URL, method: "GET" },
      },
    });
  } catch (error) {
    next(error);
  }
}

async function deleteFile(req, res, next) {
  try {
    const result = await DriveService.deleteFile(req.params.id, req.user.email);
    if (!result)
      return res
        .status(404)
        .send({ status: 404, detail: "file not found", ok: false });
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
}

module.exports = { getAll, getById, createFile, deleteFile };
