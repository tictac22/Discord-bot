const { SlashCommandBuilder } =  require ('@discordjs/builders');
const fetch = require('cross-fetch');
const ytdl = require('ytdl-core');
const { AudioPlayerStatus, StreamType,createAudioPlayer,createAudioResource,joinVoiceChannel} = require('@discordjs/voice');
const { MessageEmbed } = require('discord.js');
const { YTSearcher } = require('ytsearcher');
const searcher = new YTSearcher({
    key: "AIzaSyBnJYIHJjNils-1eKuTcOE4V-Cf5QWy704",
    revealkey: true,
});
//AIzaSyBnJYIHJjNils-1eKuTcOE4V-Cf5QWy704
module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('play a song from youtube!'),
	async execute(message,url) {
        if(!message.member.voice.channel) return message.reply("you are not in voice channel")
        if(message.client.musicQueue.length > 0) return message.client.musicQueue.push(url)
        const connection = joinVoiceChannel({
            channelId: message.member.voice.channelId,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator,
        });
        const linkto = encodeURI(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&key=AIzaSyBnJYIHJjNils-1eKuTcOE4V-Cf5QWy704&q=${url}`)
        const youtubeVideoData = await fetch(linkto)
        const youtubeVideoDataJson = await youtubeVideoData.json()
        const youtubeUrl  = `https://www.youtube.com/watch?v=${youtubeVideoDataJson.items[0].id.videoId}`;
        message.client.voiceConnection = connection
        const musicQueue = message.client.musicQueue
        musicQueue.push(youtubeUrl)
        const player = createAudioPlayer();
        message.client.musicPlayer = player;
        const stream = ytdl(musicQueue[0], { filter: 'audioonly' });
        const resource = createAudioResource(stream, { inputType: StreamType.Arbitrary });
        player.play(resource);
        connection.subscribe(player);
        const botMessage = new MessageEmbed().setTitle(`Now playing: ${(youtubeVideoDataJson.items[0].snippet.title)}`)
        message.channel.send({ embeds: [botMessage] })
        player.on(AudioPlayerStatus.Idle, () => {
            message.client.musicQueue.shift()
            if(message.client.musicQueue.length === 0) return connection.destroy()
            const newMusicQueue = message.client.musicQueue
            const nextStream = ytdl(newMusicQueue[0], { filter: 'audioonly' });
            const nextResource = createAudioResource(nextStream, { inputType: StreamType.Arbitrary });
            player.play(nextResource);
        });
	},
};