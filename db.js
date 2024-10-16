const admin = require("firebase-admin");
const { steps } = require('./constants')
const {fbCredentials, fbDataBaseUrl} = require("./secure");

admin.initializeApp({
  credential: admin.credential.cert(fbCredentials),
  databaseURL: fbDataBaseUrl
});

var db = admin.database();
var ref = db.ref("/");

async function getDataFromBase() {
  return new Promise(async(res, rej) => {
    const snapshot = await ref.once('value');
    const value = snapshot.val();
    console.log('Data recived from server')
    res(value)
  })
}

async function updateBase(data) {
  ref.update(data)
  console.log('Data upteted success!')
}

const toHex = (txt) => {
  return txt.split('').map(c => c.charCodeAt(0).toString(16)).join(';/')
}

class Store {
  constructor() {
    this.update(false)
  }

  update(data) {
    if (data) updateBase(data)

    getDataFromBase().then((val) => {
      this.users = val.users || {}
      this.challenge = val.challenge || {}
    })
  }

  userInit(id, chatId, name) {
    return {
      id,
      chatId,
      active: false,
      register: false,
      phone: '',
      name,
      child: '',
      step: steps[0]
    }
  }

  findOrCreateUserById(id, chatId, name = '') {
    if (!this.users[id]) this.users[id] = this.userInit(id, chatId, name)
    this.update()
    return this.users[id]
  }
  findUserById(id) {
    return this.users && this.users[id]
  }
  updateUser(user) {
    this.users[user.id] = user
    this.update({
      'users': this.users,
      'challenge': this.challenge
    })
  }
  updateDate(newDate) {
    this.challenge.date = newDate
    this.update({
      'users': this.users,
      'challenge': this.challenge
    })
  }

  async startChallenge() {
    return new Promise(async(res, rej) => {
      let players = await this.childSort()
      players.map(({ player, child }) => {
        this.users[player].child = toHex(this.users[child].name)
        this.users[player].step = steps[4]
        this.users[child]["parent"] = toHex(player)

        if (this.users[child].img) this.users[player]["childIMG"] = toHex(this.users[child].img)
      })

      await this.update({
        'users': this.users,
        'challenge': this.challenge
      })
      res('Success')
    })
  }

  childSort() {
    let players = []
    let busyPlayers = []
    for (let id in this.users) players.push(id)

    players = players.map(player => {
      let avaliblePlayers = players.filter(p => p != player).filter(p => busyPlayers.indexOf(p) == -1)
      if (avaliblePlayers.length == 0) return 'repeat'
      let child = avaliblePlayers.sort((a, b) => Math.random() - 0.5)[0]

      busyPlayers.push(child)
      return { player, child }
    })

    if (players.filter(p => p == 'repeat').length > 0) return this.childSort()

    return players
  }
}

module.exports = Store