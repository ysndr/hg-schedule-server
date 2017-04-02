const mongoose = require('mongoose')

const SchoolSchema = new mongoose.Schema({
  id: Number,
  name: Number,
  scheduleConfigs: [],
  teachers: [],
  caching: Boolean
})

const SchoolModel = new mongoose.Model('School', SchoolSchema)

module.exports = SchoolModel
