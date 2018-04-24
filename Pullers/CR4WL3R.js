const fs = require("fs")
const request = require("request")
const cheerio = require("cheerio")
const mongodb = require("./mongodb/mongodb/mongodb")
//mongod --dbpath "C:\Users\LcsGrz\Documents\Universidad\3ro\LAB IV\GitLabIV\PruebaLabIV\Crawlers\db" <-- mi dir para abrir el server

/*
mongo
show dbs
use apitest
show tables
db.noticias.find().pretty()
*/ 
//---------------------------------------------------------------------------------------------

const guardarBD = datos => {
  datos.map(n => {
    n.map(N => {
      mongodb.findOne("Noticias", N).then(obj => {
        if (obj === null) {
          mongodb.insert("Noticias", N)
            .then(doc => {
              console.log(doc.result)
            })
            .catch(err => {
              console.log(err)
            })
        } else console.log("ya existe perrin")
      }).catch(err => console.log(err))
    })
  })
}
//---------------------------------------------------------------------------------------------
const guardar = dato => {
  fs.writeFile("noticias.json", JSON.stringify(dato, null, 2), err => {
    if (err) console.log("Se produjo un error al escribir.")
    else console.log("El archivo se guardo correctamente.")
  })
}

const diarios = {
  noticiasulp: {
    url: "http://noticias.ulp.edu.ar/php/functions/functions.php?operacion=7",
    patron: "div.box-noticia",
    diario: "Noticias ULP",
    patronTitulo: "div#titulo-portada",
    patronImg: "div.imagen-noticia a img",
    patronUrl: "#titulo-portada a"
  },
  diariosl: { //FALTA PATRONES
    url: "http://eldiariodesanluis.com/",
    patron: "h3 a.title"
  },
  slinforma: {
    url: "http://www.sanluisinforma.com.ar/",
    diario: "San Luis Informa",
    patron: "article",
    patronTitulo: "h2.article-title",
    patronImg: ".item-image img",
    patronUrl: "a"
  },
  lpsl: {
    url: "http://www.lapuntasanluis.com/",
    diario: "La Punta San Luis",
    patron: "article",
    patronTitulo: "h2.article-title",
    patronImg: "img",
    patronUrl: "a"
  },
  sltv: {
    url: "http://sanluistv.com/",
    diario: "San Luis TV",
    patron: "div.td-block-span4",
    patronTitulo: "h3",
    patronImg: "img",
    patronUrl: "a"
  }
}

const CrawlerPromesa = pagina => {
  const {
    url,
    diario,
    patron,
    patronTitulo,
    patronImg,
    patronUrl
  } = diarios[pagina]

  return new Promise((resolve, reject) => {
    request.post(url, (err, res, body) => {
      if (err) return reject("Se produjo un error al scrapear.")

      const $ = cheerio.load(body)
      const noticias = []
      $(patron).each((index, el) => {
        noticias.push({
          "Diaro": diario,
          "Titulo": $(el).find(patronTitulo).text().trim(),
          "Imagen": $(el).find(patronImg).attr("src"),
          "URL": $(el).find(patronUrl).attr("href")
        })
      })
      resolve(noticias)
    })
  })
}
const crawlers = [
  CrawlerPromesa("noticiasulp"),
  CrawlerPromesa("slinforma"),
  CrawlerPromesa("lpsl"),
  CrawlerPromesa("sltv")
]

Promise.all(crawlers).then(
  data => guardarBD(data)
).catch(
  error => console.log(error)
)

//CrawlerPromesa('slinforma').then(data => guardar(JSON.stringify(data,null,2))).catch(error => console.error(error))