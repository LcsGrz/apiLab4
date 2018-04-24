const express = require("express")
const bodyParser = require("body-parser")
const mongodb = require("mongodb")
const MongoClient = mongodb.MongoClient
const app = express()
const url = "mongodb://localhost:27017"
const dbName = "lab401"

let db = ""

MongoClient.connect(url, (err, client) => {
  if (err) {
    console.log(err)
    return err
  }

  console.log("Connected successfully to server")
  db = client.db(dbName)
})

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

//--------------------------------------------------------------------------------------------Ver
app.get("/:collection", (req, res) => {
  const {
    collection
  } = req.params

  db.collection(collection).find().toArray((err, result) => funkInter(res, err, result))
})
//--------------------------------------------------------------------------------------------Ver por ID
app.get("/:collection/:id", (req, res) => {

  const {
    id,
    collection
  } = req.params

  db.collection(collection).findOne({
    _id: new mongodb.ObjectID(id)
  }, (err, result) => funkInter(res, err, result))
})
//--------------------------------------------------------------------------------------------Insertar
app.put("/:collection", (req, res) => {

  const {
    collection
  } = req.params

  db.collection(collection).insert(req.body, (err, result) => funkInter(res, err, result))
})
//--------------------------------------------------------------------------------------------Borrar
app.delete("/:collection/:id", (req, res) => {

  const {
    id,
    collection
  } = req.params

  db.collection(collection).deleteOne({
    _id: new mongodb.ObjectID(id)
  }, (err, result) => funkInter(res, err, result))
})
//--------------------------------------------------------------------------------------------Actualizar
app.patch("/:collection/:id", (req, res) => {

  const {
    id,
    collection
  } = req.params

  db.collection(collection).update({
    _id: new mongodb.ObjectID(id)
  }, {
    $set: req.body
  }, (err, result) => funkInter(res, err, result))
})
//--------------------------------------------------------------------------------------------

const funkInter = (res, err, result) => {
  if (err) {
    res.status(500).send(err)
    return
  }
  res.send(result)
}

app.listen(3000, () => console.log("listo en 3000..."))