const db = require('./db');

const getClientes= async ()=>{
    try {
        const clientes= await db.query("select cliente_id, nombre, email from clientes");
        console.log(clientes.rows);
    } catch (error) {
        console.error('Error connection DB');
    }
}

getClientes();