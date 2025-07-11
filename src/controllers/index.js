const {
    registry,
    login
} = require("./authControllers")

const {
    getAllPdto,
    getPdtoById,
    getPdtoByCategory,
    getAllTemplate,
    getTemplateById,
    getTemplateByCategory,
    createPdto,
    updatePdtoById,
    deletePdtoById,
    createTemplate,
    updateTemplateById,
    deleteTemplateById
} = require("./userControllers")


module.exports = {
    //authControllers
    login,
    registry,

    //userControllers
    getAllPdto,
    getPdtoById,
    getPdtoByCategory,

    getAllTemplate,
    getTemplateById,
    getTemplateByCategory,

    createPdto,
    updatePdtoById,
    deletePdtoById,

    createTemplate,
    updateTemplateById,
    deleteTemplateById,
}