
const fs =  require("fs")
const { Client,Intents,Collection  } =  require ("discord.js")
const { DisTube } = require("distube")
const { SpotifyPlugin } = require("@distube/spotify")
const {DISCORD_TOKEN,SPOTIFY_CLIENT_ID,SPOTIFY_CLIENT_SECRET } = require('./config.json');

const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES], 
})

client.commands = new Collection()
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}
const distube = new DisTube(client, {
	searchSongs: 10,
	searchCooldown: 30,
	leaveOnEmpty: false,
	leaveOnFinish: false,
	leaveOnStop: false,
	plugins: [new SpotifyPlugin({
		parallel: true,
		emitEventsAfterFetching: false,
		api: {
			clientId: SPOTIFY_CLIENT_ID,
			clientSecret: SPOTIFY_CLIENT_SECRET,
		},
	})]
})
distube
	.on("playSong", 
		(queue, song) =>queue.textChannel.send(`Playing \`${song.name}\` - \`${song.formattedDuration}\``))
	.on("addSong", 
		(queue, song) => queue.textChannel.send(`Added ${song.name} - \`${song.formattedDuration}\` to the queue`))
	.on("addList", (queue, playlist) => {
		queue.textChannel.send(`${playlist.name} was added to the queue`)	
	})
	.on("error", (textChannel, e) => {
		console.error(e)})
client.distube = distube
client.login(DISCORD_TOKEN)
