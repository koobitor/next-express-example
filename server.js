global.express = require('express')
global.mongoose = require('mongoose')
global.Schema = mongoose.Schema
const bodyParser = require('body-parser')
const next = require('next')
const glob = require('glob')
const path = require('path')
global.appRoot = path.resolve(__dirname)
const env = require('dotenv').config()
const config = env.parsed

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
global.app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    const server = express()

    mongoose
      .connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI || config.MONGODB_URL, { useNewUrlParser: true })
      .then((client) => {
      })
      .catch(err => {
        console.log('error', err)
      })

    server.use(express.static('static'))
    server.use(bodyParser.json({ type: 'application/json' }))

    glob.sync('./api/**/**/*.js').forEach(function(file){
      const temp = file.split("/")
      let endpoint = ['api',temp['2'],temp['3']]
      server.use('/' + endpoint.join('/'), require(path.resolve(file)))
    })

    glob.sync('./apps/**/*.js').forEach(function(file){
      const temp = file.split("/")
      if(temp.length >= 4){
        _path = temp['3'].split(".")
        let endpoint = [temp['2'],_path['0']]
        server.use('/' + endpoint.join('/'), require(path.resolve(file)))
      }else{
        _path = temp['2'].split(".")
        let endpoint = [_path['0']]
        server.use('/' + endpoint.join('/'), require(path.resolve(file)))
      }
    })

    glob.sync('./models/*.js').forEach(function(file){
      require(path.resolve(file))
    })

    server.get('*', (req, res) => handle(req, res))

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })