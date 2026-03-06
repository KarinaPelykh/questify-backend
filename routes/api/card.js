const express = require("express");
const router = express.Router();
const ctrl = require("../../controller/card");
const { validateBody, authenticate } = require("../../middleware");
const cardSchema = require("../../schema/cardSchema");

router.get("/", authenticate, ctrl.getAllCards);

router.post("/", authenticate, validateBody(cardSchema), ctrl.createCard);

router.delete("/:id", authenticate, ctrl.deleteCard);

router.patch("/:id", authenticate, ctrl.editCardById);

module.exports = router;
