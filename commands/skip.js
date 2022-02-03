
const { SlashCommandBuilder } =  require ('@discordjs/builders');
module.exports = { 
    data: new SlashCommandBuilder()
		.setName('skip')
        .setDescription('play a song from youtube!'),
    async execute(message,params) {
        const {client:{distube}} = message
        const queue = distube.getQueue(message)
        if(queue.songs.length <= 1) {
            return message.channel.send("This is the last song in the queue");
        }
        distube.skip(message)
    }
}