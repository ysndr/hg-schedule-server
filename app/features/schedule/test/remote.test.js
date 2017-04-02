const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
const should = chai.should()

const fs = require('fs')

describe('remote', () => {

  let remoteUtils = require('../util/remote')
  let pages = [
    'tests/assets/sched_info.html',
    'tests/assets/sched_noinfo.html',
    'tests/assets/sched_info2.html',
  ].map((p) => fs.readFileSync(p))

  describe('processing', () => {

    before(() => {
      processed = remoteUtils.processPage(pages[0]).data
    })


    it('should detect redirect correctly during processing', () =>
      console.log(processed) &&
      processed.should.have.property('next', 'sched_noinfo.html')
    )

    it('should detect `last updated` correctly during processing', () =>
      processed.should.have.deep.property('schedule.updated', '2016-07-08T12:46:00+02:00')
    )

    it('should detect there is info during processing', () =>
      processed.should.have.deep.property('schedule.info').which.should.be.an('object')
    )

    it('should detect substitutes correctly during processing', () => {

      let components = [
        'subNo', 'affectedC', 'time',
        'absent', 'subst', 'room',
        'info', 'cancelled', 'renew'
      ]

      let detected = processed.should.have.deep.property('schedule.substitutes')
        .with.length(4)

      let complete = processed.should.have.deep.property('schedule.substitutes[0]')
        .with.all.keys(components)

      let correct = processed.should.have.deep.property('schedule.substitutes[2].subNo', '20336')

      return [detected, complete, correct]

    })

  })

  describe('joining', () => {

    let joined
    before(() => {
      joined = remoteUtils.joinPages(pages.map(remoteUtils.processPage))
    })


    it('should be grouped together', () => {
      return joined.should.not.be.undefined
    })

  })

  describe('fetching', () => {

    let constructor = require('../constructors')
    let result

    before(() => {

      result = constructor.fromRemote({base:'http://127.0.0.1:8080', start:'sched_info.html', auth: 'Basic eWFubmlrLnNhbmRlcjpnYW51NA=='})

    })

    it('should be a promise', () =>
      result.should.be.fulfilled
    )
    describe('data should be parsed correctly', () => {
      it('should be complete', () => {
        let length = result.should.eventually.have.length(2)
        let entries = result.should.eventually.have.deep.property('[1].substitutes')
                      .that.is.an('array')
                      .and.have.length(3)

        return [length, entries]
      })



    })



  })

})
