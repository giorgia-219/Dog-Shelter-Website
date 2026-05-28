const express = require('express')
const router = express.Router()

const fs = require('fs')
const path = require('path')

const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('./books.sqlite');


router.get('/', (req, res, next) => {
	fs.readFile(path.join(__dirname, '..', 'views', 'index.html'), 'utf8', (err, page) => {
		if (err) {
			console.error(err);
			return;
		}
		
		db.all("SELECT * FROM books", function(err, rows) {
				let table_html = ''
				rows.forEach(
					el => table_html = table_html + 
						'<tr>' + 
						'<td>' + el['isbn'] + '</td>' + 
						'<td>' + el['title'] + '</td>' + 
						'<td>' + el['author'] + '</td>' + 
						'<td>' +
						'<a href="/book?isbn=' + el['isbn'] + '">Detail</a> ' + ' ' +
						'<a href="/book/delete?isbn=' + el['isbn'] + '" style="color:red;">Delete</a>' +
						'</td>' +
						'</tr>'
				);
				page = page.replace('{%table%}', table_html)

				const createLinkHtml = '<p><a href="/book/create">+ Neues Buch hinzufügen</a></p></body>';
        		page = page.replace('</body>', createLinkHtml);

				res.setHeader('Content-Type', 'text/html')
				res.write(page)
				res.end();
		});

		
	});
})

module.exports = router; 
