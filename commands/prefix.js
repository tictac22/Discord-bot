const { SlashCommandBuilder } =  require ('@discordjs/builders');
const botMessage = require('../functions/botMessage');
const { Permissions } = require('discord.js');
module.exports = { 
    data: new SlashCommandBuilder()
		.setName('prefix')
        .setDescription('Changing a prefix'),
    async execute(message,params) {
        const {client,channel,member} = message
        if(params.length > 2) {
            return channel.send("Too long prefix, it should be less than 2 symbols")
        }
        const memberPermisions = new Permissions(member.permissions.bitfield)
        if (!memberPermisions.has(Permissions.FLAGS.MANAGE_CHANNELS)) {
            return message.reply({content:"You don't have permmisions"})
        }
        const prevPrefix = client.prefix
        client.prefix = params
        channel.send({embeds:[botMessage(`prefix \`${prevPrefix}\` was changed on \`${params}\``)]})
    }
}