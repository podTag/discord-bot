/* eslint-disable no-console */

const Discord = require('discord.js')
const { token } = require('./auth.json')

const bot = new Discord.Client()

const channels = {
    geral: '560993458215714816',
    sandboxBot: '567934005257961498',
    zero800: '560997260930842645',
    feedback: '561032029655793675',
    diskAmizade: '560996635166113792'
}

const admins = {
    everton: '308832343571824640'
}

const ligacoesPraPulica = []

bot.on('ready', () => {
    console.log(`Bot conectado!`)
    sendMessage({ content: 'Olá mundo! Tô na Arya.' })
})

bot.on('guildMemberAdd', member => {
    console.log(`Usuário <@${member.user.id}> entrou no servidor`);
    const dmBoasVindas = createDmBoasVindas(member)
    member
        .user
        .createDM()
        .then(channel => {
            channel.send(dmBoasVindas)
        })
        .catch(console.error)

    if (member.user.username === 'everton-teste-bot') return

    const msgBoasVindasGeral = `Seja muito bem vindo(a), <@${member.user.id}>! Se apresenta pra gente! 😉`
    setTimeout(() => {
        bot.channels
            .find(({ name }) => name.includes('┇geral'))
            .send(msgBoasVindasGeral)
            .catch(console.error)
    }, 3 * 60 * 1000)
})

bot.on('guildMemberRemove', member => {
    console.log(`Usuário ${member.user.username} [<@${member.user.id}>] deixou o servidor`)
    const mensagemSaida = `${member.user.username} [<@${member.user.id}>] deixou o server 😕`
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
    if (msg.channel.type !== 'text') return

    const { author, channel, content } = msg
    console.log(`@${author.username} => #${channel.name}: ${content}`)

    // Comandos
    if (content.substring(0, 1) == '!') {
        let args = content.substring(1).split(' ')
        const cmd = args[0]
        args = args.splice(1)

        switch (cmd) {
            // !ping
            case 'ping': {
                msg.reply('Pong!')
                break
            }
            // !picpay
            case 'picpay': {
                const replyPicPay = "que bom que você perguntou! Conheça os nossos planos de patronato no https://podtag.com.br/apoie e seja um patrão você também!"
                msg.reply(replyPicPay)
                break
            }
        }
        return
    }

    // Swagger !== Suegam
    if (content.toLowerCase().includes('swagger')) {
        const mensagem = `<@${author.id}> você quis dizer: Suegam?`;
        sendMessage({
            content: mensagem
        })
    }
});

bot.on('messageReactionAdd', reaction => {
    if (ligacoesPraPulica.includes(reaction.message.id)) return;

    if (reaction.emoji.toString() === '🚔' && reaction.count === 3) {
        ligacoesPraPulica.push(reaction.message.id)
        setTimeout(() => {
            reaction.message
                .channel
                .sendMessage(`Ow <@${admins.everton}>, chega ae rapidão...`)
                .catch(console.error)
        }, 5 * 1000)
    }
})

function sendMessage({ channelName = 'podtag-bot', content }) {
    bot.channels
        .find(({ name }) => name === channelName)
        .send(content)
        .catch(console.error)
}

function createDmBoasVindas({user}) {
    return `
Seja muito bem vindo(a), <@${user.id}>!

**REGRINHAS BÁSICAS**

1. Bom senso rules. Não menospreze nenhuma classe social, nenhuma raça, cor, credo, gênero, etc. 
2. Traga conteúdo sempre que possível. Se é relevante ou não, a comunidade vai dizer :stuck_out_tongue:
3. Ofensas, por menores que sejam, não serão toleradas. Se recebermos denúncias sobre qualquer podtagger, removeremos o denunciado logo após analisar o caso. 

**NOVIDADES**

1. O canal de voz **<#${channels.diskAmizade}>** fica disponível 24h. Se vc quiser entrar pra trocar uma ideia, fique a vontade. Se estiver sozinho, manda no <#${channels.geral}> que algum host entra lá pra te fazer companhia :heart:
2. O canal <#${channels.zero800}> é destinado a compartilhar coisas free que estão ai nas internetas! Mas conteúdos piratas não rola, bele?
3. Você pode sugerir canais novos. Manda no <#${channels.feedback}> sua sugestão :smiley:`
}

bot.login(token)