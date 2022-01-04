
module.exports = {
    name:"voiceStateUpdate",
    async execute(oldState,newState) {
        if(!oldState.channelId || !newState.member.user.bot) return 
        newState.guild.client.musicQueue = []
    }
}