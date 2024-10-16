const year = 2024

const messages = [{
  "type": "start",
  "text": "✅ А теперь давай зарегистрируемся! ✅",
  "img": {
    "src": "https://thumbs.dreamstime.com/b/santa-clause-smiling-saying-hello-30364399.jpg",
    "caption": `
        🎅\nПривет, <b>{#name#}</b>! 
        На пороге уже ${year}-ый год. 
        Я - твой персональный помощник СантаБот, готовый помочь тебе с подготовкой к празднику и организацией игры "Тайный Санта". 
        Давай вместе создадим волшебную атмосферу и подарим радость другим! 🎁✨
`
  },
  "options": {
    "parse_mode": "HTML",
    "reply_markup": {
      "keyboard": [
        ["Поехали! 🚀"]
      ],
      "resize_keyboard": true,
      "one_time_keyboard": true
    }
  }
}, {
  "type": "activate",
  "text": "Жми на кнопку ниже либо введи свой номер в стандартном формате\n⬇⬇⬇⬇⬇⬇",
  "img": {
    "src": "https://ferma-biz.ru/wp-content/uploads/2019/10/Ygr7F_Cn3CQ.jpg",
    "caption": `
    Отлично, мне известно твоё имя, но чтобы точнее распознать тебя, мне нужен твой номер телефона 😉\n
     <i>Не бойся, я его никому не расскажу 😉</i>
`
  },
  "options": {
    "parse_mode": "HTML",
    "reply_markup": {
      "keyboard": [
        [{ "text": "Поделиться номером ✔", "request_contact": true }]
      ],
      "resize_keyboard": true,
      "one_time_keyboard": true
    }
  }
}, {
  "type": "registerSuccess",
  "text": "Регистрация завершена",
  "img": {
    "src": "https://sun9-80.userapi.com/impg/eIbPPrzFA4lNAR1bE_rUJmsTAxihiwPNqxOPig/Wyq4dEsaSmY.jpg?size=1200x800&quality=95&sign=afb09df8e4bd3367d04a3ed1377140fb&c_uniq_tag=yeZ1BoMUjIUvX7WP7TptWOIYL6N67T6h67KyWijlVKU&type=album",
    "caption": `
    Спасибо за твою регистрацию, <b>{#name#}</b>! 🎁\n
    Ты в игре! Настанет час подарков и удивлений! 🌟\n
    Жди письма от меня - твоего надежного бота-помощника. 🎅‍`
  },
  "options": {
    "parse_mode": "HTML",
    "reply_markup": {
      "keyboard": [
        [{ "text": "Что дальше?" }]
      ],
      "resize_keyboard": true,
      "one_time_keyboard": true
    }
  }
}, {
  "type": "whatNext",
  "text": "Жди окончания регистрации и <b>{#date#}</b> мы проведем розыгрыш!",
  "img": {
    "src": "https://www.jackmolan.com/wp-content/uploads/2017/11/ING_57919_08135.jpg",
    "caption": ""
  },
  "options": {
    "parse_mode": "HTML",
    "reply_markup": {
      "keyboard": [
        [{ "text": "Ну когда уже?" }]
      ],
      "resize_keyboard": true,
      "one_time_keyboard": true
    }
  }
}, {
  "type": "whenStart",
  "text": [
    "Дата назначена! Розыгрыш пройдёт <b>{#date#}</b>! Будь готов!",
    "Рад сообщить, что розыгрыш пройдет <b>{#date#}</b>",
    "Дата мероприятия <b>{#date#}</b>",
    "<b>{#name#}</b>, хорошие новости!\nРозыгрыш пройдет <b>{#date#}</b>!\nЖди сообщение!",
    "Наверное ещё не все пришли...\nСкоро начнём!",
    "Самому уже не терпится, но надо подождать"
  ],
  "img": "",
  "options": {
    "parse_mode": "HTML",
    "reply_markup": {
      "keyboard": [
        [{ "text": "Ну что там?" }]
      ],
      "resize_keyboard": true,
      "one_time_keyboard": true
    }
  }
}, {
  "type": "rss_date",
  "text": [
    "Дата назначена! Розыгрыш пройдёт <b>{#date#}</b>! Будь готов!",
    "Рад сообщить, что розыгрыш пройдет <b>{#date#}</b>",
    "Дата мероприятия {#date#}",
    "<b>{#name#}</b>, хорошие новости!\nРозыгрыш пройдет <b>{#date#}</b>!\nЖди сообщение!"
  ],
  "img": "",
  "options": {
    "parse_mode": "HTML",
    "reply_markup": {
      "keyboard": [
        []
      ],
      "resize_keyboard": true,
      "one_time_keyboard": true
    }
  }
}, {
  "type": "rss_soon",
  "text": [
    "<b>{#name#}</b>, ты <b>ready</b>? Скоро начинаем!🕐",
    "🕐Вот вот начинаем! \n <b>{#name#}</b>, надеюсь ты <b>ready</b>!"
  ],
  "img": "",
  "options": {
    "parse_mode": "HTML",
    "reply_markup": {
      "keyboard": [
        ['Конечно готов!✊']
      ],
      "resize_keyboard": true,
      "one_time_keyboard": true
    }
  }
}, {
  "type": "rss_finish",
  "text": [
    "Итак, <b>{#name#}</b>, розыгрыш проведён\nЕсли забудешь, попроси меня напомнить тебе и я подскажу!\n\nА сейчас, подтверди получение, жми на кнопку!"
  ],
  "img": {
    "src": "{#childIMG#}",
    "caption": "Итак, твой подопечный...🥁🥁🥁\n{#child#}"
  },
  "options": {
    "parse_mode": "HTML",
    "reply_markup": {
      "keyboard": [
        ['Подтверждаю получение']
      ],
      "resize_keyboard": true,
      "one_time_keyboard": true
    }
  }
}, {
  "type": "ready",
  "text": [
    "Отлично, скоро ты узнаешь своего подопечного!"
  ],
  "img": "",
  "options": {
    "parse_mode": "HTML",
    "reply_markup": {
      "keyboard": [
        []
      ],
      "resize_keyboard": true,
      "one_time_keyboard": true
    }
  }
}, {
  "type": "forgot",
  "text": [
    "Ну что ж ты так. Ты даришь подарок твоему другу, по имени <b>{#child#}</b>"
  ],
  "img": {
    "src": "{#childIMG#}",
    "caption": ""
  },
  "options": {
    "parse_mode": "HTML",
    "reply_markup": {
      "keyboard": [
        ['Опять забыл'],
        ['А нет ли у меня новых видео?']
      ],
      "resize_keyboard": true,
      "one_time_keyboard": true
    }
  }
}, {
  "type": "chlng_rss",
  "text": [
    "Поздравляю! Ты даришь подарок <b>{#child#}</b>"
  ],
  "img": {
    "src": "{#childIMG#}",
    "caption": ""
  },
  "options": {
    "parse_mode": "HTML",
    "reply_markup": {
      "keyboard": [
        ['Подтверждаю получение']
      ],
      "resize_keyboard": true,
      "one_time_keyboard": true
    }
  }
}, {
  "type": "complete",
  "text": [
    "<b>И неболшой презент</b>\nТы можешь записать видео своему Санте. Намекни ему на нужный подарок, или сообщи ему чего ты не хочешь получить! А быть может просто передай привет и пожелай удачи в выборе подарка такому сложному тебе!\n<i>Всё что нужно сделать - отправить видео мне, а дальше я всё сделаю сам.</i>\n А по кнопочке внизу ты можешь проверить, не прислал ли тебе твой подопечный пожелания!\nКнопочки там ⬇⬇⬇"
  ],
  "img": {
    "src": "https://images.theconversation.com/files/249524/original/file-20181209-128205-1jkmc13.jpg?ixlib=rb-1.1.0&amp;q=45&amp;auto=format&amp;w=1356&amp;h=668&amp;fit=crop",
    "caption": `Вот и всё. Розыгрыш проведён. Желаю тебе легко подобрать подарок! Я буду здесь до начала ${year} года, специально для тебя оставлю кнопку внизу, что бы ты мог вспонить, кому ты даришь подарок! Удачи друг`
  },
  "options": {
    "parse_mode": "HTML",
    "reply_markup": {
      "keyboard": [
        ['Не пришло ли мне видео?'],
        ['Напомни, пожалуйста']
      ],
      "resize_keyboard": true,
      "one_time_keyboard": true
    }
  }
}, {
  "type": "sendVideo",
  "text": [
    "Видео отправлено твоему санте!\nНо ты можешь отправить еще неограниченное число видео ему!\nЕсли он захочет, то сможет посмотреть его в любой момент!\nПо кнопке ниже ты можешь посмотреть видео от своего подопечного!"
  ],
  "img": "",
  "options": {
    "parse_mode": "HTML",
    "reply_markup": {
      "keyboard": [
        ['Нука - нука, что он там хочет?'],
        ['А кому я вообще дарю?']
      ],
      "resize_keyboard": true,
      "one_time_keyboard": true
    }
  }
}, {
  "type": "notVideo",
  "text": [
    "Видео пока нет, возможно <b>{#child#}</b> не хочет тебе ничего сказать?\nПопробуй позже"
  ],
  "img": "",
  "options": {
    "parse_mode": "HTML",
    "reply_markup": {
      "keyboard": [
        ['А теперь видео не пришло?'],
        ['А кому я вообще дарю?']
      ],
      "resize_keyboard": true,
      "one_time_keyboard": true
    }
  }
}, {
  "type": "notYetVideo",
  "text": [
    "Новых видео нет\nПопробуй позже"
  ],
  "img": "",
  "options": {
    "parse_mode": "HTML",
    "reply_markup": {
      "keyboard": [
        ['Есть новые видео?'],
        ['Понятно. А кому я дарю?']
      ],
      "resize_keyboard": true,
      "one_time_keyboard": true
    }
  }
}, {
  "type": "watchVideo",
  "text": [
    "Пока, это все твои видео, заходи позже, возможно Твой подопечный пришлёт тебе еще что то\nЯ смогу прислать тебе только новые видео, старые видео ты сможешь найти только в нашей переписке!"
  ],
  "img": "",
  "options": {
    "parse_mode": "HTML",
    "reply_markup": {
      "keyboard": [
        ['Нет ли ещё видео?'],
        ['Кому я дарю?']
      ],
      "resize_keyboard": true,
      "one_time_keyboard": true
    }
  }
}]

