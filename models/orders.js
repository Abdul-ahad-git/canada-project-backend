const db = require('../db')
const cuid = require('cuid')
const admins = require('./admin').Product

const Product = db.model("orders_management", {
    _id: { type: String, default: cuid },
    preferred_destination: { type: String, default: "" },
    preferred_programs: { type: String, default: "" },
    title: { type: String, default: "" },
    citizenship: { type: String, default: "" },
    surname: { type: String, default: "" },
    firstName: { type: String, default: "" },
    date_of_birth: { type: String, default: "" },
    passport_number: { type: String, default: "" },
    address: { type: String, default: "" },
    city: { type: String, default: "" },
    state: { type: String, default: "" },
    country: { type: String, default: "" },
    postal_code: { type: String, default: "" },
    telephone: { type: String, default: "" },
    mobile: { type: String, default: "" },
    email: { type: String, default: "" },
    fathers_family_name: { type: String, default: "" },
    father_first_name: { type: String, default: "" },
    mothers_maiden_name: { type: String, default: "" },
    mother_first_name: { type: String, default: "" },
    emergency_contact: {
        type: {
            name: { type: String, default: "" },
            relationship: { type: String, default: "" },
            home_telephone: { type: String, default: "" },
            work_telephone: { type: String, default: "" },
            email: { type: String, default: "" },
            address: { type: String, default: "" },
        },
        required: true
    },
    status_in_canada: {
        type: {
            status: { type: String, default: "" },
            current_school: { type: String, default: "" },
            current_address: { type: String, default: "" }
        }, required: true
    },
    educational_background: {
        type: {
            graduation: { type: String, default: "" },
            college_name: { type: String, default: "" },
            start_date: { type: String, default: "" },
            completion_date: { type: String, default: "" },
            grade: { type: String, default: "" },
            diploma: { type: String, default: "" },

        }, required: true
    },
    grade_point: { type: String, required: true, default: "" },
    masters_duration: { type: String, required: true, default: "" },
    bachelors_duration: { type: String, required: true, default: "" },
    highschool_duration: { type: String, required: true, default: "" },
    highschool_diploma_duration: { type: String, default: "" },
    work_experience: {
        type: {
            company_name: { type: String },
            starting_date: { type: String },
            completion_date: { type: String },
            country: { type: String },
            title: { type: String },
        }, required: false
    },
    applying_for_fulltime: {
        type: {
            diploma: { type: String, default: "" },
            under_graduate: { type: String, default: "" },
            post_graduate: { type: String, default: "" },
        }
    },
    intake: { type: String, default: "" },
    languages_preferred: { type: [String], default: [] },
    TOEFL_Proof: { type: String, default: "" },
    TOEFL_Proof_status: { type: String, default: "" },
    TCF_TEF_TEFAQ_French_proof: { type: String, default: "" },
    TCF_TEF_TEFAQ_French_proof_status: { type: String, default: "" },
    authorization: {
        type: {
            country: { type: String, required: true },
            date: { type: String, required: true },
            year: { type: String, default: "" },
            desc: { type: String, default: "" },
            signature: {
                type: {
                    url: { type: String, required: true },
                    name: { type: String, required: true }
                },
                required: true,
                default: {
                    url: "",
                    name: ""
                }
            }
        }
    },
    agent_info: {
        type: {
            name: { type: String, required: true },
            _id: { type: String, required: true }
        }, required: true
    },
    course_id: { type: String, required: true },
    course_name: { type: String, required: true },
    created_date: { type: String, required: true },
    created_time: { type: String, required: true },
    course_tution_price: { type: String, required: false, default: '0' },
    course_application_price: { type: String, required: false, default: '0' },
    updated_date: { type: String, required: false, default: "" },
    updated_time: { type: String, required: false, default: "" }


})

module.exports = {
    create,
    get,
    getLength,
    getOrdersByAgent,
    Product
}



async function create(body) {

    try {
        const product = await Product.create(body)
        return product;
    }
    catch (err) {
        return err
    }


}

async function get(id) {

    const agent = await admins.findOne({ _id: id })

    if (agent != undefined) {
        const product = await Product.find({})
        return product;
    }
    else {
        return { success: false }
    }


}


async function getLength() {

    try {
        const product = await Product.find({})
        return { length: product.length }
    }
    catch (err) {
        return err
    }

}


async function getOrdersByAgent(_id) {

    const product = await Product.find({ "agent_info._id": _id });
    console.log(product);

    let arr = [];

    product.forEach(item => {

        arr.push({
            course_id: item['course_id'],
            course_application_fee: item['course_application_price'],
            course_tution_fee: item['course_tution_price'],
            purchased_date: item['created_date'],
            purchased_time: item['created_time']
        })

    })

    console.log(arr);

    return arr;

}

