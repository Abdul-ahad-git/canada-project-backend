const db = require('../db')
const cuid = require('cuid')
const s3 = require('../awsconfig')
const agents = require('./agent')
require('dotenv').config()
const { ObjectId } = require('mongodb')

const Product = db.model("programs_management", {
    _id: { type: String, default: cuid },
    program_name: { type: String, required: false, default: "" },
    program_city: { type: [String], required: false, default: "" },
    field_of_study: { type: String, required: false, default: "" },
    language: { type: [String], required: false, default: [] },
    institution: { type: String, required: false, default: "" },
    program_type: { type: String, required: false, default: "" },
    degree: { type: String, required: false, default: "" },
    currency: { type: String, required: false, default: "" },
    destination: { type: String, required: false, default: "" },
    duration: {
        type: {
            year: { type: String, default: "" },
            month: { type: String, default: "" }
        },
        required: false,
        default: {
            year: "",
            month: ""
        }
    },
    course_start_date: { type: [String], required: false, default: "" },
    thumbnail: {
        type: {
            url: { type: String, required: false },
            name: { type: String, required: false },
        },
        required: false,
        default: {
            url: "",
            name: ""
        }
    },
    description: { type: String, required: false, default: "" },
    code: { type: String, required: false, default: "" },
    // campus: { type: String, required: false, default: "" },
    org_type: { type: String, required: false, default: "" },
    tution_fee: { type: String, required: false, default: "" },
    application_fee: { type: String, required: false, default: "" },
    lang_level: { type: String, required: false, default: "" },
    pre_requisite: { type: String, required: false, default: "" },
    intake: { type: String, required: false, default: "" },
    accrediation: { type: String, required: false, default: "" },
    deadline: { type: String, required: false, default: "" },
    commission: { type: String, required: false, default: "" },

})


module.exports = {
    create,
    list,
    edit,
    get,
    deleteOne,
    filterProgram,
    fetchDocumentsInSegments,
    getProgramByAgentsAllowedDestination,
    Product
}



async function create(body) {
    try {

        const product = await Product.create(body);
        return product;
    }
    catch (err) {
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

    try {

        const product = await get({ _id });
        Object.keys(change).forEach(function (key) {
            product[key] = change[key]
        })
        await product.save()

        return product

    }
    catch (err) {
        return err
    }

}


async function deleteOne(id) {

    const product = await Product.deleteOne({ _id: id });
    return product;
}





async function filterProgram(filter) {
    // let filter = {
    //     FIELD_OF_STUDY: ['Medical'],
    //     LANGUAGES: ['English'],
    //     PROGRAM_CITIES: ['Madurai'],
    //     PROGRAM_TYPES: ['On-Campus'],
    //     DEGREE: ['Masters'],
    //     INSTITUTIONS: ['Oxford University']
    // }

    let query = { $or: [] };

    if (filter.FIELD_OF_STUDY.length > 0) {
        query.$or.push({ field_of_study: { $in: filter.FIELD_OF_STUDY } });
    }
    if (filter.LANGUAGES.length > 0) {
        query.$or.push({ language: { $in: filter.LANGUAGES } });
    }
    if (filter.PROGRAM_CITIES.length > 0) {
        query.$or.push({ program_city: { $in: filter.PROGRAM_CITIES } });
    }
    if (filter.PROGRAM_TYPES.length > 0) {
        query.$or.push({ program_type: { $in: filter.PROGRAM_TYPES } });
    }
    if (filter.DEGREE.length > 0) {
        query.$or.push({ degree: { $in: filter.DEGREE } });
    }
    if (filter.INSTITUTIONS.length > 0) {
        query.$or.push({ institution: { $in: filter.INSTITUTIONS } });
    }
    if (filter.DESTINATIONS.length > 0) {
        query.$or.push({ institution: { $in: filter.DESTINATIONS } });
    }


    // Ensure there is at least one filter in the query
    if (query.$or.length === 0) {
        console.log("No filters provided.");
        return [];
    }


    try {
        let results = await Product.find(query);
        console.log("Results:", results);
        return results;
    } catch (error) {
        console.error("Error fetching products:", error);
        return error;
    }
}


async function fetchDocumentsInSegments(skip, limit) {

    console.log(skip, limit);

    const product = await Product.find().skip(skip).limit(limit).sort({ _id: -1 });
    console.log(product.length);
    const productLength = await Product.countDocuments();
    return { product: product, count: productLength };

}


async function getProgramByAgentsAllowedDestination(id) {

    const agent = await agents.get(id);
    console.log(agent);

    const programs = await Product.find({ destination: { $in: agent.allowed_countries } })
    console.log(programs);

    return programs;


}

// Product.deleteMany({})
// .then(resp=>{
//     console.log(resp);
// })



// async function deleteMany() {
//     const resp = await Product.deleteMany({})
//     console.log(resp);
// }



// deleteMany()