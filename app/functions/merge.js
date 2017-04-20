const _ = require('lodash')

module.exports = (results) => {
  return results
    .reduce((result, data) => {
      // list is empty         or last entry is the same day
      if (_.isEmpty(result) || !_.isEqual(_.last(result).date, data.date)) {
        // Adding a schedule page
        // create ID
        // set data
        data._id = hashCode(data.date.day) // TODO: Find a better id
        return _.concat(result, data)
      }

      // merge data from same day
      let last = _.last(result)

      let merged = _.merge(data, last)

      return _.set(result, result.length -1, merged)
    }, [])
}


function hashCode(string){
	let hash = 0;
	if (string.length == 0) return hash.toString(16);
	for (let i = 0; i < string.length; i++) {
		char = string.charCodeAt(i);
		hash = ((hash<<5)-hash)+char;
		hash = hash & hash; // Convert to 32bit integer
	}
	return hash.toString(16);
}
