const express = require("express");
const router = express.Router();
const AIController = require('../controllers/AIController');
router.post("/diagnose",AIController.diagnose);
module.exports = router;