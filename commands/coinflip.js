
const { SlashCommandBuilder } =  require ('@discordjs/builders');
module.exports = { 
    data: new SlashCommandBuilder()
		.setName('coinflip')
        .setDescription('Flip a coin'),
    async execute(message,params) {
        const {channel} = message;
        const side = Math.random() > 0.5 ? "heads" : "tails"
        channel.send(`I flipped a coin and it landed on \`${side}\``)
    }
}