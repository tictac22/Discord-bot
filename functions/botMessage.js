const { MessageEmbed } = require('discord.js');

module.exports = text => {
    return new MessageEmbed().setTitle(`${text}`)
}