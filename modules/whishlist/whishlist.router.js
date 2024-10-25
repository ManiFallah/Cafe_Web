const express = require("express");
const whishlistController = require("./whishlist.controller");

const router = express.Router();
router
  .route("/")
  .post(whishlistController.addToWhishlist)
  .get(whishlistController.getWhishlist);
router.route("/del").delete(whishlistController.delete);
module.exports = router;
