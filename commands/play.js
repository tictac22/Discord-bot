const { SlashCommandBuilder } =  require ('@discordjs/builders');
const ytdl = require('ytdl-core');
const { AudioPlayerStatus, StreamType,createAudioPlayer,createAudioResource,joinVoiceChannel} = require('@discordjs/voice');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('play a song from youtube!'),
	async execute(message,url,line) {
        //console.log(message.member.voice.id)
        //console.log(message.guildId)
        /*const connection = joinVoiceChannel({
            channelId: message.member.voice.channelId,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator,
        });
        const stream = ytdl('https://www.youtube.com/watch?v=yIbmmBGOAO4', { filter: 'audioonly' });
        const resource = createAudioResource(stream, { inputType: StreamType.Arbitrary });
        const player = createAudioPlayer();

        player.play(resource);
        connection.subscribe(player);
        player.on(AudioPlayerStatus.Idle, () => connection.destroy());*/
        const prefix = "?"
        const args = line.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift();
        let guildQueue = message.client.player.getQueue(message.guild.id);

        if(command === 'play') {
            let queue = message.client.player.createQueue(message.guild.id);
            await queue.join(message.member.voice.channel);
            let song = await queue.play(args.join(' ')).catch(_ => {
                if(!guildQueue)
                    queue.stop();
            });
        }
	},
};