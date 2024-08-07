const Product = require('../models/agent')

module.exports = {
    create,
    validate,
    edit,
    listAll,
    getById,
    deleteOne
}


async function create(req, res, next) {

    try {
        const product = await Product.create(req.body)
        res.json(product)
    }
    catch (err) {
        res.json(err)
    }
}

async function validate(req, res, next) {

    const { password, email } = req.body;
    const user = await Product.user_validate(password, email)
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

    const product = await Product.get(req.params.id);
    res.json(product);
}

async function deleteOne(req, res, nxt) {

    const product = await Product.deleteOne(req.params.id);
    res.json(product);
}



