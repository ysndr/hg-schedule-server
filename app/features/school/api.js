const _ = require('lodash')
const schools = require('../../config/schools')

module.exports = {
  listSchools(req, res) {
    res.json(schools)
  },

  deleteSchools(req, res) {
    res.send('deleteSchools - unimplemented')
  },

  infoSchool(req, res) {
    let found = _.find(schools, {
      schoolId: req.params.id
    })

    if (found) res.json(found)
    else {
      res.json({
        message: `${req.params.id} not found`
      })
      res.sendStatus(404)
    }
  },

  addSchool(req, res) {
    res.send('addSchool - unimplemented')
  },

  updateSchool(req, res) {
    res.send('updateSchool - unimplemented')
  },

  deleteSchool(req, res) {
    res.send('delete school unimplemented')
  }
}
