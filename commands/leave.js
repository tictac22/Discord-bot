const { SlashCommandBuilder } =  require ('@discordjs/builders');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('leave')
		.setDescription('Bot stops playing music'),
	async execute(message,params) {
		const {member,client: {distube}} = message;
		console.log(member.permissions)
        distube.voices.get(message)?.leave()
	},
};