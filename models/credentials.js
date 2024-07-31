const db = require('../db')
const cuid = require('cuid')
const admin = require('./admin')


const Product = db.model("credentials", {
    _id: { type: String, default: cuid },
    terms_and_condition: { type: String, required: false, default: "" },
})


module.exports = {
    create,
    get,
    edit,
    Product
}



async function create(body) {

    const product = await Product.create(body);
    return product;

}

async function get(agent_id) {
 

    const product = await Product.find({})
    return { success: true, data: product }

}

async function edit(_id, change) {
 
    console.log("ID",_id);
    const product = await Product.findById(_id);
    console.log(product);

    Object.keys(change).forEach(function (key) {
        product[key] = change[key]
    })

    await product.save()

    return product
}

