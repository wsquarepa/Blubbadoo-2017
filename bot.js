var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var fs = require("fs")
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
    if (userID == 584567403166433280 && message.substring(0,4) == 'warn') {
        
    } else if (userID == 584567403166433280){
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
            case 'warnings':
                if (userID == 509874745567870987) {
                    fs.readFile("warnings.txt", function(err, buf) {
                        var hashcode = buf.toString()
                        var userWarnings = {}

                        var user = 0
                        var warnings = 0

                        for (item in hashcode) {
                            user, warnings = item.split(':')
                            userWarnings[user] = warnings
                        }

                        bot.sendMessage({
                            to:channelID,
                            message: 'You have ' + userWarnings[userID] + ' warnings.'
                        })
                    });
                } else {
                    bot.sendMessage({
                        to:channelID,
                        message: "<@" + userID + ">, you can't use that."
                    })
                }
                break;
            case 'warn':
                if (userID == 509874745567870987) {
                    bot.sendMessage({
                        to:channelID,
                        message: 'Did you mean '
                    })
                    bot.sendMessage({
                        to:channelID,
                        message: 'warn ' + args[0] + ' ' + args[1]
                    })
                } else {
                    bot.sendMessage({
                        to:channelID,
                        message: "<@" + userID + ">, you can't use that."
                    })
                }

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
     } else if (message.substring(0,5) == 'warn ') {
        if (userID == 509874745567870987) {
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

            var users = {}

            fs.readFile("warnings.txt", function(err, buf) {
                var hashcode = buf.toString()
                users = hashcode.split('\n')
            });

            console.log(users);

            bot.sendMessage({
                to:channelID,
                message: '<@' + args[0] + '>' + ' has been warned. \n ```Reason: ' + args[1] + ' ```'
            })

            var warnedUser = args[0];

            fs.appendFile("warnings.txt", (warnedUser + ':' + args[1] + '\n'), (err) => {
                if (err) console.log(err);
                console.log("Successfully Written to File.");
            });
        } else {
            bot.sendMessage({
                to:channelID,
                message: "<@" + userID + ">, you can't use that."
            })
        }

     } else if (message.substring(0,3) == 'tis') {
         bot.sendMessage({
             to:channelID,
             message: 'Yos!'
         })
     }
});

//Invite code: https://discordapp.com/oauth2/authorize?&client_id=584567403166433280&scope=bot&permissions=8