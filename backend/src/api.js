const express = require('express')
const app = express()
const port = 3000

const {
  getAllCanciones,
  getCancionByName
} = require('./consultas.js')

//get all canciones
app.get('/home/canciones', async (req, res) => {
  const canciones = await getAllCanciones();
  res.json(canciones)
})

app.get('/home/canciones/:nombre' , async (req, res) => {
  const canciones = await getCancionByName(req.params.nombre);

  if (canciones === undefined){
    res.sendStatus(404);
  }

  res.json(canciones);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
