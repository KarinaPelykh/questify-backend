const express = require("express");
const router = express.Router();

const ctrl = require("../../controller/auth");
const schema = require("../../schema/userSchema");
const { validateBody } = require("../../middleware");

const signupValidation = validateBody(schema.userSignUpSchema);
const signinValidation = validateBody(schema.userSignInSchema);

router.post("/signup", signupValidation, ctrl.signup);

router.post("/signin", signinValidation, ctrl.signin);
//signout user
router.patch("/", (req, res) => {});
//refresh
router.get("/", (req, res) => {});

module.exports = router;
