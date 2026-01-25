const express = require('express')
const app = express()
const port = 3000

const {
    getUsuariosByID,
    getUsuariosByName,
    getUsuariosByEmail,
    createUsuario,
    removeUsuario,
    updateUsuarioNombre,
    updateUsuarioCarrera,
    updateUsuarioContraseña,
} = require('./funciones/usuarios.js')


const {
  getAllCanciones,
  getCancionByName,
  getCancionByID,
  createCancion,
  removeCancion,
  updateCancionNombre,
  updateCancionPortada,
} = require('./funciones/canciones.js')

const {
  getAllPlaylists,
  getPlaylistByID,
  createPlaylist,
  removePlaylist,
  updatePlaylistNombre,
  updatePlaylistPortada,
  addCancionPlaylist,
  getCancionFromPlaylist,
  removeCancionFromPlaylist,
  getAllCancionesFromPlaylist,
} = require('./funciones/playlists.js')

app.use(express.json())

//Consigue todas las canciones
app.get('/canciones', async (req, res) => {
  const canciones = await getAllCanciones();

  res.json(canciones)
})

//Consigue las conciones por nombre
app.get('/canciones/:nombre' , async (req, res) => {
  const canciones = await getCancionByName(req.params.nombre);

  if (canciones === undefined){
    res.sendStatus(404);
  }

  res.json(canciones);
})

//Crea una nueva cancion
app.post('/canciones' , async (req, res) => {
  if (req.body === undefined) {
    return res.status(400).send("No se envio el body");
  }

  const nombre = req.body.nombre;
  const duracion = req.body.duracion;
  const artista = req.body.artista;
  const usuario_id = req.body.usuario_id;
  const link_portada = req.body.link_portada
  const link_audio = req.body.link_audio;

  if (nombre === undefined){
    return res.status(400).send("No se envio el nombre");
  }

  if (duracion === undefined){
    return res.status(400).send("No se envio la duracion");
  }

  if (artista === undefined){
    return res.status(400).send("No se envio el artista");
  }

  if (usuario_id === undefined){
    return res.status(400).send("No se envio el usuario_id");
  }

  if (link_audio === undefined){
    return res.status(400).send("No se envio el link del audio");
  }

  const cancion = await createCancion(nombre, duracion, artista, usuario_id, link_portada, link_audio);

  if (cancion === undefined){
    res.sendStatus(500);
  }

  res.status(201).json(cancion);
})

//Borra una cancion de la base de datos
app.delete('/canciones/:id' , async (req, res) => {
  const cancion = await getCancionByID(req.params.id);

  if(cancion === undefined){
    res.sendStatus(404);
  }

  if(!(await removeCancion(req.params.id))){
    return res.sendStatus(500);
  }

  res.json(cancion);
})

//Cambia el nombre, la portada de una cancion o las dos, esta dos deben ser enviadas en el body
app.patch('/canciones/:id' , async (req, res) => {
  if (req.body === undefined) {
    return res.status(400).send("No se envio el body");
  }

  const id = req.params.id;
  const nombre = req.body.nombre;
  const link_portada = req.body.link_portada;
  

  if((await getCancionByID(id)) === undefined){
    return res.status(404).send("No existe una cancion con ese id");
  }

  let cancion = {id}

  if (nombre !== undefined){
    const result = await updateCancionNombre(id, nombre);
    if(result === undefined){
      return res.sendStatus(500);
    }
    cancion.nombre = nombre;
  }

  if (link_portada !== undefined){
    const result = await updateCancionPortada(id, link_portada);
    if(result === undefined){
      return res.sendStatus(500);
    }
    cancion.link_portada = link_portada;
  }

  if(cancion === undefined){
    res.sendStatus(500);
  }

  res.json(cancion);
})

//Consigue todas las playlist
app.get('/playlists' , async (req, res) => {
  const playlists = await getAllPlaylists();

  res.json(playlists);
})

//Consigue una playlist por su id
app.get('/playlists/:id' , async (req, res) => {
  const playlists = await getPlaylistByID(req.params.id);

  if (playlists === undefined){
    res.sendStatus(404);
  }
  
  res.json(playlists);
})

//Crea una nueva playlist
app.post('/playlists' , async (req, res) => {
  if (req.body === undefined) {
    return res.status(400).send("No se envio el body");
  }

  const nombre = req.body.nombre;
  const creador_id = req.body.creador_id;
  const link_portada = req.body.link_portada;

  if (nombre === undefined){
    return res.status(400).send("No se envio el nombre");
  }

  if (creador_id === undefined){
    return res.status(400).send("No se envio el id del creador");
  }

  const playlist = await createPlaylist(nombre, creador_id, link_portada);

  if (playlist === undefined){
    res.sendStatus(500);
  }

  res.status(201).json(playlist);
})

//Borra una playlist por su id
app.delete('/playlists/:id' , async (req, res) => {
  const playlist = await getPlaylistByID(req.params.id);
  
  if(playlist === undefined){
    return res.sendStatus(404);
  }

  if(!(await removePlaylist(req.params.id))){
    return res.sendStatus(500);
  }

  res.json(playlist);
})

