//CONTROLADORES DE PRODUCTO Y PLANTILLAS//
const productModel = require("../models/productModel")
const categoryModel = require("../models/categoryModel")
const {
    getAll,
    findAllPdtosByName,
    findAllPdtosByCatId,
    findPdtoById,
    findByPdtoOne,
    updateProductById,
    deleteProductById
} = require("../models/productModel");


//////////////CONTROLADOR DE PRODUCTOS////////////////////////
//getAllPdto : Todos los productos.
const getAllPdto = async (req, res) => {
    try {
        const productos = await getAll(); //Llamada al modelo para obtener todas los productos

        res.status(200).json({ //200 OK: solicitud exitosa, respuesta satisfactoria
            ok: true,
            token: req.renewedToken,
            data: productos,
        });
    } catch (error) {
        console.error("Error en getAllPdtos:", error);
        res.status(500).json({ //500 INTERNAL SERVER ERROR 
            ok: false,
            token: req.renewedToken,
            error: "Error al obtener los productos",
        });
    }
};

//getPdtoByName : Todos los productos por nombre relativo.
const getPdtoByName = async (req, res) => {
    try {
        const { name } = req.params; //Obtiene la palabra de la URL
        const products = await findAllPdtosByName(name); //Busca todas los productos que coincidan parcialmente con la palabra.

        if (!products || products.length === 0) { //Si no hay productos
            return res.status(404).json({ //404 NOT FOUND: el servidor no pudo encontrar el recurso solicitado por el cliente(navegador)
                ok: false,
                token: req.renewedToken,
                error: 'No se encontraron productos con esa palabra.',
            });
        }
        res.status(200).json({ //200 OK: solicitud y respuesta exitosas
            ok: true,
            token: req.renewedToken,
            data: products,
        });


    } catch (error) {
        console.error('Error en getPdtoByName:', error);
        res.status(500).json({ //500 INTERNAL SERVER ERROR
            ok: false,
            token: req.renewedToken,
            error: 'Error interno al buscar los productos por nombre relativo.',
        });
    }
};

//getPdtosByCatId : Todos los productos por categoria id.
const getPdtosByCatId = async (req, res) => {
    try {
        const { id } = req.params; //Obtiene la palabra de la URL
        const products = await findAllPdtosByCatId(id); //Busca todas los productos que coincidan parcialmente con la palabra.

        if (!products || products.length === 0) { //Si no hay productos
            return res.status(404).json({ //404 NOT FOUND: el servidor no pudo encontrar el recurso solicitado por el cliente(navegador)
                ok: false,
                token: req.renewedToken,
                error: 'No se encontraron productos con esa categoria_id.',
            });
        }
        res.status(200).json({ //200 OK: solicitud y respuesta exitosas
            ok: true,
            token: req.renewedToken,
            data: products,
        });


    } catch (error) {
        console.error('Error en getPdtosByCatId:', error);
        res.status(500).json({ //500 INTERNAL SERVER ERROR
            ok: false,
            token: req.renewedToken,
            error: 'Error interno al buscar los productos por categoria id.',
        });
    }
};

//getPdtoById : Todos los productos por id
const getPdtoById = async (req, res) => {

    try {
        const { id } = req.params;
        const product = await findPdtoById(id);

        if (!product) {
            return res.status(404).json({ //404 NOT FOUND
                ok: false,
                token: req.renewedToken,
                error: 'Producto no encontrada.',
            });
        }

        res.status(200).json({ //200 OK: respuesta exitosa
            ok: true,
            token: req.renewedToken,
            data: product,
        });

    } catch (error) {
        console.error('Error en getPdtoById:', error);
        res.status(500).json({ //500 INTERNAL SERVER ERROR
            ok: false,
            token: req.renewedToken,
            error: 'Error interno al buscar el producto.',
        });
    }
};

