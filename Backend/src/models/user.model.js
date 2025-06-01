const db = require('./../config/db');

const createUser=async (nombre,email,password_hash,rol)=>{
    console.log("en modelo user");
    const query = {
        text: `INSERT INTO usuarios (nombre,email,password_hash,rol) VALUES ($1,$2,$3,$4)
        RETURNING nombre,email, rol`, values:[nombre,email,password_hash,rol]
    }

    const {rows} = await db.query(query);
    console.log(rows);
    return rows[0];
}

const findOneUserEmail = async (email)=>{
    const query = {
        text: `SELECT * FROM usuarios where email = $1 `, values:[email]
    }

    const {rows} = await db.query(query);
    return rows[0];
}

const UserModel = {
    createUser,
    findOneUserEmail
}

/* const profileUser = async() =>{
    const query = {
        text: `SELECT * FROM usuarios where email = $1 `, values:[email]
    }
} */

module.exports = UserModel;