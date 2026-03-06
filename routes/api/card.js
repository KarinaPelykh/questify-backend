const express = require("express");
const router = express.Router();
const ctrl = require("../../controller/card");
const { validateBody } = require("../../middleware");
const cardSchema = require("../../schema/cardSchema");

router.get("/", ctrl.getAllCards);

router.post("/", validateBody(cardSchema), ctrl.createCard);

router.delete("/:id", ctrl.deleteCard);

router.patch("/:id", ctrl.editCardById);

module.exports = router;
