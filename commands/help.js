const { SlashCommandBuilder } =  require ('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
module.exports = { 
    data: new SlashCommandBuilder()
		.setName('help')
        .setDescription('play a song from youtube!'),
    async execute(message,params) {
        const {client:{commands},channel} = message
        const messageEmbed = new MessageEmbed().setTitle("List of all the commands")
        commands.filter(item=>item.data.name != "help").forEach(({data}) => {
            messageEmbed.addField(capitalizeFirstLetter(data.name),data.description,true)
        })
        channel.send({embeds:[messageEmbed]})
    }
}

const capitalizeFirstLetter  = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}  