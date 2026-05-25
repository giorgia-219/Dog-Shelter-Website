const express = require('express')
const router = express.Router()
const path = require('path')
const fs = require('fs')



// /admin/add
router.get('/', (req, res, next) => {
	console.log(req.query);
	
	if ('isbn' in req.query 
				&& req.app.locals.books.find(b => b.isbn === req.query.isbn) !== undefined) {
		
		let curbook = req.app.locals.books.find(function (b) {return b.isbn === req.query.isbn});

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

// Task 1. show the form
router.get('/create', (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'create.html')); // [cite: 300]
});

router.post('/add', (req, res, next) => {

	console.log('BODY:', req.body);

    const newBook = {
        isbn: req.body.isbn,
        title: req.body.title,
        author: req.body.author,
        description: req.body.description
    };
    req.app.locals.books.push(newBook);

	console.log('BOOKS:', req.app.locals.books);

    res.redirect('/');
});

module.exports = router; 