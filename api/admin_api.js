const Product = require('../models/admin')

module.exports = {
    create,
    validate,
    edit,
    listAll,
    getById,
    deleteOne
}


async function create(req, res, next) {

    const product = await Product.create(req.body)
    res.json(product)
}

async function validate(req, res, next) {

    const { user_name, password } = req.body;
    const user = await Product.user_validate(user_name, password)
    res.json(user)
}


async function edit(req, res, nxt) {

    const _id = req.params.id;
    const product = await Product.edit(_id, req.body);
    res.json(product);
}


async function listAll(req, res, nxt) {

    const product = await Product.list();
    res.json(product);
}

async function getById(req, res, nxt) {

    const product = await Product.get(req.body._id);
    res.json(product);
}

async function deleteOne(req, res, nxt) {

    const product = await Product.deleteOne(req.params.id);
    res.json(product);
}

