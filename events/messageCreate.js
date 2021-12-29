const commandHandler = require("../handlers/commandHandler");

module.exports = async (client, message) => {
    const { guild, channel, author } = message;

    if (channel.type === "DM" || author.bot) return;
    if (guild?.id !== client.config.guildId) return;
    await commandHandler(message);
}