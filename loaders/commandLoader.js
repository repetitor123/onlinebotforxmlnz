const colors = require("colors");
const fs = require("fs");

module.exports = async (client) => {
    const commands = fs.readdirSync(process.cwd() + "/commands");
    if (!commands.length) console.log(colors.red("Commands not found"));

    commands.forEach(fileName => {
        const command = require(`../commands/${fileName}`);
        const name = command.options.name;
        client.commands.set(name, command);
    })

    console.log(colors.magenta(client.commands.size), colors.green("commands loaded"));
}