const { SlashCommandBuilder } = require("@discordjs/builders")
const getMusicInfo = require("../functions/getMusic.js")
module.exports = {
	data: new SlashCommandBuilder()
		.setName("play")
		.setDescription("playing a commissioned music or playlist from youtube or spotify"),
	async execute(message, params) {
		const {
			member,
			client: { distube },
		} = message
		if (!member.voice.channel) return message.reply("you are not in voice channel")
		const { link } = await getMusicInfo(params)
		distube.play(message.member.voice.channel, `${link}`, {
			textChannel: message.channel,
		})
	},
}