//createPdto : Crear producto.
const createPdto = async (req, res) => {

    const { //Desestructura los datos recibidos del cuerpo-body de la solicitud
        categoria_name,
        producto_name,
        dimension,
        descripcion,
        color,
        precio,
    } = req.body;

    // const image_url = req.file.path;

    try {
        // Verificar si el producto ya existe
        const existingPdto = await findByPdtoOne(producto_name);
        if (existingPdto) {
            return res.status(409).json({
                ok: false,
                token: req.renewedToken,
                msg: 'El producto ya existe', //404 CONFLICT
            });
        }

        // Insertar director si no existe y obtener su id
        const cat_id = await categoryModel.insertCategoryIfNotExists(categoria_name); //Busca la categoria por nombre y lo inserta si no lo encuentra

        // Insertar la película. Crea el objeto con todos los datos. 
        const newPdto = await productModel.insertPdto({
            cat_id,
            producto_name,
            dimension,
            descripcion,
            color,
            precio,
        });

        //Devuelve una respuesta exitosa con los datos de la peli recién creada
        return res.status(201).json({ //201 CREATED 
            ok: true,
            token: req.renewedToken,
            msg: 'Producto creado con exito',
            film: newPdto,
        });

    } catch (error) {
        console.error('Error en createPdto:', error);
        return res.status(500).json({ //500 INTERNAL SERVER ERROR
            ok: false,
            msg: 'Error interno del servidor',
        });
    }
};
///OK HASTA AKI//
//updatePdtoById : Editar producto por id.
const updatePdtoById = async (req, res) => {
    // res.status(200).json({
    //     msg: 'Entrando a Editar producto por id'
    // })
    try {
        const { //Extrae del body los datos que pueden actualizarse
            categoria_name,
            producto_name,
            dimension,
            descripcion,
            color,
            precio,
        } = req.body;

        //const image_url = req.file ? req.file.path : null;

        const cat_id = await categoryModel.insertCategoryIfNotExists(categoria_name);
        const { id: idParam } = req.params;
        const pdto_id = Number(idParam);
        if (Number.isNaN(pdto_id)) {
            return res.status(400).json({
                ok: false,
                error: "ID inválido o ausencia del parámetro en la URL"
            });
        }
        console.log("ID a actualizar:", pdto_id);
        const updatedPdto = await updateProductById({// Llama a la función que actualiza el pdto en la BBDD pasando todos los datos
            pdto_id,
            cat_id,
            producto_name,
            dimension,
            descripcion,
            color,
            precio,
        });

        if (!updatedPdto) { // Si no se ha actualiza ninguna pdto:
            return res.status(404).json({
                ok: false,
                token: req.renewedToken,
                error: "Producto no encontrada o no actualizada",
            });
        }

        res.status(200).json({
            ok: true,
            data: updatedPdto,
        });

    } catch (error) {
        console.error("Error en updatePdtoById:", error);
        res.status(500).json({
            ok: false,
            error: "Error interno al actualizar el producto.",
        });
    }
};



//deletePdtoById : Borrar producto por id.
const deletePdtoById = async (req, res) => {
    // res.status(200).json({
    //     msg: 'Entrando a Eliminar pdto por id'
    // })
    //Extrae el parámetro de la URL (req.params)
    const { id: idParam } = req.params;
    const pdto_id = Number(idParam);
    if (Number.isNaN(pdto_id)) {
        return res.status(400).json({
            ok: false,
            error: "ID inválido o ausencia del parámetro en la URL"
        });
    }

    try {
        // Llama a la función del modelo que elimina el producto por su ID
        const deleted = await deleteProductById(pdto_id);

        if (!deleted) { //Si no encuentra el producto
            return res.status(404).json({
                ok: false,
                token: req.renewedToken,
                msg: 'Producto no encontrado',
            });
        }

        return res.status(200).json({
            ok: true,
            token: req.renewedToken,
            msg: 'Producto eliminado correctamente',
        });

    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        return res.status(500).json({
            ok: false,
            token: req.renewedToken,
            msg: 'Error interno al eliminar el producto',
        });
    }

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
    deleteTemplateById,
}




