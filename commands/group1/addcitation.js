const Commando = require('discord.js-commando');
const path = require('path');
const { Command } = require('discord.js-commando');
const mysql = require('mysql');



module.exports = class AddCitationCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'addcitation',
            group: 'group1',
            memberName: 'addcitation',
            description: 'Le bot ajoute votre citation à la base de donnée',
            examples: ['addcitation'],
            args: [
                {
                    key: 'citation',
                    prompt: 'quelle est ta citation',
                    type: 'string'
                },
                {
                    key: "donneur",
                    prompt: "qui a ajouté cette citation ?",
                    type: 'user'
                },
                {
                    key: "auteur",
                    prompt: "Qui est a l'origine de la citation ?",
                    type: 'string'
                }
            ]
        });    
    }

    async run(msg, { citation, donneur, auteur }) {
        var connection = mysql.createConnection({
            host: "localhost",
            user: "arthur",
            password: "space",
            database: "papillotebot"
        });
        connection.connect();
       // connection.query('CREATE TABLE IF NOT EXISTS citations(citationid INT NOT NULL AUTO_INCREMENT , citationdesc TEXT NOT NULL,citationauteur TEXT NOT NULL,citationadd TEXT NOT NULL)');
        var info = {
            "citationdesc": citation,
            "citationauteur": auteur,
            "citationadd": donneur
        };

        connection.query("INSERT INTO citations SET ?", info, function(error) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('space');
        })
    }
};