const pool = require('./db');

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

async function getPlaylistsByUsuarioID(usuario_id){
    const result = await pool.query(
        `SELECT p.*, u.nombre_usuario
        FROM playlists p
        JOIN usuarios u ON p.creador_id=u.id
        WHERE p.creador_id = $1
        ORDER BY p.fecha_modificacion DESC, p.id DESC`, [usuario_id]
    );

    if (result.rows.length === 0) {
        return [];
    }
    
    return result.rows;
}
async function createPlaylist(nombre, creador_id, link_portada){
    try{
        const result = pool.query(
            "INSERT INTO playlists (nombre, creador_id, link_portada, fecha_creacion, fecha_modificacion) VALUES ($1, $2, $3, CURRENT_DATE, CURRENT_DATE)",
            [nombre, creador_id, link_portada]
        );

        if(result.rowCount === 0){
            return undefined;
        }
    } catch{
        return undefined;
    }

    return{
        nombre,
        creador_id,
        link_portada,
    }
}

async function removePlaylist(id){
    try{
        const result = await pool.query("DELETE FROM playlists WHERE id = $1", [id]);
        return (result.rowCount === 1);

    } catch {
        return false;
    }
}

async function updatePlaylistNombre(id, nuevo_nombre){
    try {
        const result = await pool.query(
            "UPDATE playlists SET nombre = $2, fecha_modificacion = CURRENT_DATE WHERE id = $1", [id, nuevo_nombre]
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

async function updatePlaylistPortada(id, nueva_portada){
    try {
        const result = await pool.query(
            "UPDATE playlists SET link_portada = $2, fecha_modificacion = CURRENT_DATE WHERE id = $1", [id, nueva_portada]
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

async function addCancionPlaylist(playlist_id, cancion_id){
    try {
        const result = await pool.query(
            "INSERT INTO playlist_canciones (playlist_id, cancion_id) VALUES ($1, $2)",
            [playlist_id, cancion_id]
        );

        if (result.rowCount === 0){
            return undefined;
        }
    } catch{
        return undefined;
    }

    return{
        playlist_id,
        cancion_id,
    }
}

async function getCancionFromPlaylist(playlist_id, cancion_id){
    try{
        const result = await pool.query(
            "SELECT * FROM playlist_canciones WHERE playlist_id = $1 AND cancion_id = $2",
            [playlist_id, cancion_id]
        );

        if(result.rowCount === 0){
            return undefined;
        }

        return result.rows;
    } catch{
        return undefined;
    }
}

async function removeCancionFromPlaylist(playlist_id, cancion_id){
    try{
        const result = await pool.query(
            "DELETE FROM playlist_canciones WHERE playlist_id = $1 AND cancion_id = $2",
            [playlist_id, cancion_id]
        );

        return (result.rowCount === 1);

    } catch{
        return false;
    }
}

async function getAllCancionesFromPlaylist(playlist_id){
    try{
        const result = await pool.query(
            `SELECT c.*
            FROM canciones c
            JOIN playlist_canciones pc ON c.id = pc.cancion_id
            WHERE pc.playlist_id = $1`,
            [playlist_id]
        );

        if(result.rowCount === 0){
            return undefined;
        }

        return result.rows;
    } catch{
        return undefined;
    }
}

module.exports = {
    getAllPlaylists,
    getPlaylistByID,
    getPlaylistsByUsuarioID,
    createPlaylist,
    removePlaylist,
    updatePlaylistNombre,
    updatePlaylistPortada,
    addCancionPlaylist,
    getCancionFromPlaylist,
    removeCancionFromPlaylist,
    getAllCancionesFromPlaylist,
};