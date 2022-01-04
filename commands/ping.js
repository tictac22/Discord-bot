const { SlashCommandBuilder } =  require ('@discordjs/builders');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!').addStringOption(option=> option.setName("url").setDescription("url of youtube music").setRequired(true)),
	async execute(interaction) {
		await interaction.reply("pong!");
	},
};