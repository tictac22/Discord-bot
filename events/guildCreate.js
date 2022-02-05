module.exports = {
    name:"guildCreate",
    once:true,
    async execute(guild) {
        const [firstKey,secondKey] = guild.channels.cache.keys();
        const channel = guild.channels.cache.get(secondKey)
        channel.send("Hi, I'am Uwu bot. To see all my commands type \`?help\`")
    }
}