schools = module.exports = [

  {
    name: 'Helmholtz-Gymnasium Bielefeld',
    variant: 'SEK-1',
    schoolId: 'hg-bi-sek1',
    web: {
      baseUrl: 'http://vplansek1.bielefeld-gym-heho.logoip.de/',
      start: 'subst_001.htm',
      headers: {
      },
      rejectUnauthorized: false
    },
    teachers: [{
        id: "Dfe",
        realName: "Dfe"
      }, {
        id: "Tes",
        realName: "Tes"
      }, {
        id: "Adr",
        realName: "Adr"
      }, {
        id: "Eik",
        realName: "Eik"
      }, {
        id: "Fu",
        realName: "Fu"
      }, {
        id: "Jka",
        realName: "Jka"
      }, {
        id: "Kth",
        realName: "Kth"
      }, {
        id: "Kop",
        realName: "Kop"
      }, {
        id: "Lan",
        realName: "Lan"
      }, {
        id: "Loh",
        realName: "Loh"
      }, {
        id: "MSl",
        realName: "MSl"
      }, {
        id: "Nid",
        realName: "Nid"
      }, {
        id: "Stl",
        realName: "Stl"
      }
    ]
  }, {
    name: 'Helmholtz-Gymnasium Bielefeld',
    variant: 'SEK-2',
    schoolId: 'hg-bi-sek2',
    web: {
      baseUrl: 'http://vplansek2.bielefeld-gym-heho.logoip.de/',
      start: 'subst_001.htm',
      headers: {
      },
      // SSL
      rejectUnauthorized: false
    },
    teachers: []
  }
]
