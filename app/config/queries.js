const moment = require("moment")

const queries = {

  next: {
    selector: "meta[http-equiv='refresh']",
    attr: "content",
    convert: content => content.split("=")[1]
  },
  date: {
    selector: ".mon_title",
    convert: date => {
      let week = /.*Woche (\w).*/.exec(date)[1]
      let day = /^(\d{1,2}\.\d{1,2}\.\d{4}).*/.exec(date)[1]
      day = moment(day, "DD.MM.YYYY").format()
      return {week, day}
    }

  },

  hasDayInfo: {
    selector: "table.info",
    convert: table =>  !!table
  },
  day: {
    selector: "table.info",
    data: {
      absentTeachers: {
        selector: "tr:nth-of-type(2) td:nth-of-type(2)",
        convert: string => string.split(/, ?/).filter(str => str !== "")
      },
      absentClasses: {
        selector: "tr:nth-of-type(3) td:nth-of-type(2)",
        convert: string => string.split(/, ?/).filter(str => str !== "")
      },
      blockedRooms: {
        selector: "tr:nth-of-type(4) td:nth-of-type(2)",
      convert: string => string.split(/, ?/).filter(str => str !== "")
      },
      affectedClasses: {
       selector: "tr:nth-of-type(5) td:nth-of-type(2)",
       convert: string => string.split(/, ?/).filter(str => str !== "")
      },
      affectedRooms: {
        selector: "tr:nth-of-type(6) td:nth-of-type(2)",
        convert: string => string.split(/, ?/).filter(str => str !== "")
      },
      info: "tr:nth-of-type(7) td:nth-of-type(1)",

    },

  },

  substitutions: {
    listItem: ".mon_list tr.odd, .mon_list tr.even",
    data: {
      classes: "td:nth-of-type(1)",
      hour: "td:nth-of-type(2)",
      absent: "td:nth-of-type(3)",
      substitute: "td:nth-of-type(4)",
      room: "td:nth-of-type(5)",
      text: "td:nth-of-type(6)",
      description: "td:nth-of-type(7)",
      canceled: "td:nth-of-type(8)",
      renew: "td:nth-of-type(9)",
    }
  },

  updated: {
      selector: "font[size='5']",
      convert: date => {
        let day = /^(\d{1,2}\.\d{1,2}\.\d{4}).*/.exec(date)[1]
        day = moment(day, "DD.MM.YYYY").format()
        return day
      }
  }
}

module.exports = queries
