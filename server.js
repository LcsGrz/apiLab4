const express = require("express")
const bodyParser = require("body-parser")
const mongodb = require("mongodb")
const MongoClient = mongodb.MongoClient
const app = express()

const url = "mongodb://localhost:27017"
const dbName = "noticiasDB"
let db = ""

const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')
const secret="palabrasecreta"

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

app.use('/api/', expressJwt({secret: secret}));

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({error: true, trace: 'invalid token...'});
  }
});

app.post("/login", (req, res) => {
  //const query = { user , password } = req.body
  if (!('credentials' in req.body)) {
    res.status(500).send({erro: true, trace: "bad request"});    
    return;
  }  
  console.log(req.body.credentials)
  var str = req.body.credentials.replace(/'/g, "\"")
  //str = "'"+str+"'"
  var obj = JSON.parse(str)
  
  db.collection('usuarios').findOne(obj, (err, result) => {
      if (err) {
        res.status(500).send({error: true, trace: err});
        return;
      }
      const token = jwt.sign(result, secret, { expiresIn: 60 * 5 });
      //--------------------------
      console.log(result)
      // console.log("nada puede malir sal")
      //--------------------------
      res.send({token});
    });
});
//------------------------------------------------------------------------------------------------------------Propios
//--------------------------------------------------------------------------------------------GENERIX
app.get("/:collection", (req, res) => {
  const { collection } = req.params
  let { q } = req.query

  try {
    q = JSON.parse(q)
  }
  catch (Exception) {
    res.status(666).send("JSON no compatible.")
    return
  }

  Transformador(q)

  console.log(q)
  db.collection(collection).find(q).toArray((err, result) => funkInter(res, err, result))
})

function Transformador(o) {
  /*
  Object.keys(o).length === 1 --> verifica que solo venga una clave en el objeto
                                  eso es por que todas las claves especiales de mongo van unicas y empiezan con $

  Object.keys(o)[0][0] === "$" --> clave unica empieza con $
  */
  const claves = Object.keys(o)
  if ((claves.length === 1) && (claves[0][0] === "$")) {
    o[claves[0]].map(x => Transformador(x))
  }
  else {
    Object.keys(o).map(k => {
      //toDo: luego aca deberia transformar otros campos ,ej : date
      o[k] = toExp(o[k])
    })
  }
}

const toExp = (clave) => /^\/.*\/$/.test(clave) ? new RegExp(clave.substring(1, clave.length - 1)) : clave
//------------------------------------------------------------------------------------------------------------Profe
//--------------------------------------------------------------------------------------------Ver
app.get("/api/:collection", (req, res) => {
  const {
    collection
  } = req.params

  db.collection(collection).find().toArray((err, result) => funkInter(res, err, result))
})
//--------------------------------------------------------------------------------------------Ver por ID
app.get("/api/:collection/:id", (req, res) => {

  const {
    id,
    collection
  } = req.params

  db.collection(collection).findOne({
    _id: new mongodb.ObjectID(id)
  }, (err, result) => funkInter(res, err, result))
})
//--------------------------------------------------------------------------------------------Insertar
app.put("/api/:collection", (req, res) => {
  console.log(req.params)
  const {
    collection
  } = req.params
  console.log(req.body)
  db.collection(collection).insert(req.body, (err, result) => funkInter(res, err, result))
})
//--------------------------------------------------------------------------------------------Borrar
app.delete("/api/:collection/:id", (req, res) => {

  const {
    id,
    collection
  } = req.params

  db.collection(collection).deleteOne({
    _id: new mongodb.ObjectID(id)
  }, (err, result) => funkInter(res, err, result))
})
//--------------------------------------------------------------------------------------------Actualizar
app.patch("/api/:collection/:id", (req, res) => {

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
