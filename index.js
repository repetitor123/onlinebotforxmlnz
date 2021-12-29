const { Client, Intents, Collection, Permissions } = require("discord.js");
const config = require("./config");
global['_'] = require("lodash");
global['Permissions'] = Permissions;

const commandLoader = require("./loaders/commandLoader");
const eventLoader = require("./loaders/eventLoader");

const client = new Client({
    intents: [
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS
    ]
});

client.models = {
    users: require("./models/users")
};

client.config = config;
client.utils = require("./utils");

client.voiceSessions = new Collection();
client.commands = new Collection();

(async () => {
    await commandLoader(client);
    await eventLoader(client);
})()

client.login(config.token)