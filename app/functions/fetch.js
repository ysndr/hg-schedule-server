const request = require('request-promise')
const scrapeIt = require("scrape-it")
const merge = require('./merge')
const _ = require('lodash')
const cheerio = require('cheerio')
const queries = require("../config/queries")
// const Iconv = require('iconv').Iconv
const iconv = require('iconv-lite')




// Immediatey invoked function to do recursive processing of pages
module.exports = (conn) =>
  (function collectPagesRecursive(processed = [], next = "") {
    if (!_.isEmpty(processed)) {
      next = _.last(processed).next
    }

    const requestOptions = makeConn(conn, next)
    log(requestOptions)
    return request(requestOptions)
      .then(toUTF8)
      .then(toCheerio)
      .then($ => scrapeIt.scrapeHTML($, queries))
      .then((result) => {
        processed.push(result)
        if (result.next !== conn.start) {
          return collectPagesRecursive(processed)
        }
        return processed
      })
  })([], conn.start)



function makeConn(conn, next) {
  return _.merge(conn, {
    url: ((next) ? next : conn.start),
    encoding :null,
  })
}

function log(conn) {
  console.log(`REQUEST: ${conn.baseUrl + conn.url}`)
}


function toUTF8(body) {
  return iconv.decode(body, 'ISO-8859-1')
}

function toCheerio(html) {
  return cheerio.load(html)
}
