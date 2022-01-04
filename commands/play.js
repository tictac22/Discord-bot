const { SlashCommandBuilder } =  require ('@discordjs/builders');
const ytdl = require('ytdl-core');
const { AudioPlayerStatus, StreamType,createAudioPlayer,createAudioResource,joinVoiceChannel} = require('@discordjs/voice');
const { Player } = require("discord-music-player");
module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('play a song from youtube!'),
	async execute(message,url) {
        if(message.client.musicQueue.length > 0) {
            message.client.musicQueue.push(url)
            console.log("music in quueeue",message.client.musicQueue)
            return
        }
        const connection = joinVoiceChannel({
            channelId: message.member.voice.channelId,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator,
        });
        const musicQueue = message.client.musicQueue
        musicQueue.push(url)
        const player = createAudioPlayer();
        const stream = ytdl(musicQueue[musicQueue.length - 1], { filter: 'audioonly' });
        const resource = createAudioResource(stream, { inputType: StreamType.Arbitrary });
        player.play(resource);
        connection.subscribe(player);
        console.log("musicQueue before",musicQueue)
        player.on(AudioPlayerStatus.Idle, () => {
            console.log("message.client.musicQueue before cleaning",message.client.musicQueue)
            message.client.musicQueue.shift()
            console.log("message.client.musicQueue after cleaning",message.client.musicQueue)
            if(message.client.musicQueue.length === 0) {
                return connection.destroy()
            }
            const newMusicQueue = message.client.musicQueue
            const nextStream = ytdl(newMusicQueue[newMusicQueue.length - 1], { filter: 'audioonly' });
            const nextResource = createAudioResource(nextStream, { inputType: StreamType.Arbitrary });
            player.play(nextResource);
        });
	},
};