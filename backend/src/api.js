const express = require('express')
const cors = require('cors'); 
const app = express()
const port = 3000
app.use(cors());
app.use(express.json())

const {
  getUsuariosByID,
  getUsuariosByName,
  getUsuariosByEmail,
  createUsuario,
  removeUsuario,
  updateUsuarioNombre,
  updateUsuarioCarrera,
  updateUsuariocontrasenia,
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



app.get('/canciones', async (req, res) => {
  const canciones = await getAllCanciones();
  res.json(canciones)
})

app.get('/canciones/:nombre', async (req, res) => {
  const canciones = await getCancionByName(req.params.nombre);
  if (canciones === undefined) {
    return res.sendStatus(404);
  }
  res.json(canciones);
})

app.post('/canciones', async (req, res) => {
  if (!req.body) return res.status(400).send("No se envio el body");

  const { nombre, duracion, artista, usuario_id, link_portada, link_audio } = req.body;

  if (nombre === undefined) return res.status(400).send("No se envio el nombre");
  if (duracion === undefined) return res.status(400).send("No se envio la duracion");
  if (artista === undefined) return res.status(400).send("No se envio el artista");
  if (usuario_id === undefined) return res.status(400).send("No se envio el usuario_id");
  if (link_audio === undefined) return res.status(400).send("No se envio el link del audio");

  const cancion = await createCancion(nombre, duracion, artista, usuario_id, link_portada, link_audio);
  if (cancion === undefined) return res.sendStatus(500);

  res.status(201).json(cancion);
})

app.delete('/canciones/:id', async (req, res) => {
  const cancion = await getCancionByID(req.params.id);
  if (cancion === undefined) {
    return res.sendStatus(404);
  }

  if (!(await removeCancion(req.params.id))) {
    return res.sendStatus(500);
  }

  res.json(cancion);
})

app.patch('/canciones/:id', async (req, res) => {
  if (!req.body) return res.status(400).send("No se envio el body");

  const id = req.params.id;
  const { nombre, link_portada } = req.body;

  if ((await getCancionByID(id)) === undefined) {
    return res.status(404).send("No existe una cancion con ese id");
  }

  let cancion = { id };

  if (nombre !== undefined) {
    if (await updateCancionNombre(id, nombre) === undefined) {
      return res.sendStatus(500);
    }
    cancion.nombre = nombre;
  }

  if (link_portada !== undefined) {
    if (await updateCancionPortada(id, link_portada) === undefined) {
      return res.sendStatus(500);
    }
    cancion.link_portada = link_portada;
  }

  res.json(cancion);
})


app.get('/playlists', async (req, res) => {
  const playlists = await getAllPlaylists();
  res.json(playlists);
})

app.get('/playlists/:id', async (req, res) => {
  const playlist = await getPlaylistByID(req.params.id);
  if (playlist === undefined) {
    return res.sendStatus(404);
  }
  res.json(playlist);
})

app.post('/playlists', async (req, res) => {
  if (!req.body) return res.status(400).send("No se envio el body");

  const { nombre, creador_id, link_portada } = req.body;

  if (nombre === undefined) return res.status(400).send("No se envio el nombre");
  if (creador_id === undefined) return res.status(400).send("No se envio el id del creador");

  const playlist = await createPlaylist(nombre, creador_id, link_portada);
  if (playlist === undefined) return res.sendStatus(500);

  res.status(201).json(playlist);
})

app.delete('/playlists/:id', async (req, res) => {
  const playlist = await getPlaylistByID(req.params.id);
  if (playlist === undefined) return res.sendStatus(404);

  if (!(await removePlaylist(req.params.id))) {
    return res.sendStatus(500);
  }

  res.json(playlist);
})

app.patch('/playlists/:id', async (req, res) => {
  if (!req.body) return res.status(400).send("No se envio el body");

  const id = req.params.id;
  const { nombre, link_portada } = req.body;

  if ((await getPlaylistByID(id)) === undefined) {
    return res.status(404).send("No existe una playlist con ese id");
  }

  let playlist = { id };

  if (nombre !== undefined) {
    if (await updatePlaylistNombre(id, nombre) === undefined) {
      return res.sendStatus(500);
    }
    playlist.nombre = nombre;
  }

  if (link_portada !== undefined) {
    if (await updatePlaylistPortada(id, link_portada) === undefined) {
      return res.sendStatus(500);
    }
    playlist.link_portada = link_portada;
  }

  res.json(playlist);
})


app.get('/usuarios/:id', async (req, res) => {
  const usuario = await getUsuariosByID(req.params.id);
  if (usuario === undefined) {
    return res.sendStatus(404);
  }
  res.json(usuario);
})

app.get('/usuarios_nombre/:nombre', async (req, res) => {
  const usuario = await getUsuariosByName(req.params.nombre);
  if (usuario === undefined) {
    return res.sendStatus(404);
  }
  res.json(usuario);
})

app.get('/usuarios_email/:email', async (req, res) => {
  const usuario = await getUsuariosByEmail(req.params.email);
  if (usuario === undefined) {
    return res.sendStatus(404);
  }
  res.json(usuario);
})

app.post('/usuarios', async (req, res) => {
  if (!req.body) return res.status(400).send("No se envio el body");

  const { nombre_usuario, email, carrera, contrasenia } = req.body;

  if (nombre_usuario === undefined) return res.status(400).send("No se envio el nombre");
  if (email === undefined) return res.status(400).send("No se envio el email");
  if (carrera === undefined) return res.status(400).send("No se envio la carrera");
  if (contrasenia === undefined) return res.status(400).send("No se envio la contrasenia");

  if ((await getUsuariosByName(nombre_usuario)) !== undefined) {
    return res.status(409).send("Ya existe un usuario con ese nombre");
  }

  if ((await getUsuariosByEmail(email)) !== undefined) {
    return res.status(409).send("Ya existe un usuario con ese email");
  }

  const usuario = await createUsuario(nombre_usuario, email, carrera, contrasenia);
  if (usuario === undefined) return res.sendStatus(500);

  res.status(201).json(usuario);
})

app.delete('/usuarios/:id', async (req, res) => {
  const usuario = await getUsuariosByID(req.params.id);
  if (usuario === undefined) return res.sendStatus(404);

  if (!(await removeUsuario(req.params.id))) {
    return res.sendStatus(500);
  }

  res.json(usuario);
})

app.patch('/usuarios/:id', async (req, res) => {
  if (!req.body) return res.status(400).send("No se envio el body");

  const id = req.params.id;
  const { nombre_usuario, carrera, contrasenia } = req.body;

  if ((await getUsuariosByID(id)) === undefined) {
    return res.status(404).send("No existe usuario con ese id");
  }

  let usuario = { id };

  if (nombre_usuario !== undefined) {
    if (await updateUsuarioNombre(id, nombre_usuario) === undefined) {
      return res.sendStatus(500);
    }
    usuario.nombre_usuario = nombre_usuario;
  }

  if (carrera !== undefined) {
    if (await updateUsuarioCarrera(id, carrera) === undefined) {
      return res.sendStatus(500);
    }
    usuario.carrera = carrera;
  }

  if (contrasenia !== undefined) {
    if (await updateUsuariocontrasenia(id, contrasenia) === undefined) {
      return res.sendStatus(500);
    }
    usuario.contrasenia = contrasenia;
  }

  res.json(usuario);
})


app.post('/playlists/:playlist_id/cancion/:cancion_id', async (req, res) => {
  const { playlist_id, cancion_id } = req.params;

  if (await getPlaylistByID(playlist_id) === undefined) {
    return res.status(404).send("La playlist no existe");
  }

  if (await getCancionByID(cancion_id) === undefined) {
    return res.status(404).send("La cancion no existe");
  }

  const resultado = await addCancionPlaylist(playlist_id, cancion_id);
  if (resultado === undefined) return res.sendStatus(500);

  res.status(201).json(resultado);
})

app.delete('/playlists/:playlist_id/cancion/:cancion_id', async (req, res) => {
  const { playlist_id, cancion_id } = req.params;

  const resultado = await getCancionFromPlaylist(playlist_id, cancion_id);
  if (resultado === undefined) {
    return res.status(404).send("Esa cancion no esta en esa playlist");
  }

  if (!(await removeCancionFromPlaylist(playlist_id, cancion_id))) {
    return res.sendStatus(500);
  }

  res.json(resultado);
})

app.get('/playlists/:playlist_id/canciones', async (req, res) => {
  if (await getPlaylistByID(req.params.playlist_id) === undefined) {
    return res.sendStatus(404);
  }

  const canciones = await getAllCancionesFromPlaylist(req.params.playlist_id);
  if (canciones === undefined) return res.sendStatus(500);

  res.json(canciones);
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
