const _ = require('lodash')
const express = require('express')
const router = express.Router()

const schools = require('../../api/school/')
const schedule = require('../../api/schedule/')


router.route('/schools')
  .get(schools.listSchools)
  .delete(schools.deleteSchools)

router.route('/school/:id')
  .get(schools.infoSchool)
  .post(schools.addSchool)
  .put(schools.updateSchool)
  .delete(schools.deleteSchool)

router.route('/school/:id/schedule')
  .get(schedule.getSchedule)


module.exports = router
