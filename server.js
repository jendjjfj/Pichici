const fs = require('fs')
const axios = require('axios')
const express = require('express')
const app = express()
let pichici = require('./pichici.json')


app.get('/', (req, res) => routeIndex(req, res))
app.get('/add', (req, res) => routeAdd(req, res))
app.get('/remove', (req, res) => routeRemove(req, res))
app.get('/pichici', (req, res) => res.send(pichici))


app.listen(3000, () => {
  update()
  console.log(`Server is running on port 3000...`)
})


function update() {
  axios('https://pichici.onrender.com/pichici')
    .then(res => {
      console.log(res)
      fs.writeFileSync('./pichici.json', JSON.stringify(res))
    })
    .catch(err => console.log(err.code))
}


function routeIndex(req, res) {
  let html = ''
  pichici.forEach(el => {
    html +=
      `<img src="https://jpeg.live.mmcdn.com/stream?room=${el}&f=${Math.random()}" alt="${el}" width="280" height="160" onclick="window.open('https://chaturbate.com/${el}','_blank', 'noopener,noreferrer')">`
  })
  res.send(html)
}


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