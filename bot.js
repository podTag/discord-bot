const Discord = require('discord.js')
const { token } = require('./auth.json')

const bot = new Discord.Client()

// const channelIdBot = '567934005257961498'

bot.on('ready', () => {
    console.log(`Bot conectado!`)
    sendMessage({ content: 'Olá mundo! Tô na Arya.' })
})

bot.on('guildMemberAdd', member => {
    console.log(`Usuário <@${member.user.id}> entrou no servidor`);
    const dmBoasVindas = `Seja muito bem vindo(a), <@${member.user.id}>!`
    member
        .user
        .createDM()
        .then(channel => {
            channel.send(dmBoasVindas)
        })
        .catch(console.error)
    
    if (member.user.username === 'everton-teste-bot') return
    
    const msgBoasVindasGeral = `Seja muito bem vindo(a), <@${member.user.id}>! Se apresenta pra gente! 😉`
    bot.channels
        .find(({name} = channel) => name.includes('┇geral'))
        .send(msgBoasVindasGeral)
        .catch(console.error)
})

bot.on('guildMemberRemove', member => {
    console.log(`Usuário <@${member.user.id}> deixou o servidor`);
    const mensagemSaida = `<@${member.user.id}> deixou o server 😕`
    member
        .guild
        .members
        .filter(member => member.roles.some(role => role.name === 'ADMIN'))
        .tap(admin => {
            admin.user.createDM().then(channel => {
                channel.send(mensagemSaida)
            })
        })
})

bot.on('message', msg => {
    if (msg.channel.type !== 'text') return;

    const { author, channel, content } = msg
    console.log(`@${author.username} => #${channel.name}: ${content}`)

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
        const mensagem = `<@${author.id}> Você quis dizer: Suegam?`;
        sendMessage({
            content: mensagem
        })
    }
});

function sendMessage({ channelName = 'podtag-bot', content }) {
    bot.channels
        .find(({name} = channel) => name === channelName)
        .send(content)
        .catch(console.error)
}

bot.login(token)