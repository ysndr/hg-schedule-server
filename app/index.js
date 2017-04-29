const express = require('express')

const app = express()

const routes = require('./routes/');

const port = process.env["app_port"] || 3000

app.use('/api', routes.api);


app.listen(port, () => {
    console.log(`running on port ${port}`)
})
