const {
    registry,
    login
} = require("./userControllers")

const {
    getAllPdto,
    getPdtoByName,
    getPdtosByCatId,
    getPdtoById,
    createPdto,
    updatePdtoById,
    deletePdtoById,

    getAllTemplate,
    getTemplateById,
    getTemplateByCategory,
    createTemplate,
    updateTemplateById,
    deleteTemplateById
} = require("./productControllers")


module.exports = {
    //userControllers
    login,
    registry,

    //productControllers
    getAllPdto,
    getPdtoByName,
    getPdtosByCatId,
    getPdtoById,
    createPdto,
    updatePdtoById,
    deletePdtoById,

    //templateControllers
    getAllTemplate,
    getTemplateById,
    getTemplateByCategory,

    createTemplate,
    updateTemplateById,
    deleteTemplateById,
}