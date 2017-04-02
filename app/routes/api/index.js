const express = require('express')
const router = express.Router()

const schoolAPI = require('./schoolAPI')


router.use('/', schoolAPI)

module.exports = router

// TODO