const errors = {
  "noExist": {
    "code": "01",
    "text": "Не так быстро, для начала давай познакомися, жми <b>/start</b>, чтобы начать",
    "options": {
      "parse_mode": "HTML",
      "reply_markup": {
        "keyboard": [
          [{ "text": "/start" }]
        ],
        "resize_keyboard": true,
        "one_time_keyboard": true
      }

    }
  },
  "userStep_1": {
    "code": "01",
    "text": "{#name#}, мы уже знакомы, но мне всё еще требуется утонить твои данные",
    "options": {
      "parse_mode": "HTML",
      "reply_markup": {
        "keyboard": [
          [{ "text": "Ну штош, давай" }]
        ],
        "resize_keyboard": true,
        "one_time_keyboard": true
      }
    }
  },
  "userStep_2": {
    "code": "02",
    "text": "Сейчас нужно отправить номер телефона, чтобы завершить регистрацию!",
    "options": {
      "parse_mode": "HTML",
      "reply_markup": {
        "keyboard": [
          [{ "text": "Поделиться номером", "request_contact": true }]
        ],
        "resize_keyboard": true,
        "one_time_keyboard": true
      }
    }
  },
  "userStep_3": {
    "code": "03",
    "text": [
      "Ты уже зарегестрирован, дождись розыгрыша, тебе придёт уведомление!",
      "<b>{#name#}</b>, потерпи немного, скоро придет уведомление"
    ],
    "options": {
      "parse_mode": "HTML",
      "reply_markup": {
        "keyboard": [
          [{ "text": "Ну когда уже?" }]
        ],
        "resize_keyboard": true,
        "one_time_keyboard": true
      }
    }
  },
  "userStep_4": {
    "code": "04",
    "text": "Кажется розыгрыш уже проведён, напомнить твоего подопечного?",
    "options": {
      "parse_mode": "HTML",
      "reply_markup": {
        "keyboard": [
          [{ "text": "Да, я забыл" }]
        ],
        "resize_keyboard": true,
        "one_time_keyboard": true
      }
    }
  },
  "userStep_5": {
    "code": "05",
    "text": "Розыгрыш проведён, хочешь что бы я напомнил?",
    "options": {
      "parse_mode": "HTML",
      "reply_markup": {
        "keyboard": [
          [{ "text": "Напомни плиз" }]
        ],
        "resize_keyboard": true,
        "one_time_keyboard": true
      }
    }
  },
  "phone.length": {
    "code": "phone.length",
    "text": "Кажется твой телефон неправильной длины, Введи номер телефона в нужном формате\n<i>+7 999 999 9999</i>\n<b>Или просто нажми на кнопку!</b>",
    "options": {
      "parse_mode": "HTML",
      "reply_markup": {
        "keyboard": [
          [{ "text": "Лови свой чертов номер!", "request_contact": true }]
        ],
        "resize_keyboard": true,
        "one_time_keyboard": true
      }
    }
  },
  "phone": {
    "code": "phone",
    "text": "Телефон неправильного формата, введи в формате \n<b><i>+7 999 999 9999</i></b>\n или просто поделись контактом",
    "options": {
      "parse_mode": "HTML",
      "reply_markup": {
        "keyboard": [
          [{ "text": "Лови свой чертов номер!", "request_contact": true }]
        ],
        "resize_keyboard": true,
        "one_time_keyboard": true
      }
    }
  },
  "unknow_msg": {
    "code": "unknow_msg",
    "text": [
      "Прости, я еще не всё понимаю",
      "Что что? Ты это мне?",
      "Боюсь я не знаю что тебе на это ответить",
      "С наступающим новым годом!",
      "Хм, это на эльфийском?"
    ]
  },
  "unknow_error": {
    "code": "unknow_error",
    "text": "Неизвестная ошибка, свяжитесь с администратором"
  }
}

