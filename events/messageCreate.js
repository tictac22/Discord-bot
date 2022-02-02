
module.exports = {
    name:"messageCreate",
    async execute(message) {
        if(message.member.user.bot) return
        const prefix = message.content.charAt(0)
        if(prefix !== "?") return 
	    const commandLine = message.content.trim().slice(prefix.length).split(" ")[0].toLowerCase();
        const params = message.content.split(" ").slice(1).join(" ").trim()
        const command = message.client.commands.get(commandLine);
        if (!command) return;
        try {
            await command.execute(message,params);
        } catch (error) {
            console.error(error);
            await message.reply({ content: 'something went wrong', ephemeral: true });
        }
    }
}