const { Pool } = require("pg");


const poolMulter = new Pool({
    name: { type: String, required: true },
    description: { type: String, required: true },
    filePath: { type: String, required: true },
    fileName: { type: String, required: true },
});

const File = Pool.model('File', poolMulter);

module.exports = File;