const pool = require("./DBconnect")

const queryDB = async (query, params = []) => {
    try {
        if (!query) {
            console.log(`QUERY NO ESTA DEFINIDO ${query}`)
            throw new Error("No se ha proporcionado una consulta SQL");
        }
        const result = await pool.query(query, params);
        console.log('conectado a bbdd')
        return result;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    queryDB
}