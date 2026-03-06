const express = require("express");
const router = express.Router();

const ctrl = require("../../controller/auth");
const schema = require("../../schema/userSchema");
const { validateBody } = require("../../middleware");

router.post("/signup", validateBody(schema.userSignUpSchema), ctrl.signup);

router.post("/signin", validateBody(schema.userSignInSchema), ctrl.signin);

router.patch("/", ctrl.signout);
//refresh
router.get("/", (req, res) => {});

module.exports = router;
