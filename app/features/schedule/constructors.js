const _ = require('lodash')
const bluebird = require('bluebird')

const remote = require('./util/remote')

function fromRemote(school, auth) {
  let options = _.merge({
    uri: school.web.start,
    baseUrl: school.web.base,
    headers: { Authorization : auth },
    encoding :null
  }, school.web.http_options)

  // Immediatey invoked function to do recursive processing of pages
  return (function collectPagesRecursive(processed = []) {
      if (!_.isEmpty(processed)) {
        options.uri = _.last(processed).next
      }

      return remote.fetchPageFromUrl(options)
        .then(remote.processPage)
        .then((p) => {
          processed.push(p)
          if (p.next !== school.web.start) {
            return collectPagesRecursive(processed)
          }
          return processed
        })
    })()
    .then(remote.joinPages)
}

module.exports = {
  fromRemote,
}
