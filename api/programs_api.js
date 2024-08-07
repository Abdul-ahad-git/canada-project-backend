const Product = require('../models/programs')

module.exports = {
    create,
    edit,
    listAll,
    getById,
    deleteOne,
    filterPrograms,
    getBySegments,
    getProgramByAgentsAllowedDestination
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



async function getBySegments(req, res, next) {

    let page = parseInt(req.query.page) || 1
    let limit = parseInt(req.query.limit) || 50
    let skip = (page - 1) * limit;

    try {
        const { product, count } = await Product.fetchDocumentsInSegments(skip, limit);

        res.json({
            data: product,
            count: count,
            page: page,
            hasMore: skip + limit < count
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }

}


async function getProgramByAgentsAllowedDestination(req, res, next) {

    const product = await Product.getProgramByAgentsAllowedDestination(req.params.id)
    res.json(product)

}