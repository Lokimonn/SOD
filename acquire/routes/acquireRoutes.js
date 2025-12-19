const express = require('express');
const router = express.Router();

const acquireController = require("../controllers/acquireController");

router.get("/health", acquireController.getHealth);

router.post("/acquire", acquireController.postData);

module.exports = router;
