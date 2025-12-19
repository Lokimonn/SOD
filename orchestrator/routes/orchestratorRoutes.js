const express = require("express");
const router = express.Router();

const orchestratorController = require("../controllers/orchestratorController");


router.get("/health", orchestratorController.getHealth);
router.post("/run", orchestratorController.run);

module.exports = router;
