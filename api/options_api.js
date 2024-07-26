const Product = require('../models/options')

module.exports = {
    get,
    edit
}


async function get(req, res, next) {

    const product = await Product.get()
    res.json(product)

}

async function edit(req, res, next) {

    const product = await Product.edit(req.body)
    res.json(product)

}