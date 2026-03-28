const { models } = require('../../sequelize');
const { getIdParam } = require('../helpers');

// Get all items
async function getAll(req, res) {
	const posts = await models.post.findAll();
	res.status(200).json(posts);
};

// Get an item by id
async function getById(req, res) {
	const id = getIdParam(req);
	const post = await models.post.findByPk(id);
	if (post) {
		res.status(200).json(post);
	} else {
		res.status(404).send('404 - Not found');
	}
};

// Add a new item
async function create(req, res) {
	if (req.body.id) {
		res.status(400).send(`Bad request: ID should not be provided, since it is determined automatically by the database.`)
	} else {
		await models.post.create(req.body);
		res.status(201).send('""');
	}
};

// Update an item
async function update(req, res) {
	const id = getIdParam(req);
	// We only accept an UPDATE request if the `:id` param matches the body `id`
	if (req.body.id === id) {
		await models.post.update(req.body, {
			where: {
				id: id
			}
		});
		res.status(200).end();
	} else {
		res.status(400).send(`Bad request: param ID (${id}) does not match body ID (${req.body.id}).`);
	}
};

// Delete an item
async function remove(req, res) {
	const id = getIdParam(req);
	await models.post.destroy({
		where: {
			id: id
		}
	});
	res.status(200).end();
};

module.exports = {
	getAll,
	getById,
	create,
	update,
	remove,
};