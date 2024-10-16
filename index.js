const TelegramBot = require('node-telegram-bot-api');
const {botToken, botAdminId} = require("./secure");

const bot = new TelegramBot(botToken, { polling: true });

const Store = require('./db')

const {
  messages,
  errors,
  chlngKeyboard,
  steps,
  commands,
  defImg,
  adminTools,
  dateKeyboard,
  rssKeyboard
} = require('./constants');

let store = new Store()

const adminId = botAdminId
const isAdmin = (id) => id == adminId;

const isCommand = (text) => {
  for (let c in commands)
    if (commands[c].re.test(text)) return true

  return false
}

const fromHex = (hex) => {
  return hex.split(';/').filter(c => c != '').map(c => {
    return String.fromCharCode(parseInt(c, 16))
  }).join('')
}

const getStepCode = (text) => {
  for (let step in steps) {
    if (steps[step] == text) return step
  }
}

const getErrorTypeOrFalse = (user, eventStep, expectedStep) => {
  if (!user) return { code: 'noExist' }

  const userStep = user.step

  if (userStep == expectedStep) return false

  return { code: `userStep_${getStepCode(userStep)}` }
}

const sendMessage = function(msg, type) {
  const chatId = msg.chat.id;
  let { img, text, options } = messages.filter(m => m.type == type)[0]

  if (img) bot.sendPhoto(chatId, img.src
    .replace(/{#childIMG#}/g, fromHex(store.users[chatId].childIMG || '')), {
      caption: img.caption.replace(/{#name#}/g, msg.chat.first_name)
        .replace(/{#date#}/g, store.challenge.date)
        .replace(/{#child#}/g, fromHex(store.users[chatId].child)),
      parse_mode: "HTML",
    })

  let msgText = text
  if (Array.isArray(text)) msgText = text.sort((a, b) => Math.random() - 0.5)[0]

  if (msgText) setTimeout(() => {
    bot.sendMessage(chatId,
      msgText.replace(/{#name#}/g, msg.chat.first_name)
      .replace(/{#date#}/g, store.challenge.date)
      .replace(/{#child#}/g, fromHex(store.users[chatId].child)),
      options)
  }, 700)

  if (isAdmin(msg.from.id)) setTimeout(() => {
    bot.sendMessage(
      chatId,
      "<b>Управление</b>\n<i>только для администратора</i>", {
        parse_mode: "HTML",
        reply_markup: adminTools
      }
    )
  }, 2000)
}

const sendError = function(msg, errId) {
  console.log('err_ID: ' + errId)
  const chatId = msg.chat.id;
  let { code, text, options } = errors[errId]

  let errText = text
  if (Array.isArray(text)) errText = text.sort((a, b) => Math.random() - 0.5)[0]

  console.error('error: ', code)

  if (errText) bot.sendMessage(
    chatId,
    errText.replace(/{#name#}/g, msg.chat.first_name)
    .replace(/{#date#}/g, store.challenge.date),
    options
  )
}

let postText = ""

// START
bot.onText(commands.start.re, (msg, match) => {
  if (msg.text.indexOf('/newPost') != -1) return
  const step = steps[1]

  const userId = msg.from.id;
  const user = store.findOrCreateUserById(userId, msg.chat.id, msg.from.first_name)
  const err = getErrorTypeOrFalse(user, step, steps[0])
  if (err) { sendError(msg, err.code); return }

  if (!isAdmin(userId)) bot.sendMessage(adminId, `Присоеденился:\n${msg.from.first_name}`)

  user.step = step
  user.active = true
  store.updateUser(user)
  sendMessage(msg, commands.start.type)

});

//ACTIVATE
bot.onText(commands.activate.re, (msg, match) => {
  if (msg.text.indexOf('/newPost') != -1) return
  const step = steps[2]

  const userId = msg.from.id;
  const user = store.findUserById(userId)

  const err = getErrorTypeOrFalse(user, step, steps[1])
  if (err) { sendError(msg, err.code); return }

  user.step = step
  store.updateUser(user)
  sendMessage(msg, commands.activate.type)
});

//What next?
bot.onText(commands.whatNext.re, (msg, match) => {
  if (msg.text.indexOf('/newPost') != -1) return
  let step = steps[3]
  const userId = msg.from.id;
  const user = store.findUserById(userId)

  const err = getErrorTypeOrFalse(user, step, steps[3])
  if (err) { sendError(msg, err.code); return }

  sendMessage(msg, commands.whatNext.type)
});

//When start?
bot.onText(commands.whenStart.re, (msg, match) => {
  if (msg.text.indexOf('/newPost') != -1) return
  let step = steps[3]
  const userId = msg.from.id;
  const user = store.findUserById(userId)

  const err = getErrorTypeOrFalse(user, step, steps[3])
  if (err) { sendError(msg, err.code); return }

  sendMessage(msg, commands.whenStart.type)
});

//ready
bot.onText(commands.ready.re, (msg, match) => {
  if (msg.text.indexOf('/newPost') != -1) return
  let step = steps[3]
  const userId = msg.from.id;
  const user = store.findUserById(userId)

  const err = getErrorTypeOrFalse(user, step, steps[3])
  if (err) { sendError(msg, err.code); return }

  sendMessage(msg, commands.ready.type)
});

//forgot
bot.onText(commands.forgot.re, (msg, match) => {
  if (msg.text.indexOf('/newPost') != -1) return
  let step = steps[3]
  const userId = msg.from.id;
  const user = store.findUserById(userId)

  // const err = getErrorTypeOrFalse(user, step, steps[3])
  // if (err) { sendError(msg, err.code); return }

  sendMessage(msg, commands.forgot.type)
});

//watchVideo
bot.onText(commands.watchVideo.re, (msg, match) => {
  if (msg.text.indexOf('/newPost') != -1) return
  let step = steps[3]
  const userId = msg.from.id;
  const user = store.findUserById(userId)

  if (!user['video']) {
    if (!user['oldVideo']) { sendMessage(msg, 'notVideo'); return }

    sendMessage(msg, 'notYetVideo')
    return
  }

  if (!user['oldVideo']) user['oldVideo'] = []

  user["video"] = user['video'].filter(v => {
    bot.sendVideo(userId, v)
    user['oldVideo'].push(v)

    return false
  })

  store.updateUser(user)

  setTimeout(() => {
    sendMessage(msg, commands.watchVideo.type)
  }, 5000)
});

//Complete
bot.onText(commands.complete.re, (msg, match) => {
  if (msg.text.indexOf('/newPost') != -1) return
  let step = steps[5]
  const userId = msg.from.id;
  const user = store.findUserById(userId)

  const err = getErrorTypeOrFalse(user, step, steps[4])
  if (err) { sendError(msg, err.code); return }

  user.step = step
  store.updateUser(user)
  sendMessage(msg, commands.complete.type)
});

//PHONE
bot.on('message', (msg, match) => {
  if (match.type == "text" && msg.text.indexOf('/newPost') != -1 && isAdmin(msg.from.id)) {
    createPost(msg.text)
    return
  }
  if (match.type == "text" && isCommand(msg.text)) return
  if (match.type == "video") return
  const step = steps[3]

  const userId = msg.from.id;
  const user = store.findUserById(userId)

  if (user.step !== steps[2]) {
    let err = getErrorTypeOrFalse(user, step, steps[2]) || {}
    if (match.type != "text" || !isCommand(msg.text)) err['code'] = 'unknow_msg'

    if (!err) err['code'] = 'unknow_error'

    sendError(msg, err.code)
    return
  }

  let phone = ''
  if (msg.contact) phone = msg.contact.phone_number;

  if (!phone) phone = msg.text;

  phone = phone.replace(/[ \(\)\+-]/g, '')

  if (phone.length !== 11) { sendError(msg, 'phone.length'); return }

  let rePhone = new RegExp(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/)

  if (!rePhone.test(phone)) { sendError(msg, 'phone'); return }

  user.step = step
  user.phone = '+' + phone.replace(/^8/, '7')

  if (defImg[phone]) {
    user["img"] = defImg[phone].img
    user["name"] = defImg[phone].name
  }

  store.updateUser(user)
  sendMessage(msg, 'registerSuccess')
})

bot.on('callback_query', async(msg) => {
  const query = msg.data

  if (query == "allUsers") {
    let out = ''
    for (let id in store.users) {
      let user = store.users[id]
      out += user.phone + '\n' + user.name + '\n' + user.step
      out += '\n'
    }
    bot.sendMessage(adminId, out)
  }

  if (query == "rss") {
    bot.sendMessage(adminId, 'Выбери рассылку', {
      reply_markup: rssKeyboard
    })
  }

  if (/^rss_/.test(query)) {
    for (let id in store.users) {
      let user = store.users[id]
      let chatId = user.chatId
      sendMessage({
        chat: {
          id: chatId,
          first_name: user.name
        },
        from: {
          id: user.id
        }
      }, query)
    }
  }

  if (query == "startingChallenge") {
    //start chellenge
    bot.sendMessage(adminId, 'Начал розыгрыш', {
      reply_markup: chlngKeyboard
    })

    store.startChallenge()
  }

  if (query == "chlng_check") {
    let out = ''
    for (let id in store.users) {
      let user = store.users[id]
      out += `${user.name}: <b>${user.child != ''}</b>`
      out += '\n'
    }
    bot.sendMessage(adminId, out, { "parse_mode": "HTML", })
  }

  if (query == "chlng_rss") {
    for (let id in store.users) {
      let user = store.users[id]
      let chatId = user.chatId
      sendMessage({
        chat: {
          id: chatId,
          first_name: user.name
        },
        from: {
          id: user.id
        }
      }, query)
    }
  }

  if (query == "sendDate") {
    bot.sendMessage(adminId, 'Выбери число в ноябре, и назначим дату розыгрыша!', {
      reply_markup: dateKeyboard
    })
  }

  if (query == "post") {
    for (let id in store.users) {
      let user = store.users[id]
      let chatId = user.chatId
      bot.sendMessage(chatId,
        postText.replace(/{#name#}/g, user.name)
        .replace(/{#child#}/g, fromHex(user.child)), {
          "parse_mode": "HTML",
          "reply_markup": {
            "keyboard": [
              ['А теперь видео не пришло?'],
              ['А кому я вообще дарю?']
            ],
            "resize_keyboard": true,
            "one_time_keyboard": true
          }
        })
    }
  }

  if (/date_\d+/.test(query)) {
    let newDate = ('0' + query.replace('date_', '')).slice(-2) + ".11.2021"
    store.updateDate(newDate)
    bot.sendMessage(adminId, `Дата назначена, на ${newDate}!`, {
      reply_markup: adminTools
    })
  }
});


//Video
bot.on('video', (msg) => {
  const userId = msg.from.id;
  const user = store.findUserById(userId)

  let santa = store.findUserById(fromHex(user.parent))

  if (!santa['video']) santa['video'] = []

  santa['video'].push(msg.video.file_id)

  store.updateUser(santa)

  sendMessage(msg, 'sendVideo')
})

bot.on("polling_error", console.log)

function createPost(text) {
  text = text.replace('/newPost', '')
  postText = text
  const rssKeyboard = {
    "inline_keyboard": [
      [
        { text: "Разослать", callback_data: "post" }
      ]
    ],
    "resize_keyboard": true,
    "one_time_keyboard": true
  }
  bot.sendMessage(adminId, text, {
    parse_mode: "HTML",
    reply_markup: rssKeyboard
  })
}