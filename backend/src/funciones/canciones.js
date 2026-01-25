const pool = require('./db');

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

async function getCancionByID(id){
    const result = await pool.query(
        `SELECT c.*, u.nombre_usuario
        FROM canciones c
        JOIN usuarios u ON c.usuario_id=u.id
        WHERE c.id = $1`, [id]
    );

    if (result.rows.length === 0) {
        return undefined;
    }
    
    return result.rows;
}

async function createCancion(nombre, duracion, artista, usuario_id, link_portada, link_audio){
    try{   
        const result = await pool.query(
            `INSERT INTO canciones (nombre, duracion, artista, usuario_id, link_portada, link_audio, fecha_creacion, fecha_modificacion)
            VALUES ($1, $2, $3, $4, $5, $6, CURRENT_DATE, CURRENT_DATE)`,
            [nombre, duracion, artista, usuario_id, link_portada, link_audio]
        );

        if(result.rowCount === 0){
            return undefined;
        }
    } catch{
        return undefined;
    }

    return{
        nombre,
        duracion,
        artista,
        usuario_id,
        link_portada,
        link_audio,
    }
}

async function removeCancion(id){
    try{
        const result = await pool.query("DELETE FROM canciones WHERE id = $1", [id]);
        return (result.rowCount === 1);

    } catch {
        return false;
    }
}

async function updateCancionNombre(id, nuevo_nombre){
    try {
        const result = await pool.query(
            "UPDATE canciones SET nombre = $2, fecha_modificacion = CURRENT_DATE WHERE id = $1", [id, nuevo_nombre]
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

async function updateCancionPortada(id, nueva_portada){
    try {
        const result = await pool.query(
            "UPDATE canciones SET link_portada = $2, fecha_modificacion = CURRENT_DATE WHERE id = $1", [id, nueva_portada]
        );

        if(result.rowCount === 0){
            return undefined;
        }

        return {
            id,
            nueva_portada,
        };

    } catch {
        return undefined;
    }
}

module.exports = {
    getAllCanciones,
    getCancionByName,
    getCancionByID,
    createCancion,
    removeCancion,
    updateCancionNombre,
    updateCancionPortada,
};