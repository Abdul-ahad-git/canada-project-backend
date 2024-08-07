const Product = require('../models/orders')

module.exports = {
    create,
    get,
    getLength,
    getOrdersByAgent,
    edit,
    getOrderById
}


async function create(req, res, next) {

    const product = await Product.create(req.body)
    res.json(product);

}

async function get(req, res, next) {

    const product = await Product.get(req.params.id)
    res.json(product);

}

async function getLength(req, res, next) {

    const product = await Product.getLength()
    res.json(product);

}

async function getOrdersByAgent(req, res, next) {

    const product = await Product.getOrdersByAgent(req.params.id)
    res.json(product);

}


async function edit(req, res, next) {
    const product = await Product.editPrograms(req.body)
    res.json(product);
}


async function getOrderById(req, res, next) {
    const product = await Product.getOrders(req.params.id)
    res.json(product)
}