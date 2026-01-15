const {Pool} =require ('pg')

const pool = new Pool({
    user:'postgres',
    port:5432,
    host:'localhost',
    database:'spotifiuba',
    password:'postgres',
});


async function getAllCanciones() {
    const result = await pool.query(
        `SELECT c.*, u.nombre_usuario
        FROM canciones c
        JOIN usuarios u ON c.usuario_id=u.id`
    );
    return result.rows;
}

module.exports = {
    getAllCanciones
};