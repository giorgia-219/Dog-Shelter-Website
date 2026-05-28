const express = require('express')
const router = express.Router()
const path = require('path')
const fs = require('fs')


const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('./books.sqlite');

// /admin/add
router.get('/', (req, res, next) => {
	console.log(req.query);
	
	if ('isbn' in req.query) {
		db.all("SELECT * FROM books WHERE isbn=$isbn", {$isbn: req.query.isbn}, function(err, row) {
			if (row.length == 1) {
				
				let curbook = row[0];
			
				fs.readFile(path.join(__dirname, '..', 'views', 'detail.html'), 'utf8', (err, page) => {
					if (err) {
						console.error(err);
						return;
					}

					page = page.replace('{%isbn%}', curbook.isbn)
					page = page.replace('{%title%}', curbook.title)
					page = page.replace('{%author%}', curbook.author)
					page = page.replace('{%description%}', curbook.description)

					res.setHeader('Content-Type', 'text/html')
					res.write(page)
					res.end();
				});
			} else {
				res.status(404).sendFile(path.join(__dirname, '..', 'views', '404.html'))
			}
		})
	} else {	
		res.status(404).sendFile(path.join(__dirname, '..', 'views', '404.html'))
	}
})


router.get('/create', (req, res, next) => {
	// Return a Page to create a new Book in the DB (e.g. create.html)
	res.sendFile(path.join(__dirname, '..', 'views', 'create.html'))
})

router.post('/add', (req, res, next) => {
	// Insert the Data from the form in the Database
	const { isbn, title, author, description } = req.body;
	db.run("INSERT INTO books (isbn, title, author, description) VALUES (?, ?, ?, ?)", [isbn, title, author, description], function(err) {
		if (err) {
			console.error(err);
			return;
		}
		res.redirect('/');
	});
})

router.get('/delete', (req, res, next) => {
	// Check if there is a querystringparameter "isbn"
	if ('isbn' in req.query) {
		// If so check if it exists in the DB (e.g. Select) and then delete it
		db.run("DELETE FROM books WHERE isbn=?", [req.query.isbn], function(err) {
			if (err) {
				console.error(err);
				return;
			}
			res.redirect('/');
		});
	} else {
		// Otherwise return the 404.html or another error page
		res.status(404).sendFile(path.join(__dirname, '..', 'views', '404.html'));
	}
})

module.exports = router; 