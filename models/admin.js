const db = require('../db')
const cuid = require('cuid')


const Product = db.model("administrator_management", {
    _id: { type: String, default: cuid },
    user_name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: false, default: '' },
})


module.exports = {
    create,
    list,
    edit,
    get,
    user_validate,
    deleteOne,
    Product
}



async function create(body) {

    const product = await Product.create(body);
    return product;

}

async function list() {

    const product = await Product.find({});
    return product;

}

async function get(_id) {
    const product = await Product.findById(_id)
    return product
}

async function edit(_id, change) {

    const product = await get({ _id });

    Object.keys(change).forEach(function (key) {
        product[key] = change[key]
    })

    await product.save()

    return product
}

async function user_validate(name, pass) {

    const user = await Product.findOne({ user_name: name, password: pass })

    if (user == null) {
        return { success: false }
    }
    else {
        return { success: true, data: user }
    }
}


async function deleteOne(id) {

    const product = await Product.deleteOne({ _id: id });
    return product;
}