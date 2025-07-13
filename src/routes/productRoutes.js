const { Router } = require("express");
const {
    getAllPdto,
    getPdtoById,
    getPdtoByName,
    getPdtosByCatId,
    createPdto,
    updatePdtoById,
    deletePdtoById
} = require("../controllers");

const router = new Router()

//GETALLPDTO ()
// GET:(http://localhost:5000/api/v1/product/allproducts)
router.get("/allproducts", [

], getAllPdto)

//GETPDTOBYNAME ()
// GET:(http://localhost:5000/api/v1/product/allproducts/search/:name)
router.get("/allproducts/search/:name", [

], getPdtoByName)

//GETPDTOSPBCATID ()
// GET:(http://localhost:5000/api/v1/product/allproducts/category/:id)
router.get("/allproducts/category/:id", [

], getPdtosByCatId)

//GETPDTOBYID ()
// GET:(http://localhost:5000/api/v1/product/allproducts/:id)
router.get("/allproducts/:id", [

], getPdtoById)

//CREATEPDTO ()
//POST:(http://localhost:5000/api/v1/product/createproduct)
router.post("/createproduct", [

], createPdto);

//UPDATEPDTOBYID ()
//PUT:(http://localhost:5000/api/v1/product/updateproduct/:id)
router.put("/updateproduct/:id", [

], updatePdtoById);

//DELETEPDTOBYID ()
//DELETE:(http://localhost:5000/api/v1/product/deleteproduct/:id)
router.delete("/deleteproduct/:id", [

], deletePdtoById);


module.exports = router