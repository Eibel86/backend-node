// QUERIES (consultas a bbdd)


/**
 * Consultas SQL relacionadas con la gestión de los productos,
 *  en la base de datos.
 */
const productQueries = {

    //Consulta para obtener todas los productos. 
    getAllPdtos:
        `SELECT * 
        FROM productos`,


    //Consulta para obtener los productos por su nombre relativo.
    findAllProdutsByName:
        `SELECT * 
        FROM productos 
        WHERE producto_name ILIKE $1`,
    //Como LIKE, pero ignora mayúsculas y minúsculas.
    //% ignifica “cualquier cosa (0 o más caracteres)” antes o después del término.

    //Consulta para obtener los productos por categoria_id.
    findAllProdutsByCategoryId:
        `SELECT c.cat_id, c.categoria_name, p.pdto_id, p.producto_name, p.descripcion, p.color,p.dimension,p.precio
        FROM categoria_pdto AS c
        JOIN productos AS p ON p.cat_id = c.cat_id
        WHERE c.cat_id = $1`,

    //Consulta para encontrar el producto por id. 
    findProductById:
        `SELECT *
        FROM productos
        WHERE pdto_id = $1`,

    //Consulta para obtener 1 producto por su nombre concreto insensible a mayus-minusculas
    findByProductOne:
        `SELECT * 
        FROM productos 
        WHERE producto_name ILIKE $1`,

    //Consulta para insertar un producto en la bbdd. Devuelve el producto insertado. 
    insertProduct:
        `INSERT INTO productos 
        (cat_id, producto_name, dimension, descripcion, color, precio)
        VALUES 
        ($1, $2, $3, $4, $5, $6)
        RETURNING *`,

    //Consulta para buscar el id de un director por su nombre
    findCategoryByName:
        `SELECT cat_id 
        FROM categoria_pdto
        WHERE categoria_name = $1`,

    //Consulta para insertar una categoria en la bbdd. 
    insertCategory:
        `INSERT INTO categoria_pdto (categoria_name) 
        VALUES ($1) 
        RETURNING cat_id`,

    // //Consulta para buscar el id de un director por su nombre
    findCategoryByName:
        `SELECT cat_id 
        FROM categoria_pdto 
        WHERE categoria_name = $1`,

    //Consulta para editar una película
    updateById: `
        UPDATE productos
        SET 
            cat_id = $1,
            producto_name = $2,
            dimension = $3,
            descripcion = $4,
            color = $5,
            precio = $6
        WHERE pdto_id = $7
        RETURNING *;`,
    //IMPORTANTE EN EL CASO DE QUERER AÑADIR UNA IMAGEN HAY QUE INCLUIR LO SIGUIENTE
    //         image_url = COALESCE($4::TEXT, image_url), 


    deleteById: `
        DELETE FROM productos 
        WHERE pdto_id = $1 
        RETURNING *;`,

    ///////////////////////////////////////////////////////////////////////////
};

// EXPORTS
module.exports = productQueries;