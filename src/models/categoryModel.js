// IMPORTS
const { queryDB } = require('../utils/DBquery');
const queries = require('../queries/productQueries');


const findCategoryByName = async (name) => {
    const result = await queryDB(queries.findCategoriaByName, [name]);
    return result.rows[0];
};

const insertCategory = async (name) => {
    const result = await queryDB(queries.insertCategory, [name]);
    return result.rows[0];
};

const insertCategoryIfNotExists = async (name) => {
    const existing = await findCategoryByName(name);
    if (existing) return existing.cat_id;

    const inserted = await insertCategory(name);
    return inserted.cat_id;
};


// EXPORTS
module.exports = {
    insertCategoryIfNotExists,
};