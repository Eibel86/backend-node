const { Router } = require("express");
const { login, registry } = require("../controllers");

// const { check } = require('express-validator');
// const {} = require("../middlewares/index.middlewares")

// const { PASS_REGEX } = require("../utils/regexLibrary");


const router = new Router();


//LOGIN
router.post("/login", [
    // check("email", "invalid email").notEmpty()
    //     .withMessage('El email no puede estar vacío')
    //     .isEmail()
    //     .withMessage('El formato del email no es correcto')
    //     .isLength({ min: 3, max: 100 })
    //     .withMessage('Debe tener entre 3 y 100 caracteres'),
    // check("password", "invalid password").matches(PASS_REGEX),
    // validateInput
], login)
//REGISTRY
router.post("/registry", [
    // check("email", "invalid email").notEmpty()
    //     .withMessage('El email no puede estar vacío')
    //     .isEmail()
    //     .withMessage('El formato del email no es correcto')
    //     .isLength({ min: 3, max: 100 })
    //     .withMessage('Debe tener entre 3 y 100 caracteres'),
    // check("password", "invalid password").matches(PASS_REGEX),
    // check("name", "invalid name").notEmpty()
    //     .withMessage('El usuario no puede estar vacío')
    //     .isLength({ min: 2, max: 100 })
    //     .withMessage('El usuario debe tener entre 2 y 100 caracteres'),
    // validateInput
], registry)

//RENEWTOKEN
// router.get("/renewToken", [
//     // validateJWT
// ], renewToken)
//VALIDATE ADMIN ROLE
// router.get("/validateAdminRole", [
//     // validateJWT,
//     // validateRole("Admin")
// ], login)


module.exports = router;