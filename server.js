const express = require('express')
const http = require('http')
const cors = require('cors') 

//API'S MODULE
const admin_api = require('./api/admin_api')
const agent_api = require('./api/agents_api')
const programs_api = require('./api/programs_api')
const options_api = require('./api/options_api')
const orders_api = require('./api/orders_api')


// ----------Ends Here--------------

const app = express()
const PORT = 6020

app.use(express.json())
app.use(cors()) 
const server = http.createServer(app)



// Api' Here
app.get("/", (req, res) => {
    res.send("Hello From Backend!")
})

// Admin
app.post('/admin', admin_api.create)
app.post('/admin_validate', admin_api.validate)
app.get('/admin', admin_api.listAll)
app.put('/admin/:id', admin_api.edit)
app.delete('/admin/:id', admin_api.deleteOne)

// Agent
app.post('/agent', agent_api.create)
app.post('/agent_validate', agent_api.validate)
app.get('/agent', agent_api.listAll)
app.put('/agent/:id', agent_api.edit)
app.delete('/agent/:id', agent_api.deleteOne)

// Programs
app.post('/programs', programs_api.create)
app.get('/programs', programs_api.listAll)
app.put('/programs/:id', programs_api.edit)
app.get('/programs_get_by_id/:id' ,programs_api.getById)
app.delete('/programs/:id', programs_api.deleteOne)
app.post('/programs_filter_api', programs_api.filterPrograms)

// Options
app.get('/options', options_api.get)
app.put('/options', options_api.edit)

//Orders
app.post('/orders', orders_api.create)
app.get('/orders/:id', orders_api.get)
app.get('/orders_length', orders_api.getLength)
app.get('/orders_by_agent_id/:id', orders_api.getOrdersByAgent)




// FOR LOCAL HOST
server.listen(PORT, () => {
    console.log("Server running on port:" + PORT);
})