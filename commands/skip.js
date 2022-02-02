
const { SlashCommandBuilder } =  require ('@discordjs/builders');
module.exports = { 
    data: new SlashCommandBuilder()
		.setName('skip')
        .setDescription('play a song from youtube!'),
    async execute(message,params) {
        const {client:{distube}} = message
        distube.skip(message)
    }
}