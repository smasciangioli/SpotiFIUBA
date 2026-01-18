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

    if (result.rowCount === 0) {
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

    if (result.rowCount === 0) {
        return undefined;
    }
    
    return result.rows[0];
}

async function getUsuariosByID(id){
    const result = await pool.query(
        `SELECT * FROM usuarios
        WHERE id = $1`, [id]
    );

    if (result.rowCount === 0){
        return undefined;
    }

    return result.rows[0];
}

async function getUsuariosByName(nombre){
    const result = await pool.query(
        `SELECT * FROM usuarios
        WHERE nombre_usuario ILIKE $1`, [nombre]
    );

    if (result.rowCount === 0){
        return undefined;
    }

    return result.rows;
}

async function getUsuariosByEmail(email){
    const result = await pool.query(
        `SELECT * FROM usuarios
        WHERE email ILIKE $1`, [email]
    );

    if (result.rowCount === 0){
        return undefined;
    }

    return result.rows;
}

async function CreateUsuario(nombre_usuario, email, carrera) {
    try{
        const result = await pool.query(
        "INSERT INTO usuarios (nombre_usuario, email, carrera, fecha_creacion, fecha_modificacion) VALUES ($1, $2, $3, CURRENT_DATE, CURRENT_DATE)",
            [nombre_usuario, email, carrera]
        );
    } catch{
        return undefined;
    }

    return{
        nombre_usuario,
        email,
        carrera,
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
    CreateUsuario,
};