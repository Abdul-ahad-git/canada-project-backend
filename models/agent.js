const db = require('../db')
const cuid = require('cuid')


const Product = db.model("agents_management", {
    _id: { type: String, default: cuid },
    name: { type: String, required: false, default: "" },
    password: { type: String, required: true },
    email: { type: String, required: false, default: '', unique: true },
    company_name: { type: String, required: false, default: '' },
    head_quarters: { type: String, required: false, default: '' },
    trading_name: { type: String, required: false, default: '' },
    date_of_business_setup: { type: String, required: false, default: '' },
    address: { type: String, required: false, default: 'NONE' },
    mobile_number: { type: String, required: false, default: '' },
    countries_of_operations: { type: String, required: false, default: '' },
    instituitions_represented: { type: String, required: false, default: '' },
    active: { type: Number, required: false, default: 0 },
    allowed_countries: { type: [String], required: false, default: [] },
    logo: {
        type: {
            url: { type: String, required: false, default: '' },
            fileName: { type: String, required: false, default: '' }
        },
        required: false,
        default: {
            url: "",
            fileName: ""
        }
    },
    license: {
        type: {
            url: { type: String, required: false, default: '' },
            fileName: { type: String, required: false, default: '' }
        },
        required: false,
        default: {
            url: "",
            fileName: ""
        }
    },
    bank_name: { type: String, required: false, default: '' },
    bank_account_name: { type: String, required: false, default: '' },
    bank_account_number: { type: String, required: false, default: '' },
    bank_address: { type: String, required: false, default: '' },
    swift_number: { type: String, required: false, default: '' },
    reference1: {
        type: {
            name: { type: String, required: false, default: '' },
            position: { type: String, required: false, default: '' },
            email: { type: String, required: false, default: '' },
            mobile_number: { type: String, required: false, default: '' },
            institution_name: { type: String, required: false, default: '' },
        },
        required: false,
        default: {
            name: "",
            position: "",
            email: "",
            mobile_number: "",
            institution_name: "",
        }
    },
    reference2: {
        type: {
            name: { type: String, required: false, default: '' },
            position: { type: String, required: false, default: '' },
            email: { type: String, required: false, default: '' },
            mobile_number: { type: String, required: false, default: '' },
            institution_name: { type: String, required: false, default: '' },
        },
        required: false,
        default: {
            name: "",
            position: "",
            email: "",
            mobile_number: "",
            institution_name: "",
        }
    },
    price_visibility: { type: Boolean, required: false, default: false },
    commision_visibility: { type: Boolean, required: false, default: false },
    institution_visibility: { type: Boolean, required: false, default: false },
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

    console.log(body);
    try {
        const product = await Product.create(body);
        return product;
    }
    catch (err) {
        console.log(err);
        return err
    }

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

    console.log(change);

    try {

        const product = await get({ _id });

        Object.keys(change).forEach(function (key) {
            product[key] = change[key]
        })

        await product.save()

        return product

    }
    catch (err) {
        return err;
    }


}

async function user_validate(pass, email) {

    const user = await Product.findOne({ password: pass, email: email })

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


async function deleteMany() {
    const resp = await Product.deleteMany({})
    console.log(resp);
}


