const express = require("express")
const bodyParser = require("body-parser")
const mongodb = require("mongodb")
const MongoClient = mongodb.MongoClient
const app = express()
const url = "mongodb://localhost:27017"
const dbName = "noticiasDB"
const jwt = require("jsonwebtoken")
const expressJwt = require("express-jwt")
const secret = "palabrasecreta"
let db = ""
let roles
let collection
//------------------------------------------------------------------------------------------------------------CONEXION A MONGO
MongoClient.connect(url, (err, client) => {
  if (err) {
    console.log(err)
    return err
  }
  console.log("Connected successfully to server")
  db = client.db(dbName)

  /*db.collection("roles").find().toArray((err, result) => {
    console.log("trayendo roles: ", result)
    if (result.length === 0) {
      console.log("ERROR: roles vacios")
      process.exit(1)
    }
    result.map((x) => {
      roles[x.nombre] = x.permisos
    })
  })*/
  db.collection("roles").findOne({}, (err, result) => { roles = result })
})
//------------------------------------------------------------------------------------------------------------MIDDLEWARES
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).send({
      error: true,
      trace: "invalid token..."
    })
  }
})

app.use("/api/", expressJwt({
  secret: secret
}))

app.use("/api/:collection/:id", (req, res, next) => {
  collection = req.params.collection
  next()
})
app.use("/api/:collection", (req, res, next) => {
  collection = req.params.collection
  next()
})
app.use((req, res, next) => {
  console.log("entre al middleware")
  if (roles[req.user.rol][collection] === undefined && req.user === undefined) {
    res.status(420).send({
      error: true,
      trace: "Algo anda mal, expiro su token, o la colleccion no existe."
    })
    return
  }
  else if (!roles[req.user.rol][collection][req.method]) {
    res.status(500).send({
      error: true,
      trace: "No cuentas con los permisos suficientes."
    })
    return
  }
  next()
})
//------------------------------------------------------------------------------------------------------------Propios
//--------------------------------------------------------------------------------------------Login
app.post("/login", (req, res) => {
  if (!("credentials" in req.body)) {
    res.status(500).send({
      error: true,
      trace: "bad request"
    })
    return
  }
  console.log(req.body)
  console.log(typeof req.body)
  db.collection("usuarios").findOne(req.body.credentials, (err, result) => {
    if (err || result === null) {
      res.status(500).send({
        error: true,
        trace: err
      })
      return
    }
    const token = jwt.sign(result, secret, {
      expiresIn: 60 * 60 * 5
    })
    res.send({
      token
    })
  })
})
//--------------------------------------------------------------------------------------------Ver
app.get("/api/:collection", (req, res) => {
  let {
    q
  } = req.query

  try {
    q = (q === undefined) ? {} : JSON.parse(q)
  } catch (Exception) {
    res.status(666).send({
      error: true,
      trace: "JSON no compatible."
    })
    return
  }

  Transformador(q)
  db.collection(req.params.collection).find(q).toArray((err, result) => funkInter(res, err, result))
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
  } else {
    Object.keys(o).map(k => {
      //toDo: luego aca deberia transformar otros campos ,ej : date
      o[k] = toExp(o[k])
    })
  }
}

const toExp = (clave) => /^\/.*\/$/.test(clave) ? new RegExp(clave.substring(1, clave.length - 1)) : clave
//------------------------------------------------------------------------------------------------------------Profe
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
  db.collection(req.params.collection).insert(req.body, (err, result) => funkInter(res, err, result))
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
    res.status(500).send({
      error: true,
      trace: err
    })
    return
  }
  res.send(result)
} // Funcion que mas ser repite

app.listen(3000, () => console.log("listo en 3000..."))