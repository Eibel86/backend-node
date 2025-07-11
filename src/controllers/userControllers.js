// CONTROLADORES USUARIO Y ADMINISTRADOR

//////////////CONTROLADOR DE PRODUCTOS////////////////////////
//getAllPdto : Todos los productos.
const getAllPdto = (req, res) => {
    res.status(200).json({
        msg: 'Entrando a Todos los productos'
    })
};

//getPdtoByCategory : Todos los productos por categoria.
const getPdtoByCategory = (req, res) => {
    res.status(200).json({
        msg: 'Entrando a los productos por categoria'
    })
};

//getPdtoById : Todos los productos por id
const getPdtoById = (req, res) => {
    res.status(200).json({
        msg: 'Entrando al producto por id'
    })
};

//////////////CONTROLADOR DE PLANTILLAS////////////////////////

//getAllTemplate : Todas las plantillas.
const getAllTemplate = (req, res) => {
    res.status(200).json({
        msg: 'Entrando a Todas las plantillas'
    })
};

//getTemplateByCategory : Todas las plantillas por categoria.
const getTemplateByCategory = (req, res) => {
    res.status(200).json({
        msg: 'Entrando a Todas las plantillas por categoria'
    })
};
//getTemplateById : Todas las plantillas por id.
const getTemplateById = (req, res) => {
    res.status(200).json({
        msg: 'Entrando a Todas las plantillas por id'
    })
};

//////////////CONTROLADOR ADMINISTRADOR////////////////////////

//////PRODUCTOS///////////////
//createPdto : Crear producto.
const createPdto = (req, res) => {
    res.status(200).json({
        msg: 'Entrando a Crear producto'
    })
};
//updatePdtoById : Editar producto por id.
const updatePdtoById = async (req, res) => {
    res.status(200).json({
        msg: 'Entrando a Editar producto por id'
    })
};
//deletePdtoById : Borrar producto por id.
const deletePdtoById = async (req, res) => {
    res.status(200).json({
        msg: 'Entrando a Eliminar pdto por id'
    })
};

//createTemlate : Crear plantilla
const createTemplate = (req, res) => {
    res.status(200).json({
        msg: 'Entrando a Crear plantilla'
    })
};

//updateTemlateById : Editar plantilla por id.
const updateTemplateById = (req, res) => {
    res.status(200).json({
        msg: 'Entrando a Editar plantilla por id'
    })
};

//deleteTemlateById : Editar plantilla por id.
const deleteTemplateById = (req, res) => {
    res.status(200).json({
        msg: 'Entrando a Eliminar plantilla por id'
    })
};

const createFavourite = async (req, res) => {
};

const deleteFavourite = async (req, res) => {
};


const getFavouritesOfUser = async (req, res) => {
};

module.exports = {
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




