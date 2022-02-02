const { SlashCommandBuilder } =  require ('@discordjs/builders');
const { DisTube } = require("distube")
const findVideo = require("../functions/musicYoutube.js")
const botMessage = require("../functions/botMessage.js")
module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('play a song from youtube!'),
	async execute(message,params) {
        const {member,client: {distube}} = message;
        if(!member.voice.channel) return message.reply("you are not in voice channel")
        distube.play(message, "https://www.youtube.com/watch?v=y2u_-QomGXU")
	},
};