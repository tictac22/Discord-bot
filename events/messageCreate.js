
module.exports = {
    name:"messageCreate",
    async execute(message) {
        const prefix = message.content.charAt(0)
        if(prefix !== "?") return 
	    const commandLine = message.content.trim().slice(prefix.length).split(" ")[0].toLowerCase();
        const query = message.content.split (" ")[1];
        
        const command = message.client.commands.get(commandLine);
        if (!command) return;
        try {
            await command.execute(message,query);
        } catch (error) {
            console.error(error);
            await message.reply({ content: 'something went wrong', ephemeral: true });
        }
    }
}