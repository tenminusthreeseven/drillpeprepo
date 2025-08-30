const express = require("express");
const router = express.Router();
const { getTasks, createTask } = require("../controllers/taskcontroller");
const authmiddleware = require("../middleware/authmiddleware"); // <-- lowercase to match your renamed file

router.get("/", authmiddleware, getTasks);
router.post("/", authmiddleware, createTask);

module.exports = router;
