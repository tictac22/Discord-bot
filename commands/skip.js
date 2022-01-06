
const { SlashCommandBuilder } =  require ('@discordjs/builders');
const ytdl = require('ytdl-core');
const { AudioPlayerStatus, StreamType,createAudioPlayer,createAudioResource,joinVoiceChannel} = require('@discordjs/voice');
const { YTSearcher } = require('ytsearcher');
const { MessageEmbed } = require('discord.js');
const searcher = new YTSearcher({
    key: "AIzaSyBnJYIHJjNils-1eKuTcOE4V-Cf5QWy704",
    revealkey: true,
});
module.exports = { 
    data: new SlashCommandBuilder()
		.setName('skip')
        .setDescription('play a song from youtube!'),
    async execute(message,query) {
        message.client.musicPlayer.stop()
        message.client.musicQueue.shift()
        if(message.client.musicQueue.length === 0) return message.client.voiceConnection.destroy()
        const youtubeVideoData = await ytdl.getInfo(musicQueue[0])
        const botMessage = new MessageEmbed().setTitle(`Now playing: ${(youtubeVideoData.videoDetails.title)}`)
        const stream = ytdl(message.client.musicQueue[0], { filter: 'audioonly' });
        const resource = createAudioResource(stream, { inputType: StreamType.Arbitrary });
        message.client.musicPlayer.play(resource);
        message.channel.send({ embeds: [botMessage] })
        message.client.voiceConnection.subscribe(message.client.musicPlayer);
    }
}