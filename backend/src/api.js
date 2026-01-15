const express = require('express')
const app = express()
const port = 3000

const {
  getAllCanciones
} = require('./consultas.js')

//get all canciones
app.get('/home/canciones', (req, res) => {
  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
