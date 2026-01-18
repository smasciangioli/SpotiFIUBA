const express = require('express')
const app = express()
const port = 3000

const {
  getAllCanciones,
  getCancionByName,
  getAllPlaylists,
  getPlaylistByID,
  getUsuariosByID,
  getUsuariosByName,
  getUsuariosByEmail,
  CreateUsuario
} = require('./consultas.js')

app.use(express.json())

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

app.get('/home/playlists/:id' , async (req, res) => {
  const playlists = await getPlaylistByID(req.params.id);

  if (playlists === undefined){
    res.sendStatus(404);
  }
  
  res.json(playlists);
})

app.get('/home/usuarios/:id' , async (req, res) => {
  const usuario = await getUsuariosByID(req.params.id);
  
  if(usuario === undefined){
    res.sendStatus(404);
  }

  res.json(usuario);
})

app.get('/home/usuarios_nombre/:nombre' , async (req, res) => {
  const usuario = await getUsuariosByName(req.params.nombre);
  
  if(usuario === undefined){
    res.sendStatus(404);
  }

  res.json(usuario);
})

app.get('/home/usuarios_email/:email' , async (req, res) => {
  const usuario = await getUsuariosByEmail(req.params.email);
  
  if(usuario === undefined){
    res.sendStatus(404);
  }

  res.json(usuario);
})

app.post('/home/usuarios' , async (req, res) => {
  if (req.body === undefined) {
    return res.status(400).send("No se envio el body");
  }

  const nombre_usuario = req.body.nombre_usuario;
  const email = req.body.email;
  const carrera = req.body.carrera;

  if((await getUsuariosByName(nombre_usuario))!== undefined){
    return res.status(409).send("Ya existe un usuario con ese nombre");
  }

  if((await getUsuariosByEmail(email))!== undefined){
    return res.status(409).send("Ya existe un usuario con ese email");
  }

  if (nombre_usuario === undefined){
    return res.status(400).send("No se envio el nombre");
  }

  if (email === undefined){
    return res.status(400).send("No se envio el email");
  }

  if(carrera === undefined){
    return res.status(400).send("No se envio la carrera");
  }

  const usuario = await CreateUsuario(nombre_usuario, email, carrera);

  if (usuario === undefined){
    res.sendStatus(500);
  }

  res.status(201).json(usuario);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
