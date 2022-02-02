
const fs =  require("fs")
const { Client,Intents,Collection  } =  require ("discord.js")
const { DisTube } = require("distube")
const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES], 
})
const {DISCORD_TOKEN } = require('./config.json');
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
})
const status = queue =>
    `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.join(", ") || "Off"}\` | Loop: \`${
        queue.repeatMode ? (queue.repeatMode === 2 ? "All Queue" : "This Song") : "Off"
    }\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``
distube
	.on("playSong", 
		(queue, song) =>queue.textChannel.send(`Playing \`${song.name}\` - \`${song.formattedDuration}\``))
	.on("addSong", 
		(queue, song) => queue.textChannel.send(`Added ${song.name} - \`${song.formattedDuration}\` to the queue`))
    .on("addList", (queue, playlist) =>
		queue.textChannel.send(`Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`))
	.on("error", (textChannel, e) => {
		console.error(e)})
client.distube = distube
client.login(DISCORD_TOKEN)
