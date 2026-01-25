const pool = require('./db');

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
        "INSERT INTO usuarios (nombre_usuario, email, carrera, contrasenia, fecha_creacion, fecha_modificacion) VALUES ($1, $2, $3, $4, CURRENT_DATE, CURRENT_DATE)",
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

async function updateUsuarioNombre(id, nuevo_nombre){
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

async function updateUsuarioCarrera(id, carrera){
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

async function updateUsuarioContraseña(id, contraseña){
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
    getUsuariosByID,
    getUsuariosByName,
    getUsuariosByEmail,
    createUsuario,
    removeUsuario,
    updateUsuarioNombre,
    updateUsuarioCarrera,
    updateUsuarioContraseña,
}