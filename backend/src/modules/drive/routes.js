const { Router } = require("express");
const DriveController = require("./controller.js");

const router = Router();

router.get("/", DriveController.getAll);
router.get("/:id", DriveController.getById);
router.post("/", DriveController.createFile);
router.delete("/:id", DriveController.deleteFile);

module.exports = router;
