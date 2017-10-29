const Discord = require('discord.io');
const logger = require('winston');
const auth = require('./auth.json');
const moment = require('moment');

// database import
const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});

// database connect
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


// Configure logger settings
// logger.remove(logger.transports.Console);
// logger.add(logger.transports.Console, {
//     colorize: true
// });
// logger.level = 'debug';


// Initialize Discord Bot
const bot = new Discord.Client({
 token: auth.token,
 autorun: true
});


bot.on('ready', function (evt) {
  logger.info('Connected');
  logger.info('Logged in as: ');
  logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
  // console.log({
  //   localStorage
  // })
  // console.log({
  //   user, userID, channelID, message, evt
  // })
  // Our bot needs to know if it will execute a command
  // It will listen for messages that will start with `!`
  if (message.substring(0, 1) == '!') {
    let args = message.substring(1).split(' ');
    const cmd = args[0];

    args = args.splice(1);
    switch(cmd) {
      // !attend
      case 'attend':
        bot.sendMessage({
          to: channelID,
          message: `Greetings ${user}! Let\'s get you checked in...`
        });

        db.find({ _id: userID }, function (err, docs) {
          // docs is an array containing documents Mars, Earth, Jupiter
          // If no document is found, docs is equal to []

          if (docs.length) {
            db.find({ satellites: ['Phobos', 'Deimos'] }, function (err, docs) {
              // docs contains Mars
              const checkins =
              db.update({ _id: userID }, { $set: { 'data.checkins': checkins, "data.red": true } }, {}, function () {
              })
            })
          } else {
            var doc = {
              user,
              _id: userID,
              checkins: [moment()],
            };

            db.insert(doc, function (err, newDoc) {   // Callback is optional
              // newDoc is the newly inserted document, including its _id
              // newDoc has no key called notToBeSaved since its value was undefined
            });
          }
        });

      break;
      // Just add any case commands if you want to..
     }
   }
});


// https://discordapp.com/oauth2/authorize?client_id=371411068523642890&state=15773059ghq9183habn&scope=bot&permissions=0
