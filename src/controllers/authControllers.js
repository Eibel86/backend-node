
// const bcrypt = require('bcryptjs')
// const userModel = require("../models/user.model");
// const { generateJWT } = require("../utils/JWTgenerate")

// LOGIN
const login = (req, res) => {
    res.status(200).json({
        msg: 'login entrando'
    })
};
// REGISTRO
const registry = (req, res) => {
    res.status(200).json({
        msg: 'registry entrando'
    })
};




module.exports = {
    login,
    registry
}