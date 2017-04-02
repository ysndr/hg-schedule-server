const _ = require('lodash')
const statusCodes = require('http-status-codes')
const schools = require('../../config/schools')
const constructors = require('./constructors')


module.exports = {
  getSchedule(req, res) {
    let found = _.find(schools, {
      schoolId: req.params.id
    })

    let auth = req.get("authorization")

    if (!found) {
      res
        .status(400)
        .json({
          error: 400,
          message: `school id ${req.params.id} not found`
        })
    } else {

      // res.send('found')
      constructors.fromRemote(found, auth)
        .then((entries) => ({entries, teachers : found.teachers}) )
        .then((pack) => {res.json(pack)})
        .catch((err) => {
          statusCode = err.statusCode || 501
          res
            .status(statusCode)
            .json({
              error: statusCode,
              message: statusCodes.getStatusText(statusCode)
            })
        })
    }
  }
}
