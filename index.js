
const fs =  require("fs")
const { Client,Intents,Collection  } =  require ("discord.js")
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES], })
const {DISCORD_TOKEN } = require('./config.json');
const { Player } = require("discord-music-player");
const player = new Player(client, {
    leaveOnEmpty: false, // This options are optional.
});
client.player = player;
client.commands = new Collection()
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

/*client.once("ready", client => {
	console.log(client.user.tag)
})
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});*/
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}
client.on("messageCreate",async message => {
	const prefix = "?"
		const args = message.content.slice(prefix.length).trim().split(/ +/g);
		console.log(args.join(' '))
        const command = args.shift();
        let guildQueue = message.client.player.getQueue(message.guild.id);

        if(command === 'play') {
            let queue = message.client.player.createQueue(message.guild.id);
            await queue.join(message.member.voice.channelId);
            let song = await queue.play("https://www.youtube.com/watch?v=aQXV92_1UwM").catch(_ => {
                if(!guildQueue)
                    queue.stop();
            });
	}
})
client.login(DISCORD_TOKEN)
