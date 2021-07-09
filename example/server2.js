const express = require('express')

const cookieParser = require('cookie-parser')

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

const router = express.Router()

const cors = {
  'Access-Control-Allow-Origin': 'http://localhost:1234',
  'Access-Control-Allow-Credentials': true,
  'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
}

router.post('/more/server2', function(req, res) {
  res.set(cors)
  res.json(req.cookies)
})

router.options('/more/server2', function(req, res) {
  res.set(cors)
  res.end()
})

app.use(router)

const port = 8088
module.exports = app.listen(port)