import express from 'express'
import csv from 'csvtojson'
import path from 'path'

const app = express()

app.use(express.static(path.resolve("node_modules/heatmap.js/build/")))
app.use(express.static(path.resolve("node_modules/heatmap.js/plugins/leaflet-heatmap")))
app.use(express.static(path.resolve("public/") ))

app.get("/", (req, res) => {
    res.sendFile(path.resolve("index.html"))
})

app.get('/data', (req, res) => {
    csv().fromFile("./SFCrimeData.csv").then( obj => {
        const output = obj.map( row => ({lng: Number.parseFloat(row.X), lat: Number.parseFloat(row.Y), value: 1, description: row.Descript.toLowerCase()}) )
        res.send(output)
    })
})

app.listen(3000, () => {
    console.log("Server listening on port 3000")
})