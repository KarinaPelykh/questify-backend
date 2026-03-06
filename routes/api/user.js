const express = require("express");
const router = express.Router();

const ctrl = require("../../controller/auth");
const schema = require("../../schema/userSchema");
const { validateBody, authenticate } = require("../../middleware");

router.post("/signup", validateBody(schema.userSignUpSchema), ctrl.signup);

router.post("/signin", validateBody(schema.userSignInSchema), ctrl.signin);

router.post("/signout", authenticate, ctrl.signout);

router.get("/refresh", authenticate, ctrl.refresh);

module.exports = router;
