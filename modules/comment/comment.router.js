const express = require("express");
const commentController = require("./comment.controller");

const router = express.Router();

router.route("/").post(commentController.comment);
module.exports = router;
