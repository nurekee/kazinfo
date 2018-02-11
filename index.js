const TelegramBot = require('node-telegram-bot-api')
const request = require('request')
const TOKEN = '525092677:AAFrxHI4_EEvj78C3rP5LRzIZK6kLQUShJw'

const bot = new TelegramBot(TOKEN,{
    polling: true
})
const KB = {
    currency:'Жоба жайында',
    water: 'Мәзір ',
    back:'Кері қайту'
}
bot.onText(/\/start/, msg => {
sendGreeting(msg)
})
bot.on('message',msg =>{
switch (msg.text)
{
    case KB.currency:
        sendCurrencyScreen(msg.chat.id)
        break
    case KB.water:
        break
    case KB.back:
      sendGreeting(msg,fale)
}

})

bot.on('callback_query',query =>{
    //console.log(JSON.stringify(query,null,2))
const base = query.data
    const symbol = 'RUB'

    request(`https://api.fixer.io/latest?symbols= ${symbol} &base=${base}`,(error,response,body) =>{
     if (error) throw new Error(error)
if(response.statusCode === 2000){

         const  currencyData = JSON.parse(body)
   console.log(currencyData)
    /* const html = `<b>1 ${symbol}</b> - <em>${currencyData.rates[symbol]} ${base} </em>`

    bot.sendMessage(query.message.chat.id,html,{
        parse_mode:'HTML'
    })*/
}
    })



})
function sendGreeting(msg,sayHello = true) {
    const text = sayHello
        ?`Қош келдіңіз, ${msg.from.first_name} \n Қандай көмек көрсете аламыз?`
    :`Қандай көмек көрсете аламыз`
        bot.sendMessage(msg.chat.id,text,{
        reply_markup:{
            keyboard:[
                [KB.currency,KB.water]
            ]
        }
    })

}
function sendCurrencyScreen(chatId) {
    bot.sendMessage(chatId,`Валютаны таңдаңыз:`,{
reply_markup: {
    inline_keyboard:[
        [
            {
                text:'Доллар',
                callback_data:'USD'
            }
        ],
        [
            {
                text:'Еуро',
                callback_data:'EUR'
            }
        ],
        [
            {
                text:'Рубль',
                callback_data:'RUB'
            }
        ]
    ]
}
    })


}