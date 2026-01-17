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

module.exports = {
    getAllCanciones,
    getCancionByName,
    getAllPlaylists
};