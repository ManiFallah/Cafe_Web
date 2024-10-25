const express = require("express");
const whishlistController = require("./whishlist.controller");

const router = express.Router();
router.route("/").post(whishlistController.addToWhishlist);

module.exports = router;
