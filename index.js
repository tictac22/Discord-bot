const dotenv =  require("dotenv").config()
const fs =  require("fs")

const { Client,Intents,Collection  } =  require ("discord.js")


const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES], })
client.once('ready', () => {
    console.log('Ready!');
});
/*client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}*/
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'server') {
		await interaction.reply('Server info.');
	} else if (commandName === 'user') {
		await interaction.reply('User info.');
	}
});
client.login(process.env.DISCORD_TOKEN)
