const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = { 
    data: new SlashCommandBuilder()
		.setName('queue')
        .setDescription('List the music in the queue'),
    async execute(message,params) {
        const {client:{distube}} = message
        const queue = distube.getQueue(message)
        if (!queue) {
            message.channel.send("Nothing playing right now!")
        } else {
            message.channel.send(
                `Current queue:\n${queue.songs
                    .map((song, id) => `**${id ? id : "Playing"}**. ${song.name} - \`${song.formattedDuration}\``)
                    .slice(0, 10)
                    .join("\n")}`
            )
        }
    }
}