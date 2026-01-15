const {Pool} =require ('pg')

const pool = new Pool({
    user:'postgres',
    port:5432,
    host:'localhost',
    database:'spotifiuba',
    password:'postgres',
});


function getAllCanciones() {

}

module.exports = {
    getAllCanciones
};