const express = require('express')

const app = express()

const routes = require('./routes/');

app.use('/api', routes.api);


app.listen(3000, () => {
    console.log('running on port 3000')
})
