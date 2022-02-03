const { SlashCommandBuilder } =  require ('@discordjs/builders');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('leave')
		.setDescription('play a song from youtube!'),
	async execute(message,params) {
        const {member,client: {distube}} = message;
        distube.voices.get(message)?.leave()
	},
};