//Cambia el nombre, la portada de una playlist o las dos, esta dos deben ser enviadas en el body
app.patch('/playlists/:id' , async (req, res) => {
  if (req.body === undefined) {
    return res.status(400).send("No se envio el body");
  }

  const id = req.params.id;
  const nombre = req.body.nombre;
  const link_portada = req.body.link_portada;
  

  if((await getPlaylistByID(id)) === undefined){
    return res.status(404).send("No existe una playlist con ese id");
  }

  let playlist = {id}

  if (nombre !== undefined){
    const result = await updatePlaylistNombre(id, nombre);
    if(result === undefined){
      return res.sendStatus(500);
    }
    playlist.nombre = nombre;
  }

  if (link_portada !== undefined){
    const result = await updatePlaylistPortada(id, link_portada);
    if(result === undefined){
      return res.sendStatus(500);
    }
    playlist.link_portada = link_portada;
  }

  if(playlist === undefined){
    res.sendStatus(500);
  }

  res.json(playlist);

})

//Consigue un usuario por su id
app.get('/usuarios/:id' , async (req, res) => {
  const usuario = await getUsuariosByID(req.params.id);
  
  if(usuario === undefined){
    res.sendStatus(404);
  }

  res.json(usuario);
})

//Consigue un usuario por su nombre
app.get('/usuarios_nombre/:nombre' , async (req, res) => {
  const usuario = await getUsuariosByName(req.params.nombre);
  
  if(usuario === undefined){
    res.sendStatus(404);
  }

  res.json(usuario);
})

//Consigue un usuario por su email
app.get('/usuarios_email/:email' , async (req, res) => {
  const usuario = await getUsuariosByEmail(req.params.email);
  
  if(usuario === undefined){
    res.sendStatus(404);
  }

  res.json(usuario);
})

//Crea un nuevo usuario
app.post('/usuarios' , async (req, res) => {
  if (req.body === undefined) {
    return res.status(400).send("No se envio el body");
  }

  const nombre_usuario = req.body.nombre_usuario;
  const email = req.body.email;
  const carrera = req.body.carrera;
  const contraseña = req.body.contrasenia;

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

  if(contraseña === undefined){
    return res.status(400).send("No se envio la contraseña");
  }

  const usuario = await createUsuario(nombre_usuario, email, carrera, contraseña);

  if (usuario === undefined){
    res.sendStatus(500);
  }

  res.status(201).json(usuario);
})

//Borra un usuario
app.delete('/usuarios/:id' , async (req, res) => {
  const usuario = await getUsuariosByID(req.params.id);
  
  if(usuario === undefined){
    return res.sendStatus(404);
  }

  if(!(await removeUsuario(req.params.id))){
    return res.sendStatus(500);
  }

  res.json(usuario);
})

//Cambia nombre, carrera, contraseña o las 3 de un usuario, estos campos deben ser enviados en el body
app.patch('/usuarios/:id' , async (req, res) => {
  if (req.body === undefined) {
    return res.status(400).send("No se envio el body");
  }

  const id = req.params.id;
  const nombre_usuario = req.body.nombre_usuario;
  const carrera = req.body.carrera;
  const contraseña = req.body.contrasenia;

  if((await getUsuariosByID()) === undefined){
    return res.status(404).send("No existe usuario con ese id");
  }

  if((await getUsuariosByName(nombre_usuario)) === undefined){
    return res.status(409).send("Ya hay un usuario con ese nombre");
  }

  let usuario = {id}

  if (nombre_usuario !== undefined){
    const result = await updateUsuarioNombre(id, nombre_usuario);
    if(result === undefined){
      return res.sendStatus(500);
    }
    usuario.nombre_usuario = nombre_usuario;
  }

  if (carrera !== undefined){
    const result = await updateUsuarioCarrera(id, carrera);
    if(result === undefined){
      return res.sendStatus(500);
    }
    usuario.carrera = carrera;
  }

  if (contraseña !== undefined){
    const result = await updateUsuarioContraseña(id, contraseña);
    if(result === undefined){
      return res.sendStatus(500);
    }
    usuario.contraseña = contraseña;
  }

  if(usuario === undefined){
    res.sendStatus(500);
  }

  res.json(usuario);

})

//Añade una cancion a una playlist
app.post('/playlists/:playlist_id/cancion/:cancion_id' , async (req, res) => {
  const playlist_id = req.params.playlist_id;
  const cancion_id = req.params.cancion_id;

  if (await getPlaylistByID(playlist_id) === undefined){
    res.status(404).send("La playlist no existe");
  }

  if (await getCancionByID(cancion_id) === undefined){
    res.status(404).send("La cancion no existe");
  }

  const resultado = await addCancionPlaylist(playlist_id, cancion_id);

  if(resultado === undefined){
    return res.sendStatus(500);
  }

  res.status(201).json(resultado);
})

//Borra una cancion de una playlist
app.delete('/playlists/:playlist_id/cancion/:cancion_id' , async (req, res) => {
  const playlist_id = req.params.playlist_id;
  const cancion_id = req.params.cancion_id;

  const resultado = await getCancionFromPlaylist(playlist_id, cancion_id);

  if (resultado === undefined){
    return res.status(404).send("Esa cancion no esta en esa playlist");
  }

  if ((!removeCancionFromPlaylist(playlist_id,cancion_id))){
    res.sendStatus(500);
  }

  res.json(resultado);
})

//Consigue todas las canciones de una playlist
app.get('/playlists/:playlist_id/canciones' , async (req, res) => {
  if((await getPlaylistByID(req.params.playlist_id) === undefined)){
    res.sendStatus(500);
  }

  const canciones = await getAllCancionesFromPlaylist(req.params.playlist_id);

  if (canciones === undefined){
    res.sendStatus(500);
  }

  res.json(canciones);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
