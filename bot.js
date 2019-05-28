const Discord = require('discord.js')
const { token } = require('./auth.json')

// const channelIdBot = '567934005257961498'
const bot = new Discord.Client()

bot.on('ready', () => {
    console.log(`Bot conectado!`)
    sendMessage({ content: 'Olá mundo! Tô na Arya.' })
})

bot.on('message', msg => {
    const { author, channel, content } = msg

    // Somente tratar mensagens enviadas ao canal de teste
    if (channel.id !== channelIdBot) return

    console.log(`@${author.username}: ${content} [${channel.name}]`)

    // Comandos
    if (content.substring(0, 1) == '!') {
        let args = content.substring(1).split(' ')
        const cmd = args[0]
        args = args.splice(1)

        switch (cmd) {
            // !ping
            case 'ping':
                sendMessage({
                    content: `<@${author.id}> Pong!`
                })
                break
        }
        return
    }

    // Swagger !== Suegam
    if (content.toLowerCase().includes('swagger')) {
        sendMessage({
            content: `<@${author.id}> Você quis dizer: Suegam?`
        })
        return
    }
});

function sendMessage({ channelName = 'podtag-bot', content }) {
    bot.channels
        .find(({name} = channel) => name === channelName)
        .send(content)
        .catch(e => console.log(`[Error] ${e}`))
}

bot.login(token)