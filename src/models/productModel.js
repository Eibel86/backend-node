// IMPORTS

const queries = require('../queries/productQueries');
const { queryDB } = require('../utils/DBquery');

//FUNCION: Busca todos los productos
const getAll = async () => {
    const result = await queryDB(queries.getAllPdtos);
    return result.rows;
};

//FUNCION: Buscar productos por relacion de nombre
const findAllPdtosByName = async (name) => {
    const result = await queryDB(
        queries.findAllProdutsByName,
        [`%${name}%`] // coincidencia parcial
        //Separar la lógica de búsqueda del texto de la estructura de la query, y así mantener la consulta reutilizable y segura.
    );
    return result.rows; // Devuelve array (vacío si no hay coincidencias)
};

//FUNCION: Buscar productos por categoria_id
const findAllPdtosByCatId = async (id) => {
    const result = await queryDB(
        queries.findAllProdutsByCategoryId,
        [id] // coincidir en el id
    );
    return result.rows; // Devuelve array (vacío si no hay coincidencias)
};

//FUNCION: Buscar producto por id
const findPdtoById = async (id) => {
    const result = await queryDB(queries.findProductById, [id]);
    return result.rows[0] || null;
};

//FUNCION: Busca producto por nombre
const findByPdtoOne = async (name) => {
    const result = await queryDB(
        queries.findByProductOne,
        [name]
    );
    return result.rows[0];
};

//FUNCION: Crea un nuevo producto.
const insertPdto = async (pdtoData) => {
    const result = await queryDB(queries.insertProduct, [
        pdtoData.cat_id,
        pdtoData.producto_name,
        pdtoData.dimension,
        pdtoData.descripcion,
        pdtoData.color,
        pdtoData.precio,
    ]); //Ejecuta la consulta SQL para insertar un nuevo producto usando los datos proporcionados
    return result.rows[0]; //Devuelve la primera fila del resultado (el producto recién insertada)
};

// // FUNCION: Actualizar película por id
// const updateById = async ({
//     film_id, director_id,
//     genre_id, full_title,
//     image_url, release_date,
//     duration, synopsis
//   }) => {
//     const result = await queryDB(queries.updateById, [
//       director_id, genre_id,
//       full_title, image_url,
//       release_date, duration,
//       synopsis, film_id // al final porque es WHERE film_id = $8
//     ]);
//     return result.rows[0] || null;
//   };

//   // FUNCIÓN: Borrar por id
// const deleteById = async (film_id) => {
//   const result = await queryDB(queries.deleteById, [film_id]);
//   return result.rows[0];
// };

// EXPORTS
module.exports = {
    getAll,
    findAllPdtosByName,
    findPdtoById,
    findAllPdtosByCatId,
    findByPdtoOne,
    insertPdto
    // updateById,
    // deleteById
    // findByTitleOne,
};