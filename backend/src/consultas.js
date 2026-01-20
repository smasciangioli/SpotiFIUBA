const {Pool} =require ('pg')

const pool = new Pool({
    user:'postgres',
    port:5432,
    host:'localhost',
    database:'spotifiuba',
    password:'postgres',
});


async function getAllCanciones(){
    const result = await pool.query(
        `SELECT c.*, u.nombre_usuario
        FROM canciones c
        JOIN usuarios u ON c.usuario_id=u.id`
    );

    return result.rows;
}

async function getCancionByName(nombre){
    const result = await pool.query(
        `SELECT c.*, u.nombre_usuario
        FROM canciones c
        JOIN usuarios u ON c.usuario_id=u.id
        WHERE c.nombre ILIKE $1`, [nombre]
    );

    if (result.rows.length === 0) {
        return undefined;
    }
    
    return result.rows;
}

async function getAllPlaylists(){
    const result = await pool.query (
        `SELECT p.*, u.nombre_usuario
        FROM playlists p
        JOIN usuarios u ON p.creador_id=u.id`
    );

    return result.rows;
}

async function getPlaylistByID(id){
    const result = await pool.query(
        `SELECT p.*, u.nombre_usuario
        FROM playlists p
        JOIN usuarios u ON p.creador_id = u.id
        WHERE p.id = $1`, [id]
    );    

    if (result.rows.length === 0) {
        return undefined;
    }
    
    return result.rows[0];
}

async function getUsuariosByID(id){
    const result = await pool.query(
        `SELECT * FROM usuarios
        WHERE id = $1`, [id]
    );

    if (result.rows.length === 0){
        return undefined;
    }

    return result.rows[0];
}

async function getUsuariosByName(nombre){
    const result = await pool.query(
        `SELECT * FROM usuarios
        WHERE nombre_usuario ILIKE $1`, [nombre]
    );

    if (result.rows.length === 0){
        return undefined;
    }

    return result.rows;
}

async function getUsuariosByEmail(email){
    const result = await pool.query(
        `SELECT * FROM usuarios
        WHERE email ILIKE $1`, [email]
    );

    if (result.rows.length === 0){
        return undefined;
    }

    return result.rows;
}

async function createUsuario(nombre_usuario, email, carrera, contraseña) {
    try{
        const result = await pool.query(
        "INSERT INTO usuarios (nombre_usuario, email, carrera, contraseña, fecha_creacion, fecha_modificacion) VALUES ($1, $2, $3, $4, CURRENT_DATE, CURRENT_DATE)",
            [nombre_usuario, email, carrera, contraseña]
        );

        if (result.rowCount === 0){
            return undefined;
        }

    } catch{
        return undefined;
    }

    return{
        nombre_usuario,
        email,
        carrera,
        contraseña,
    }
}

async function removeUsuario(id){
    try{
        const result = await pool.query("DELETE FROM usuarios WHERE id = $1", [id]);
        return (result.rowCount === 1);

    } catch {
        return false;
    }
}

async function updateUsuario_nombre(id, nuevo_nombre){
    try {
        const result = await pool.query(
            "UPDATE usuarios SET nombre_usuario = $2, fecha_modificacion = CURRENT_DATE WHERE id = $1", [id, nuevo_nombre]
        );

        if(result.rowCount === 0){
            return undefined;
        }

        return {
            id,
            nuevo_nombre,
        };

    } catch {
        return undefined;
    }

}

async function updateUsuario_carrera(id, carrera){
    try {
        const result = await pool.query(
            "UPDATE usuarios SET carrera = $2, fecha_modificacion = CURRENT_DATE WHERE id = $1", [id, carrera]
        );

        if(result.rowCount === 0){
            return undefined;
        }

        return {
            id,
            carrera,
        };

    } catch {
        return undefined;
    }

}

async function updateUsuario_contraseña(id, contraseña){
    try {
        const result = await pool.query(
            "UPDATE usuarios SET contrasenia = $2, fecha_modificacion = CURRENT_DATE WHERE id = $1", [id, contraseña]
        );

        if(result.rowCount === 0){
            return undefined;
        }

        return {
            id,
            contraseña,
        };

    } catch {
        return undefined;
    }

}


module.exports = {
    getAllCanciones,
    getCancionByName,
    getAllPlaylists,
    getPlaylistByID,
    getUsuariosByID,
    getUsuariosByName,
    getUsuariosByEmail,
    createUsuario,
    removeUsuario,
    updateUsuario_nombre,
    updateUsuario_carrera,
    updateUsuario_contraseña,
};