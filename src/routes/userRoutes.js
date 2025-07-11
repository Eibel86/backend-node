const { Router } = require("express");
const { getAllPdto, getPdtoById } = require("../controllers");



const router = new Router()

//getAllPdto

router.get("/productos", [

], getAllPdto)

router.get("/productos", [

], getPdtoById)

module.exports = router