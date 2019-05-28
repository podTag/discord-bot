const Discord = require('discord.io');
const { token } = require('./auth.json');

const channelIdBot = '567934005257961498';

// Initialize Discord Bot
const bot = new Discord.Client({ token, autorun: true });

bot.on('ready', evt => {
    console.log(`Connected and logged in as ${bot.username} (${bot.id})`);
    bot.sendMessage({
        to: channelIdBot,
        message: 'Olá mundo! Tô na Arya.'
    });
});

bot.on('message', (user, userID, channelID, message, evt) => {
    // Somente tratar mensagens enviadas ao canal de teste
    if (channelID !== channelIdBot) return;

    console.log(`Mensagem recebida de ${user}: ${message}`)

    // Comandos
    if (message.substring(0, 1) == '!') {
        let args = message.substring(1).split(' ');
        const cmd = args[0];
        args = args.splice(1);

        switch(cmd) {
            // !ping
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: `<@${userID}> Pong!`
                });
            break;
         }
         return;
     }
     
     // Swagger !== Suegam
     if (message.toLowerCase().includes('swagger')) {
         bot.sendMessage({
             to: channelID,
             message: `<@${userID}> Você quis dizer: Suegam?`
         })
         return;
     }
});