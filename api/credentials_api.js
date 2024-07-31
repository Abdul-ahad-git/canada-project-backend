const Product = require('../models/credentials')


module.exports = {
    get,
    edit
}

async function get(req, res, next) {
    const product = await Product.get(req.body._id)
    res.json(product)
}


async function edit(req, res, next) {
    console.log("REQ",req.body);
    const product = await Product.edit(req.body._id, req.body)
    res.json(product)
}