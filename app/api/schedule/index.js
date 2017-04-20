const _ = require('lodash')
const statusCodes = require('http-status-codes')
const schools = require('../../config/schools')
const fetch = require('../../functions/fetch')
const merge = require('../../functions/merge')


module.exports = {
  getSchedule(req, res) {
    let school = _.find(schools, {
      schoolId: req.params.id
    })

    let auth = req.get("Authorization")

    let conn = _.merge(school.web, {headers: {Authorization: auth}})

    if (!school) {
      res
        .status(400)
        .json({
          error: 400,
          message: `school id ${req.params.id} not found`
        })
      return;
    }

    console.log("client request -> load schedule....")
    fetch(conn)
      .then(merge)
      .then(entries => ({
        school,
        entries,
      }))
      .then((pack) => res.json(pack))
      .then(_ => console.log("schedule sent"))
      .catch((err) => {
        console.error(err)
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
