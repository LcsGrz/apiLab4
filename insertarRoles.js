  

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
  db = client.db(dbName)
  db.collection('roles').insert({"admin": { "pullers": {"GET": true,"POST": true,"PUT": true,"DELETE": true,"PATCH": true},"usuarios": {"GET": true,"POST": true,"PUT": true,"DELETE": true,"PATCH": true}},"usuario": { "pullers": {"GET": true,"POST": true,"PUT": true,"DELETE": true,"PATCH": true}}},() => {
    console.log("Insertado!")
  })
})