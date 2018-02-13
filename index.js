const TelegramBot = require('node-telegram-bot-api')
const fs = require('fs')
const _ = require('lodash')
//const request = require('request')
const TOKEN = '525092677:AAFrxHI4_EEvj78C3rP5LRzIZK6kLQUShJw'

const bot = new TelegramBot(TOKEN,{
    polling: true
})
const KB = {
    currency: 'Жоба жайында',
    picture: 'Мәзір',
    oku:'оқушыға не береді ?',
    artyk:'артықшылықтары:',
    maksat:'мақсаттары:',
    prins:'принциптері',
    baga:'бағасы:',
    sony:'Cұрақтар',
    back: 'Кері қайту'
}
const PicScrs = {
    [KB.oku]: [
        'bilge2.png'
    ],
    [KB.artyk]: [
        'b.png'
    ],
[KB.maksat]: [
    'bilge4.png'
],
    [KB.prins]: [
    'bilge5.png'
],[KB.baga]: [
    'bilge6.png'
],
    [KB.sony]: [
    'sony.png'
]}

bot.onText(/\/start/, msg => {
    sendGreeting(msg)
})

bot.on('message', msg => {

    switch (msg.text) {
        case KB.picture:
            sendPictureScreen(msg.chat.id)
            break
        case KB.currency:
            break
        case KB.back:
            sendGreeting(msg, false)
            break
        case KB.oku:
        case KB.artyk:
        case KB.maksat:
        case KB.prins:
        case KB.baga:
        case KB.sony:
            sendPictureByName(msg.chat.id, msg.text)
            break
    }

})



function sendPictureScreen(chatId) {
    bot.sendMessage(chatId, `Қажет бөлімді таңдаңыз: `, {
        reply_markup: {
            keyboard: [['Bilgen Robotics '],
                [KB.oku ,
                    KB.artyk],
                [ KB.maksat,
                    KB.prins],
                [KB.baga,
                    KB.sony],
                [KB.back]
            ]
        }
    })
}

function sendGreeting(msg, sayHello = true) {
    const text = sayHello
        ? `Қош келдіңіз, ${msg.from.first_name}\n Қандай көмек көрсете аламыз?`
        : `Қандай көмек көрсете аламыз`

    bot.sendMessage(msg.chat.id, text, {
        reply_markup: {
            keyboard: [
                [KB.currency, KB.picture]
            ]
        }
    })
}
function sendPictureByName(chatId, picName) {
    const srcs = PicScrs[picName]

    const src = srcs[_.random(0, srcs.length - 1)]

    bot.sendMessage(chatId, `жүктеліуде....`)

    fs.readFile(`${__dirname}/pictures/${src}`, (error, picture) => {
        if (error) throw new Error(error)

        bot.sendPhoto(chatId, picture).then(() => {
            bot.sendMessage(chatId, `жөнелтілді!`)
        })
    })
}