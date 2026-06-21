const { models } = require('../../sequelize');
const { getIdParam } = require('../helpers');

// Get all items
async function getAll(req, res) {
	const inquiries = await models.inquiries.findAll();
	res.status(200).json(inquiries);
};

// Get an item by id
async function getById(req, res) {
	const id = getIdParam(req);
	const inquiries = await models.inquiries.findByPk(id);
	if (inquiries) {
		res.status(200).json(inquiries);
	} else {
		res.status(404).send('404 - Not found');
	}
};

async function create(req, res) {
    try {
        const newInquiry = await models.inquiries.create(req.body);
        res.status(201).json({ success: true, message: "Inquiry submitted!", data: newInquiry });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

// Update an item
async function update(req, res) {
	const id = getIdParam(req);
	// We only accept an UPDATE request if the `:id` param matches the body `id`
	if (req.body.id === id) {
		await models.inquiries.update(req.body, {
			where: {
				id: id
			}
		});
		res.status(200).end();
	} else {
		res.status(400).send(`Bad request: param ID (${id}) does not match body ID (${req.body.id}).`);
	}
};

// Delete an items
async function remove(req, res) {
	const id = getIdParam(req);
	await models.inquiries.destroy({
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