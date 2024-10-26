const express = require("express");
const saleController = require("./sale.controller");

const router = express.Router();
router.route("/").post(saleController.goOnSale);

module.exports = router;
