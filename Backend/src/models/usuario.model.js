const db = require('../config/db.js');

// Crear nuevo usuario
const createUser = async ({ nombre, email, password_hash, rol }) => {
    const query = {
        text: `INSERT INTO public.usuarios (nombre, email, password_hash, rol)
               VALUES ($1, $2, $3, $4)
               RETURNING usuario_id, nombre, email, rol;`,
        values: [nombre, email, password_hash, rol],
    };
    const { rows } = await db.query(query);
    return rows[0];
};

// Obtener todos los usuarios sin incluir password_hash
const findAllUsers = async () => {
    const query = {
        text: 'SELECT usuario_id, nombre, email, rol FROM public.usuarios;',
    };
    const { rows } = await db.query(query);
    return rows;
};

// Obtener usuario por ID sin incluir password_hash
const findUserById = async (id) => {
    const query = {
        text: 'SELECT usuario_id, nombre, email, rol FROM public.usuarios WHERE usuario_id = $1;',
        values: [id],
    };
    const { rows } = await db.query(query);
    return rows[0];
};

// Buscar por email (para login)
const findOneUserEmail = async (email) => {
    const query = {
        text: 'SELECT * FROM public.usuarios WHERE email = $1;',
        values: [email],
    };
    const { rows } = await db.query(query);
    return rows[0];
};

// Actualizar usuario SIN modificar la contraseña
const updateUser = async (id, { nombre, email, rol }) => {
    const query = {
        text: `UPDATE public.usuarios 
               SET nombre = $1, email = $2, rol = $3
               WHERE usuario_id = $4
               RETURNING usuario_id, nombre, email, rol;`,
        values: [nombre, email, rol, id],
    };
    const { rows } = await db.query(query);
    return rows[0]; // Retorna el usuario actualizado
};



// Eliminar usuario
const deleteUser = async (id) => {
    const query = {
        text: 'DELETE FROM public.usuarios WHERE usuario_id = $1;',
        values: [id],
    };
    await db.query(query);
    return { msg: 'Usuario eliminado correctamente' };
};

const UsuarioModel = {
    createUser,
    findAllUsers,
    findOneUserEmail,
    findUserById,
    updateUser,
    deleteUser,
};

module.exports = UsuarioModel;
