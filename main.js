import { uptime } from 'os';

const Discord = require('discord.js');
const schedule = require('node-schedule');
const config = require('./config.json');
const db = require('./src/db');
const addcitation = require('./src/commands/addcitations');
const help = require('./src/commands/help');
const tell_citation = require('./src/commands/tellcitation');
const addanniversaire = require('./src/commands/addanniversaire');
const annivlist = require('./src/commands/annivlist');
//const info = require('./src/commands/info');

var bot = new Discord.Client();
var prefix = config.prefix;
/*var upSecs = 0
var upMins = 0
var upHours = 0
var upDays = 0*/

db.init();

bot.login(config.token)
.then(() => {
  console.log('Bot logged in');
  const channel = bot.channels.get(config.channel);
  channel.send("Je suis connecté vous pouvez désormais utiliser mes commandes :-)");

  onLogin();
})
.catch((error) => {
  console.error(error);
});

bot.on('ready', () => {
  bot.user.setPresence({
    game: {
      name: '+help Bot Test',
      type: 0
    }
  });
  console.log("Bot Ready !");


});

function onLogin() {
  var interval = setInterval(tellcitation, 1000 * 60 * 60 * 1);
  tellcitation();

    /*setInterval( function(upTime) {
      upSecs = upSecs + 1
      if (upSecs >= 60) {
        upSecs = 0
        upMins = upMins + 1		
      } 
      if (upMins >= 60) {
        c.setStatus(userstatus, userdisplay)
        upMins = 0
        upHours = upHours + 1
      }
      if (upHours >= 24) {
        upHours = 0
        upDays = upDays + 1
        
      }
      
      
    },1000);*/

  bot.on('message', message => {
    if (!message.content.startsWith(prefix)) return;
    var args = message.content.substring(prefix.length).split(" ");

    if (message.content === prefix + "help") {
      message.delete;  
      help(message);
    }

    switch (args[0].toLowerCase()) {

      case "addcitation":
        message.delete;
        addcitation(db, message);
        break;

      case "tellcitation":
        message.delete;
        const randnum = citation_random();
        tell_citation(db, message, randnum);
        break;

      case "addanniversaire":
        message.delete;
        addanniversaire(db, message);
        break;

      case "annivlist":
        message.delete;
        annivlist(db, message);
        break;

      //case "info":
        message.delete;
        info(message/*, upDays, upHours, upMins, upSecs*/);
        break;
    }

  });
}


function citation_random() {
  const min = Math.ceil(0);
  const max = Math.floor(db.getCountOfCitations());

  return Math.floor(Math.random() * (max - min) + min);
}

function tellcitation() {
  const randnum = citation_random();

  const citation = db.getOneCitationById(randnum);
  const citationValue = citation.citation_value;
  const contributor_citation = citation.citation_contributor;

  console.log(citation);

  const tellcitation_embed = new Discord.RichEmbed()
    .setColor('#D9F200')
    .setImage("https://omnilogie.fr/images/O/e239ced74cfc679e987778a89a95ebe0.jpg")
    .addField("Citation de l'heure :", `${citationValue}`)
    .addField("Contributeur :", `${contributor_citation}`)
    .setTimestamp();

    const channel = bot.channels.get('230688990913757185');
    channel.send(tellcitation_embed)
}

//function upTime() {
  
  //channel.reply("```Uptime actuel: \n"+upDays+" Jour(s) \n"+upHours+" heure(s) \n"+upMins+" Minute(s) \n"+upSecs+" Seconde(s)```")
//}