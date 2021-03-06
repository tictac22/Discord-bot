
module.exports = {
    name:"messageCreate",
    async execute(message) {
        const {client:{prefix}} = message;
        if(message.member.user.bot) return
        const userPrefix = message.content.charAt(0)
        if(prefix !== userPrefix) return 
        const commandLine = message.content.trim().slice(prefix.length).split(" ")[0].toLowerCase();
        const params = message.content.split(" ").slice(1).join(" ").trim()
        const command = message.client.commands.get(commandLine);
        if (!command) return;
        try {
            await command.execute(message,params);
        } catch (error) {
            const errorMessage = error.message;
            if(errorMessage.match("reading 'id'")) {
                return message.reply({ content: "By this request I didn't find any song, please retry with correct spelling", ephemeral: true });
            }
            message.reply({ content: 'error on bot side, please retry', ephemeral: true });
        }
    }
}