const steps = {
  0: 'start', //Не нажал /start(нет в базе данных)
  1: 'activated', // Нажал /start добавлен в базу данных
  2: 'wait phone', //Ожидается ввод телефона
  3: 'registred', // Ввёл телефон, регистрация завершена
  4: 'ready', //Розыгрыш проведён, Не подтвердил получение
  5: 'complete' // Подтвердил получение
}

const commands = {
  'start': {
    "re": /\/start/,
    "type": "start"
  },
  'activate': {
    "re": /Поехали|Ну штош, давай/,
    "type": "activate"
  },
  'whatNext': {
    "re": /Что дальше/,
    "type": "whatNext"
  },
  'whenStart': {
    "re": /Ну когда уже|Ну что там/,
    "type": "whenStart"
  },
  'ready': {
    "re": /готов/,
    "type": "ready"
  },
  'forgot': {
    "re": /забыл|Напомни|вообще дарю|Кому я дарю|кому я дарю/,
    "type": "forgot"
  },
  'complete': {
    "re": /Подтверждаю получение|ок|Ок|ОК/,
    "type": "complete"
  },
  'watchVideo': {
    "re": /он там хочет|видео/,
    "type": "watchVideo"
  }
}

const defImg = {
  "79017035819": {
    "img": "https://sun9-16.userapi.com/impg/S1VUfLWCjBooWM5aeHTGuVJm0HbrgdX-rBxmaA/N_WkeFm8nRE.jpg?size=960x1280&quality=95&sign=44ba487e17e9a640709ee6f695ecddbb&type=album",
    "name": "Дима"
  },
  "79017912752": {
    "img": "https://sun9-88.userapi.com/impg/D0472RnAdnqNZ65WQ5OvVeLk5tstfqJHRdzHZQ/Y71o0AYF2Ik.jpg?size=599x596&quality=95&sign=992d40208ac1fd3757e557bcebd89a09&type=album",
    "name": "Санёк"
  },
  "79807243848": {
    "img": "https://sun9-80.userapi.com/impg/jm0TPcvkiuVoEhakFkqGEnXVkwXaOaH56mUBdQ/-1MyHI_J-yw.jpg?size=594x597&quality=95&sign=1afddf14907dbc49673a1bc262860efd&type=album",
    "name": "Максон Гол"
  },
  "79101688752": {
    "img": "https://sun9-39.userapi.com/impg/o4DzuTm0rmYk_FwQdoyB_m3-H6MgcC4G0ISyBQ/BwaGSr37MWk.jpg?size=596x597&quality=95&sign=18dc02aa4a8f73322d59a16eece8737e&type=album",
    "name": "Даша"
  },
  "79309671328": {
    "img": "https://sun9-42.userapi.com/impg/2j5AQx0opymAAY0AznWChEJqRFuzVlHhqOoEVw/6vhZKchgW5s.jpg?size=684x620&quality=95&sign=9d7200c4019cc4cf2fdcd95200109c2c&type=album",
    "name": "Анге-Лина!"
  },
  "79139472863": {
    "img": "https://sun9-2.userapi.com/impf/c834202/v834202530/1711ce/va9GncCINRA.jpg?size=640x800&quality=96&sign=7ef3c9f6d082100a6885d7b1ccbada2f&type=album",
    "name": "Саша Што"
  },
  "79833125123": {
    "img": "https://sun9-24.userapi.com/impf/c840231/v840231383/920f2/lQtBN1O1mLg.jpg?size=2560x1707&quality=96&sign=621bb3bdd48467a0feeaa37cdc5f8109&type=album",
    "name": "Максим Што"
  }
}


