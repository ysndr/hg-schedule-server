const chai = require('chai')
const should = chai.should()
const fs = require('fs')

const schedule = require('../')

schedule.should.be.a('object')
schedule.should.have.property('methods')

const methods = schedule.methods
const htmlWithInfo = fs.readFileSync(__dirname + '/assets/sched_info.html')


methods.should.be.a('object')
