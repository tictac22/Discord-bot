
const { SlashCommandBuilder } =  require ('@discordjs/builders');
module.exports = { 
    data: new SlashCommandBuilder()
		.setName('skip')
        .setDescription('Skip current playing track'),
    async execute(message,params) {
        const {client:{distube}} = message
        const queue = distube.getQueue(message)
        if(queue.songs.length <= 1) {
            return message.channel.send("No more songs in the queue");
        }
        distube.skip(message)
    }
}