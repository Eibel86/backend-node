// IMPORTS
const { queryDB } = require("../utils/DBquery"); // Facilita/automatiza mediante una función las consultas a la BBDD
// Importa la querie (consulta creada en ese directorio)
const userQueries = require("../queries/userQueries")


//FUNCION buscar por email

const findByEmail = async (email) => {
    const result = await queryDB(userQueries.findByEmail, [email]); // Ejecuta la consulta SQL con el email como parámetro
    return result.rows[0]; // Devuelve el primer usuario que coincida con el email
};

const findById = async (userId) => {
    const result = await queryDB(userQueries.findById, [userId]); // Ejecuta la consulta SQL con el email como parámetro
    return result.rows[0]; // Devuelve el primer usuario que coincida con el email
};


//FUNCION insertar usuario: 

const insertUser = async ({ name, email, password, role = "user" }) => {
    const result = await queryDB(userQueries.insertUser, [
        name,
        email,
        password,
        role
    ]);
    return result.rows[0];
}




// EXPORTS
module.exports = {
    findByEmail,
    findById,
    insertUser
};


