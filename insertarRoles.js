  const express = require("express")
  const bodyParser = require("body-parser")
  const mongodb = require("mongodb")
  const MongoClient = mongodb.MongoClient
  const app = express()
  const url = "mongodb://localhost:27017"
  const dbName = "noticiasDB"

  MongoClient.connect(url, (err, client) => {
    if (err) {
      console.log(err)
      return err
    }
    console.log("Connected successfully to server")
    let db = client.db(dbName)
    db.collection("roles").insert({
      "admin": {
        "pullers": {
          "GET": true,
          "POST": true,
          "PUT": true,
          "DELETE": true,
          "PATCH": true
        },
        "usuarios": {
          "GET": true,
          "POST": true,
          "PUT": true,
          "DELETE": true,
          "PATCH": true
        }
      },
      "usuario": {
        "pullers": {
          "GET": true,
          "POST": false,
          "PUT": false,
          "DELETE": false,
          "PATCH": false
        }
      },
      "director": {
        "pullers": {
          "GET": true,
          "POST": true,
          "PUT": true,
          "DELETE": true,
          "PATCH": true
        }
      }
    })
    db.collection("usuarios").insert({   
        "user": "dario",
        "password": "$2a$08$QtC6TXr3ETIxA5mVeJ7nreRFbi2anFbrnXdHZSrHWwp0WhgfdE5Km", //drogadicto
        "rol": "usuario"
    })
    db.collection("usuarios").insert({
      "user": "chiva",
      "password": "$2a$08$QtC6TXr3ETIxA5mVeJ7nreRFbi2anFbrnXdHZSrHWwp0WhgfdE5Km", //drogadicto
      "rol": "director"
    })
    db.collection("usuarios").insert({
      "user": "nuevo",
      "password": "$2a$08$QtC6TXr3ETIxA5mVeJ7nreRFbi2anFbrnXdHZSrHWwp0WhgfdE5Km", //drogadicto
      "rol": "admin"
    })
  })