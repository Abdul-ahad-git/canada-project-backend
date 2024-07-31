const db = require('../db')
const cuid = require('cuid')


const Product = db.model("options", {
    _id: { type: String, default: cuid },
    FIELD_OF_STUDY: {
        type: [String], default: []
    },
    LANGUAGES: {
        type: [String], default: []
    },
    PROGRAM_CITIES: {
        type: [String], default: []
    },
    PROGRAM_TYPES: {
        type: [String], default: []
    },
    DEGREE: {
        type: [String], default: []
    },
    INSTITUTIONS: {
        type: [String], default: []
    },
    DESTINATIONS: {
        type: [String], default: []
    }
})


module.exports = {
    get,
    edit,
    Product
}


async function get() {
    try {
        const product = await Product.find({})
        return product;
    }
    catch (err) {
        console.log(err);
        return err;

    }
}

async function getById(_id) {

    const product = await Product.findById(_id)
    return product;

}



async function edit(change) {

    let id = change._id;
    const product = await getById(id)

    console.log(product);

    Object.keys(change).forEach(function (key) {
        product[key] = change[key]
    })

    await product.save()

    return product;
}