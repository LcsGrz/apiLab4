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
let emailRegex = /^[0-9a-zA-Z]*@[0-9a-zA-Z]{3,10}\.[0-9a-zA-Z]{2,5}$/
//------------------------------------------------------------------------------------------------------------CONEXION A MONGO
MongoClient.connect(url, (err, client) => {
  if (err)
    console.log(err)

  console.log("Connected successfully to server")
  db = client.db(dbName)
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

app.use("/api/:collection", (req, res, next) => { //Verifica que tenga el token activo y si el rol pertenece donde quiere acceder
  let collection = req.params.collection
  if (!(req.user.rol === "admin")) {
    db.collection("roles").findOne({
      "nombre": req.user.rol,
      permisos: {
        $elemMatch: {
          collection: collection
        }
      }
    }, (err, result) => {
      console.log(result.permisos[0]["GET"])
      if (result === null)
        return next("NoTokenNoCollection")
      for (let index = 0; index < result.permisos.length; index++) {
        if (result.permisos[index].collection === collection && !result.permisos[index][req.method])
          return next("UnauthorizedError")
      }
      next()
    })
  } else
    next()
})
//--------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------USUARIOS
//------------------------------------------------------------------------------------------------------------Propios
//--------------------------------------------------------------------------------------------Login
app.post("/login", (req, res, next) => {
  if (!("credentials" in req.body))
    throw "NoCredentials"

  db.collection("usuarios").findOne(Usuario(req.body.credentials.username), (err, result) => {
    if (err) {
      return next("ErrorCliente")
    }
    if (result === null)
      return next("NoExistUser")

    if (!bcrypt.compareSync(req.body.credentials.password, result.password))
      return next("!EqualPass")
    CrearToken(result, 3600, res)
  })
})
//--------------------------------------------------------------------------------------------Registrar
app.post("/register", (req, res, next) => { //Verifica que no exista el usuario o el email
  if (!("credentials" in req.body))
    throw "NoCredentials"

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
      dni: req.body.credentials.dni,
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
//--------------------------------------------------------------------------------------------Olvide contraseña
app.post("/forgot", (req, res, next) => {
  if (!("credentials" in req.body))
    throw "NoCredentials"
console.log(req.body)
  db.collection("usuarios").findOne(Usuario(req.body.credentials.username), (err, result) => {
    if (err) {
      console.log(err)
      return next("ErrorCliente")
    }
    if (result === null)
      return next("NoExistUser")

    result.password = bcrypt.hashSync(result.dni, 8)

    db.collection("usuarios").update({
      _id: new mongodb.ObjectID(result._id)
    }, {
      $set: {
        password: bcrypt.hashSync(result.dni, 8)
      }
    }, (err, result) => funkInter(res, err, result))
  })
})
//--------------------------------------------------------------------------------------------Buscar usuario por email o nick
app.post("/api/userfind", (req, res, next) => {
  if (!("credentials" in req.body))
    throw "NoCredentials"

  db.collection("usuarios").findOne(Usuario(req.body.credentials.username), (err, result) => {
    if (err) {
      console.log(err)
      return next("ErrorCliente")
    }
    if (result === null)
      return next("NoExistUser")

    res.send(result)
  })
})
//--------------------------------------------------------------------------------------------Eliminar usuario por email o nick
app.post("/api/userdelete", (req, res, next) => {
  if (!("credentials" in req.body))
    throw "NoCredentials"

  db.collection("usuarios").deleteOne(Usuario(req.body.credentials.username), (err, result) => {
    if (err) {
      console.log(err)
      return next("ErrorCliente")
    }
    if (result === null)
      return next("NoExistUser")

    res.send(result)
  })
})
//--------------------------------------------------------------------------------------------Cambiar contraseña
app.post("/api/userchangepass", (req, res, next) => {
  if (!("credentials" in req.body))
    throw "NoCredentials"

  db.collection("usuarios").update({
    _id: new mongodb.ObjectID(req.user._id)
  }, {
    $set: {
      password: bcrypt.hashSync(req.body.credentials.password, 8)
    }
  }, (err, result) => funkInter(res, err, result))
})
//--------------------------------------------------------------------------------------------Cambiar rol
app.post("/api/userchangerol", (req, res, next) => {
  db.collection("usuarios").update({
    _id: new mongodb.ObjectID(req.user._id)
  }, {
    $set: {
      rol: req.body.rol
    }
  }, (err, result) => funkInter(res, err, result))
})
//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------Funcion usuario -> nick/email
function Usuario(user) {
  if (emailRegex.test(user))
    return JSON.parse("{\"email\":\"" + user + "\"}")
  else
    return JSON.parse("{\"username\":\"" + user + "\"}")
}
//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------ROLES
//--------------------------------------------------------------------------------------------Insertar
app.put("/newrol", (req, res) => db.collection("roles").insert({
  nombre: req.body.nombre,
  permisos: []
}, (err, result) => funkInter(res, err, result)))
//--------------------------------------------------------------------------------------------Añadir permisos
app.put("/addperm", (req, res) => {
  db.collection("roles").find({}, (err, result) => {
    if (Comprobacion(result)) {
      db.collection("roles").update({
        "nombre": req.body.nombre
      }, {
        $addToSet: {
          "permisos": {
            "collection": req.body.permisos[0].collection,
            "GET": req.body.permisos[0].GET,
            "POST": req.body.permisos[0].POST,
            "PUT": req.body.permisos[0].PUT,
            "DELETE": req.body.permisos[0].DELETE,
            "PATCH": req.body.permisos[0].PATCH
          }
        }
      }, (err, result) => funkInter(res, err, result))
    }
  })
})
//--------------------------------------------------------------------------------------------Modificar permisos
app.put("/modperm", (req, res) => {
  console.log(req.body.permisos[0].collection)
  db.collection("roles").update({
    nombre: req.body.nombre,
    permisos: {
      $elemMatch: {
        collection: req.body.permisos[0].collection
      }
    }
  }, {
    $set: {
      "permisos.$.collection": req.body.permisos[0].collection,
      "permisos.$.GET": req.body.permisos[0].GET,
      "permisos.$.POST": req.body.permisos[0].POST,
      "permisos.$.PUT": req.body.permisos[0].PUT,
      "permisos.$.DELETE": req.body.permisos[0].DELETE,
      "permisos.$.PATCH": req.body.permisos[0].PATCH
    }
  }, (err, result) => funkInter(res, err, result))
})
//--------------------------------------------------------------------------------------------Eliminar rol
app.put("/delrol", (req, res) => db.collection("roles").deleteOne({
  nombre: req.body.nombre
}, (err, result) => funkInter(res, err, result)))
//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------COLLECIONES
//--------------------------------------------------------------------------------------------Ver
app.get("/api/:collection", (req, res, next) => {
  let q = req.query.q
  let l = (Comprobacion(req.query.l) && !isNaN(parseInt(l))) ? parseInt(l) : 10
  let p = (Comprobacion(req.query.p) && !isNaN(parseInt(p))) ? parseInt(p) : 0

  try {
    q = (q === undefined) ? {} : JSON.parse(q)
  } catch (Exception) {
    throw "BadJSON"
  }
  Transformador(q)
  db.collection(req.params.collection).find(q).skip((p > 0) ? (--p * l) : 0).limit(l).toArray((err, result) => {
    if (err)
      return next("ErrorCliente")

    result.map(x => console.log(x))
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
