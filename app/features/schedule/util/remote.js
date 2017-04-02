
const request = require('request-promise')
const cheerio = require('cheerio')
const moment = require('moment')
const _ = require('lodash')

const iconv = require('iconv-lite')
const Iconv = require('iconv').Iconv

function fetchPageFromUrl(options) {
  options.transform = function (body) {
    return new Iconv('ISO-8859-1', 'utf-8').convert(body).toString('utf-8')
}
  return request(options)
}

function processPage(html) {
  let $ = cheerio.load(html)
    /**
     * Expected format: <head>
      <meta ...>
      <meta ...>
      <meta http-equiv="refresh" content="<NUM>; <URL>">
      </head>

      returns URL
     */
  let next = $('head').children().last().attr('content').split('=')[1]

  let updated = moment($('.mon_head tr').last().text().trim().slice(-16),
                      'DD.MM.YYYY hh:mm').format()

  let day = moment($('.mon_title').text().replace(/(\(.+\))/, '').trim(),
                      'DD.MM.YYYY').format()

  let info = {}
  let table = $('table.info')

  if (undefined != table) {
    let infoColumns = table.children().first().nextAll()
    info = _.zipObject(
      ['absentTeachers', 'affectedClasses', 'affectedRooms', 'info'],

      infoColumns
      .map((i, col) => [$(col).children().last().text().trim().split(', ')])
      .get())
  }

  let substitutes = $('.mon_list .list.odd,.even').map((i, elem) => {
    elem = $(elem)
    // TODO: Move this
    let componentNames = [
      //'substitudeID',
      'affectedClasses', 'time',
      'absent', 'substitute', 'room',
      'info', 'description', 'cancelled', 'renew'
    ]

    // turns  `Klasse(n) | Stunde | (Lehrer) | Lehrer | Raum | Vertretungs-Text | Art | Entfall | Neu
    // into   [Klasse(n) , Stunde , (Lehrer) , Lehrer , Raum , Vertretungs-Text , Art , Entfall , Neu]
    let components = elem.children().map((j, comp) => {
        let text = $(comp).text().trim()
        if (j === 0) text = [text.split(", ")]
        return text
    }).get()

    // turn it into a map
    return _.zipObject(componentNames, components)

  }).get()

  let data = {
    updated,
    day,
    info,
    substitutes
  }

  return { next, data }
}

function joinPages(processed) {

  return processed.map((p) => p.data)
  .reduce((result, data) => {
    console.log(data)
    // list is empty         or last entry is the same day
    if (_.isEmpty(result) || _.last(result).day !== data.day) {
      // Adding a scheule page
      // create ID
      // set data
      data._id = data.day // TODO: Find a better id
      result.push(data)
    }

    // merge data from same day
    let last = _.last(result)
    if (last.day === data.day) {
      _.merge(last, data)
    }
    return result
  }, [])


}

module.exports = {
  fetchPageFromUrl,
  processPage,
  joinPages,
}
