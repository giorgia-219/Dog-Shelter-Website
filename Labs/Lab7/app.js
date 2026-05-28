const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const detailRoutes = require('./routes/book')
const listRoutes = require('./routes/index')
const { allowedNodeEnvironmentFlags } = require('process')

const app = express()

app.locals.books = [
		{isbn: '1', title: 'Book1', author: 'Markus Zanker',
		 description: 'Lorem ipsum dolor sit amit', },
		{isbn: '2', title: 'Book2', author: 'Max Mustermann',
		 description: 'The new book of Max Mustermann', }
];
	
app.use(bodyParser.urlencoded({extended: true}))

app.use('/book', detailRoutes)
app.use('/', listRoutes)

app.use((req, res, next) => {
	res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
})

app.listen(3000)

// app.get('/', (req, res) => {
// 	res.sendFile(path.join(__dirname, 'views', 'index.html'));
// });