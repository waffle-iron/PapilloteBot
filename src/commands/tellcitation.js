const Discord = require('discord.js');

const tell_citation = (db, message, randnum) => {
        console.log(randnum);
        const citation = db.getOneCitationById(randnum);
        console.log(citation);


        var tellcitation_embed = new Discord.RichEmbed()
          .setColor('#D9F200')
          .setImage("https://omnilogie.fr/images/O/e239ced74cfc679e987778a89a95ebe0.jpg")
          .addField("Citation :", `${citation.citation_value}`)
          .addField("Contributeur :", `${citation.citation_contributor}`)
          .setTimestamp();
          
        message.channel.send(tellcitation_embed)

        console.log(tellcitation_embed)
}

module.exports = tell_citation;