// QUERIES (consultas a bbdd)

const userQueries = {
  // Selecciona todo de la tabla users con un email coincidente
  findByEmail: `SELECT * FROM users WHERE email = $1`,
  // Selecciona todo de la tabla users con un id coincidente
  findById: `SELECT * FROM users WHERE user_id = $1`,

  // Inserta un nuevo usuario con name, email, password y role
  // y devuelve el usuario insertado (RETURNING *)
  insertUser: `
    INSERT INTO users (name, email, password, role) 
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `
};

module.exports = userQueries

