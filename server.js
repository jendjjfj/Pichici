const fs = require('fs')
const axios = require('axios')
const express = require('express')
const app = express()
let pichici = require('./pichici.json')


app.use(express.static(__dirname))
app.get('/add', (req, res) => routeAdd(req, res))
app.get('/remove', (req, res) => routeRemove(req, res))


app.listen(3000, () => {
  console.log(`Server is running on port 3000...`)
})


function routeAdd(req, res) {
  pichici.unshift(req.query.name)
  fs.writeFileSync('./pichici.json', JSON.stringify([...new Set(pichici)]))
  res.send('added')
}


function routeRemove(req, res) {
  pichici = pichici.filter(el => el !== req.query.name)
  fs.writeFileSync('./pichici.json', JSON.stringify(pichici))
  res.send('removed')
}


setInterval(function() {
  axios('https://pichici.onrender.com/')
    .then(res => res)
    .catch(err => err)
}, 37000)


setInterval(function() {
  axios('https://pichici.onrender.com/')
    .then(res => res)
    .catch(err => err)
}, 94000)