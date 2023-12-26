const router = require("express").Router();


// Call each Module form appController to control the Routes or API
const { welcome, signUp, users, userById } = require("../controller/userController.js");


router.get("/", welcome);
router.post("/signUp", signUp);
router.get("/users", users);
router.get("/userById/:userId", userById);

module.exports = router;