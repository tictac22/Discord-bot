const { MessageEmbed } = require('discord.js');

const botMessage = text => {
    return new MessageEmbed().setTitle(`${text}`)
}
module.exports = botMessage