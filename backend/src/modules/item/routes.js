const { Router } = require("express");
const TodoItemController = require("./controller.js");

const router = Router();

router.get("/", TodoItemController.getAll);
router.get("/:id", TodoItemController.getById);
router.post("/", TodoItemController.createItem);
router.patch("/:id", TodoItemController.patchItem);
router.delete("/:id", TodoItemController.deleteItem);

module.exports = router;
