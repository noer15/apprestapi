const express = require("express");
const auth = require("./auth");
const router = express.Router();

router.post("/api/v1/registrasi", auth.registrasi);
router.post("/api/v1/login", auth.login);

module.exports = router;
