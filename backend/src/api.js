const express = require('express')
const app = express()
const port = 3000

const {
  getAllCanciones,
  getCancionByName,
  getAllPlaylists
} = require('./consultas.js')

//Consigue todas las canciones
app.get('/home/canciones', async (req, res) => {
  const canciones = await getAllCanciones();

  res.json(canciones)
})

//Consigue las conciones por nombre
app.get('/home/canciones/:nombre' , async (req, res) => {
  const canciones = await getCancionByName(req.params.nombre);

  if (canciones === undefined){
    res.sendStatus(404);
  }

  res.json(canciones);
})

app.get('/home/playlists' , async (req, res) => {
  const playlists = await getAllPlaylists();

  res.json(playlists);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
