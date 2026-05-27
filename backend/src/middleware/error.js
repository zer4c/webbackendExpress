function errorMiddleware(error, _req, res, _next) {
  return res.status(500).send({
    detail: "internal server error",
    ok: false,
  });
}

module.exports = { errorMiddleware };