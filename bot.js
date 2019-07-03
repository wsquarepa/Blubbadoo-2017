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
    //Checking if it is bot himself
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
                    fs.readFile("warnings.txt", function(err, buf) {
                        var hashcode = buf.toString()
                        var userWarnings = hashcode.split('\n')
                        
                        console.log(hashcode.toString())
                        console.log('userWarningsAndNumber = ' + userWarnings)

                        var len = userWarnings.length
                        var occurences = 0

                        for (i = 1; i <= len; i++) {
                            if (userWarnings[i] == userID){
                                occurences++
                            }
                        }
                        console.log(occurences.toString())
                        if (occurences > 0) {
                            bot.sendMessage({
                                to:channelID,
                                message: 'You have ' + occurences.toString() + ' warnings.'
                            })
                        } else {
                            bot.sendMessage({
                                to:channelID,
                                message: 'You have no warnings.'
                            })
                        }
                    });
                
                break;
            case 'warn':
                    bot.sendMessage({
                        to:channelID,
                        message: 'Did you mean '
                    })
                    
                    bot.sendMessage({
                        to:channelID,
                        message: 'warn ' + args[0] + ' ' + args[1]
                    })
                

                break;

            case 'logo':
                bot.sendMessage({
                    to:channelID,
                    message: 'https://cdn.discordapp.com/attachments/594272503837229092/594272672700170268/Drawing.png'
                })
                break;
            
            case 'clearWarnings':
                if (userID == 509874745567870987) {
                    fs.writeFile("warnings.txt", (""), (err) => {
                        if (err || args[0] != null) { 
                            bot.sendMessage({
                                to:channelID,
                                message: ':x: An error occured.'
                            })
                        } else {
                            bot.sendMessage({
                                to:channelID,
                                message: ':white_check_mark: Cleared!'
                            })
                        }
                    });
            
                }
                break;
            // More case commands above
         }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////// {Non case items} /////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
     } else if ((message.substring(0,5) == 'henlo') || (message.substring(0,5) == 'hello')){
        bot.sendMessage({
            to:channelID,
            message: 'Henlo!'
        })
///////////////////////////////////                      ////////////////////////////////////////////////////
    
     } else if (message == 'Blubbadoo') {
         bot.sendMessage({
             to:channelID,
             message: 'Blubbadoo!'
         })
//////////////////////////////////                      //////////////////////////////////////////////////////
        
     } else if (message.substring(0,4) == 'warn') {
            var args = message.substring(1).split(' ');
            var cmd = args[0];
            
            if (args[1] != null) {
                args = args.splice(1);
                
                //18 neumerals
                // if (message.member.hasPermission("ADMINISTRATOR")) {
                //     console.log("User allowed")

                    if (!(args[0].length == 18) && (1 == 1)) {
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

                    var reason = args[1]

                    if (args[2] != null) {
                        for (i = 2; i < args.length; i++) {
                            reason += ' ' + args[i]
                        }
                    }

                    bot.sendMessage({
                        to:channelID,
                        message: '<@' + args[0] + '>' + ' has been warned. \n ```Reason: ' + reason + ' ``` \n To \
                        see how many warnings you have, use the =warnings command.'
                    })

                    var warnedUser = args[0];

                    fs.appendFile("warnings.txt", (warnedUser + '\n'), (err) => {
                        if (err) console.log(err);
                        console.log("Successfully Written to File.");
                    });
                // }
            }
///////////////////////////////////////////                           //////////////////////////////////////////////////

     } else if (message.substring(0,3) == 'tis') {
         bot.sendMessage({
             to:channelID,
             message: 'Yos!'
         })
     }
});

//Invite code: https://discordapp.com/oauth2/authorize?&client_id=584567403166433280&scope=bot&permissions=8