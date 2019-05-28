var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

const channelIdBot = '567934005257961498';

// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});

bot.on('ready', function(evt) {
    logger.info(`Connected and logged in as ${bot.username} (${bot.id})`);
    console.log(bot.channels.filter);
    bot.sendMessage({
        to: channelIdBot,
        message: 'Olá mundo! Tô na Arya.'
    });
});

bot.on('message', (user, userID, channelID, message, evt) => {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`

    if (channelID !== channelIdBot) {
        return;
    }

    logger.info(`Mensagem recebida de ${user}!: ${message}`)

    // Comandos
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
            // !ping
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
            break;
            // Just add any case commands if you want to..
         }
         return;
     }
     
     // Swagger !== Suegam
     if (message.toLowerCase().indexOf('swagger') !== -1) {
         bot.sendMessage({
             to: channelID,
             message: `<@${userID}> Você quis dizer: Suegam?`
         })
         return;
     }
});