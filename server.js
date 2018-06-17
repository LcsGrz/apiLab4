const bodyParser = require("body-parser")
const fs = require("fs")
const cors = require("cors")
const errores = require("./Errores.js")
const expressJwt = require("express-jwt")
const jwt = require("jsonwebtoken")
const express = require("express")
const mongodb = require("mongodb")
const bcrypt = require("bcryptjs")
const app = express()
const MongoClient = mongodb.MongoClient
const url = "mongodb://localhost:27017"
const dbName = "noticiasDB"
const secret = "palabrasecreta"
let lang = "ES"
let db = ""
let roles
let collection
//------------------------------------------------------------------------------------------------------------CONEXION A MONGO
MongoClient.connect(url, (err, client) => {
  if (err)
    console.log(err)

  console.log("Connected successfully to server")
  db = client.db(dbName)
  db.collection("roles").findOne({}, (err, result) => {
    roles = result
  })
})
//------------------------------------------------------------------------------------------------------------MIDDLEWARES
app.use(cors())
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

app.use("/api/", expressJwt({
  secret: secret
}))
app.use("/:collection", (req, res, next) => {
  collection = req.params.collection
  next()
})
app.use("/api/:collection/:id", (req, res, next) => {
  collection = req.params.collection
  next()
})
app.use("/api/:collection", (req, res, next) => {
  collection = req.params.collection
  next()
})

app.use((req, res, next) => { //Verifica que tenga el token activo y si el rol pertenece donde quiere acceder
  if (collection !== "register" && collection !== "login") {
    if (req.user === undefined || roles[req.user.rol][collection] === undefined)
      throw "NoTokenNoCollection"
    else if (!roles[req.user.rol][collection][req.method])
      throw "UnauthorizedError"
  }
  next()
})
//------------------------------------------------------------------------------------------------------------Propios
//--------------------------------------------------------------------------------------------Login
app.post("/login", (req, res, next) => {
  if (!("credentials" in req.body))
    throw "ErrorCliente"

  let dato = ""
  if (Comprobacion(req.body.credentials.username))
    dato = JSON.parse("{\"username\":\"" + req.body.credentials.username + "\"}")
  else
    dato = JSON.parse("{\"email\":\"" + req.body.credentials.email + "\"}")
  db.collection("usuarios").findOne(dato, (err, result) => {
    if (err) {
      return next("ErrorCliente")
    }
    console.log(result  )
    if (result === null) {
      return next("NoExistUser")
    }
    if (!bcrypt.compareSync(req.body.credentials.password, result.password))
      return next("!EqualPass")
    CrearToken(result, 3600, res)
  })
})
//--------------------------------------------------------------------------------------------Registrar
app.post("/register", (req, res, next) => { //Verifica que no exista el usuario o el email
  console.log(req.body)
  if (!("credentials" in req.body))
    throw "ErrorCliente"

  db.collection("usuarios").findOne({
    $or: [{
        "email": req.body.credentials.email
      },
      {
        "username": req.body.credentials.username
      }
    ]
  }, (err, result) => { //Verifica que no exista el email
    if (result !== null) {
      if (result.email === req.body.credentials.email)
        return next("InUseMail")
      else if (result.username === req.body.credentials.username)
        return next("InUseNick")
    }

    RegistrarUser({
      email: req.body.credentials.email,
      username: req.body.credentials.username,
      password: bcrypt.hashSync(req.body.credentials.password, 8),
      rol: "usuario"
    }, res, next)
  })
})

function RegistrarUser(datos, res, next) {
  db.collection("usuarios").insert(datos, (err, result) => { //Inserta el usuario
    if (err || result === null)
      return next("ErrorCliente")

    CrearToken(result, 3600, res)
  })
}
const CrearToken = (result, tiempo, res) => {
  const token = jwt.sign(result, secret, {
    expiresIn: tiempo
  })
  
  res.send({
    token
  })
}
//--------------------------------------------------------------------------------------------Ver
app.get("/api/:collection", (req, res, next) => {
  let {
    q,
    p,
    l
  } = req.query

  l = (Comprobacion(l) && !isNaN(parseInt(l))) ? parseInt(l) : 10
  p = (Comprobacion(p) && !isNaN(parseInt(p))) ? parseInt(p) : 0

  try {
    q = (q === undefined) ? {} : JSON.parse(q)
  } catch (Exception) {
    throw "BadJSON"
  }

  Transformador(q)
  db.collection(req.params.collection).find(q).skip((p > 0) ? (--p * l) : 0).limit(1).toArray((err, result) => {
    if (err)
      return next("ErrorCliente")

    res.send({
      result,
      next: "/" + req.params.collection + "?" + ((Comprobacion(q)) ? "q=" + JSON.stringify(q) + "&" : "") + "p=" + ++p + "&l=" + l
    })
  })
})
function Transformador(o) {
  /* Object.keys(o).length === 1 --> verifica que solo venga una clave en el objeto
                                  eso es por que todas las claves especiales de mongo van unicas y empiezan con $

  Object.keys(o)[0][0] === "$" --> clave unica empieza con $ */
  const claves = Object.keys(o)
  if ((claves.length === 1) && (claves[0][0] === "$")) {
    o[claves[0]].map(x => Transformador(x))
  } else {
    Object.keys(o).map(k => {
      //o[k] = toExp(o[k]) //toDo: luego aca deberia transformar otros campos ,ej : date
      o[k] = transToken(o[k])
    })
  }
}
function transToken(s) {
  if (/^\/.*\/$/.test(s))
    return new RegExp(s.substring(1, s.length - 1))
  else if ("/@.*@/".test(s))
    return new Date(s.substring(1, s.length - 1))

  return s
}
//const toExp = (clave) => /^\/.*\/$/.test(clave) ? new RegExp(clave.substring(1, clave.length - 1)) : clave
//const toExpFecha = (fecha) => /^@.*@$/.test(fecha) ? new Date(fecha.substring(1, clave.length - 1)) : fecha
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
  const {
    media,
    fecha
  } = req.body
  if (Comprobacion(media)) {
    const dt = new Date()
    let url = "./Media/" + (dt.getMonth() + 1) + "-" + dt.getDate() + "-" + dt.getFullYear() + "_" + Math.floor((Math.random() * 1000))
    req.body.media = url
    fs.writeFile(url, media, err => err)
  }
  if (Comprobacion(fecha)) {
    req.body.fecha = new Date(fecha)
  }
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
//--------------------------------------------------------------------------------------------Funcion que mas se repite
const funkInter = (res, err, result) => {
  if (err)
    res.send(errores[lang]["ErrorCliente"])

  res.send(result)
}
//--------------------------------------------------------------------------------------------
const Comprobacion = valor => valor && valor !== null && valor !== undefined //Comprueba si el valor existe
 
app.listen(420, "0.0.0.0", () => console.log("listo en 420...")) //Inicia el servidor

app.use((err, req, res, next) => { //Middleware que captura todas las excepciones
  if (err)
    res.send(errores[lang][err])
})