const Product = require('../models/programs')

module.exports = {
    create,
    edit,
    listAll,
    getById,
    deleteOne,
    filterPrograms
}


async function create(req, res, next) {

    const product = await Product.create(req.body)
    res.json(product)
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


async function filterPrograms(req, res, nxt) {

    console.log(req.body);
    const product = await Product.filterProgram(req.body);
    res.json(product);
}