const adminTools = {
  "inline_keyboard": [
    [{
      text: 'Показать зарегистрированных',
      callback_data: 'allUsers'
    }],
    [{
      text: 'Рассылка',
      callback_data: 'rss'
    }, {
      text: 'Назначить дату',
      callback_data: 'sendDate'
    }],
    [{
      text: 'Начать розыгрыш',
      callback_data: 'startingChallenge'
    }]
  ],
  "resize_keyboard": true,
  "one_time_keyboard": true
}

const dateKeyboard = {
  "inline_keyboard": [
    [
      { text: "1", callback_data: "date_1" },
      { text: "2", callback_data: "date_2" },
      { text: "3", callback_data: "date_3" },
      { text: "4", callback_data: "date_4" },
      { text: "5", callback_data: "date_5" },
      { text: "6", callback_data: "date_6" },
      { text: "7", callback_data: "date_7" }
    ],
    [
      { text: "8", callback_data: "date_8" },
      { text: "9", callback_data: "date_9" },
      { text: "10", callback_data: "date_10" },
      { text: "11", callback_data: "date_11" },
      { text: "12", callback_data: "date_12" },
      { text: "13", callback_data: "date_13" },
      { text: "14", callback_data: "date_14" }
    ],
    [
      { text: "15", callback_data: "date_15" },
      { text: "16", callback_data: "date_16" },
      { text: "17", callback_data: "date_17" },
      { text: "18", callback_data: "date_18" },
      { text: "19", callback_data: "date_19" },
      { text: "20", callback_data: "date_20" },
      { text: "21", callback_data: "date_21" }
    ],
    [
      { text: "22", callback_data: "date_22" },
      { text: "23", callback_data: "date_23" },
      { text: "24", callback_data: "date_24" },
      { text: "25", callback_data: "date_25" },
      { text: "26", callback_data: "date_26" },
      { text: "27", callback_data: "date_27" },
      { text: "28", callback_data: "date_28" }
    ],
  ],
  "resize_keyboard": true,
  "one_time_keyboard": true
}

const rssKeyboard = {
  "inline_keyboard": [
    [
      { text: "Дата начала", callback_data: "rss_date" }
    ],
    [
      { text: "Скоро начнем", callback_data: "rss_soon" }
    ],
    [
      { text: "Розыгрыш проведен", callback_data: "rss_finish" }
    ]
  ],
  "resize_keyboard": true,
  "one_time_keyboard": true
}

const chlngKeyboard = {
  "inline_keyboard": [
    [
      { text: "Проверить назначение", callback_data: "chlng_check" }
    ]
  ],
  "resize_keyboard": true,
  "one_time_keyboard": true
}


module.exports = {
  messages,
  errors,
  steps,
  commands,
  defImg,
  adminTools,
  dateKeyboard,
  rssKeyboard,
  chlngKeyboard
}