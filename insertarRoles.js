const mongodb = require("mongodb")
const MongoClient = mongodb.MongoClient
const url = "mongodb://localhost:27017"
const dbName = "noticiasDB"

MongoClient.connect(url, (err, client) => {
  if (err) {
    console.log(err)
    return err
  }

  let db = client.db(dbName)

  db.collection("roles").insert({
    "nombre": "admin"
  })

  db.collection("roles").insert({
    "nombre": "usuario",
    "permisos": [{
      "collection": "pullers",
      "GET": true,
      "POST": false,
      "PUT": false,
      "DELETE": false,
      "PATCH": true
    }]
  })

  db.collection("usuarios").insert({
    "email": "admin@gmail.com",
    "username": "admin",
    "password": "$2a$08$T.HdQsOI6F4m6gHsIoUA0..AibEatHZcSz0ckn3rSqkxXiSE/VIlW", //admin
    "dni": "12345678",
    "rol": "admin"
  })

  db.collection("usuarios").insert({
    "email": "user@gmail.com",
    "username": "user",
    "password": "$2a$08$zeCUPfRxywcDKSIvJcU.f.y8/zEajUT0F9WsKYPqWTQtrxkYRMB76", //user
    "dni": "87654321",
    "rol": "usuario"
  })
})