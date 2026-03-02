const express = require("express");
const ctrl = require("../../controller/card");
const router = express.Router();
//get all
router.get("/", ctrl.getAllCards);
//add one card
router.post("/", (req, res) => {});
//delete card
router.delete("/:id", (req, res) => {});
// edit card
router.patch("/:id", (req, res) => {});
module.exports = router;
