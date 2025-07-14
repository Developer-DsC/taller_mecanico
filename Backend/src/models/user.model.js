const db = require('./../config/db');

//Metodos
//Crear usuario

const findOneUserEmail = async (email)=>{
    const query = {
        text: `SELECT * FROM usuarios where email = $1 `, values:[email]
    }

    const {rows} = await db.query(query);
    return rows[0];
}

const UserModel = {
    findOneUserEmail
}

/* const profileUser = async() =>{
    const query = {
        text: `SELECT * FROM usuarios where email = $1 `, values:[email]
    }
} */

module.exports = UserModel;