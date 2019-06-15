var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', function (user, userID, channelID, message, evt) {
    //Checking if is bot himself
    if (userID == 584567403166433280) {
        return;
    }
    //DA prefix
    if (message.substring(0, 1) == '=') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
            case 'blubbadoo':
                bot.sendMessage({
                    to: channelID,
                    message: 'BLUBBADOO!'
                })
                break;
            case 'ping':
                bot.sendMessage({
                    to:channelID,
                    message: '<@' + userID + '>'
                })
                break;
            case 'send':
                    bot.sendMessage({
                        to:args[1],
                        message: args[0]
                    })
                break;
            case 'gimmeAdmin':
                bot.sendMessage({
                    to:channelID,
                    message: 'Failed to run process. \n Error al ejecutar el proceso. \n 无法运行进程. \n \
                    Het proces is mislukt. \n \
                    Deficio currere processus. \n プロセスを実行できませんでした'
                })
                break;

            case 'kick':
                bot.sendMessage({
                    to:channelID,
                    message: "Failed to kick. \n ```Reason: Permission Error```"
                })
                break;
            case 'ban':
                bot.sendMessage({
                    to:channelID,
                    message: "Failed to Ban. \n ```Reason: Permission Error```"
                })
                break;
            // More case commands above
         }
     } else if ((message.substring(0,5) == 'henlo') || (message.substring(0,5) == 'hello')){
        bot.sendMessage({
            to:channelID,
            message: 'Henlo!'
        })
     } else if (message == 'blubbadoo') {
         bot.sendMessage({
             to:channelID,
             message: 'Blubbadoo!'
         })
     } else if (message.substring(0,4) == 'warn') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
        args = args.splice(1);
        
        //18 neumerals

        if (!(args[0].length == 18)) {
            bot.sendMessage({
                to:channelID,
                message: 'Failed to warn user. \n ```Reason: Invalid Argument.```'
            })

            return;
        }

         bot.sendMessage({
             to:channelID,
             message: '<@' + args[0] + '>' + ' has been warned. \n ```Reason: ' + args[1] + ' ```'
         })
     } else if (message.substring(0,3) == 'tis') {
         bot.sendMessage({
             to:channelID,
             message: 'Yos!'
         })
     }
});

//Invite code: https://discordapp.com/oauth2/authorize?&client_id=584567403166433280&scope=bot&permissions=8