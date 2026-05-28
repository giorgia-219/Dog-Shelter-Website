const express = require('express')

const bodyParser = require('body-parser')
const path = require('path')

const detailRoutes = require('./routes/book')
const listRoutes = require('./routes/index')
const { allowedNodeEnvironmentFlags } = require('process')

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./books.sqlite');

const app = express()

	
app.use(bodyParser.urlencoded({extended: true}))

app.use('/book', detailRoutes)
app.use(listRoutes)

app.use((req, res, next) => {
	res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
})

app.listen(3000) 