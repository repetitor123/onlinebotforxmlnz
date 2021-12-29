const fs = require("fs/promises");
const colors = require("colors");

module.exports = async (client) => {
    let events = await fs.readdir(process.cwd() + "/events");
    events = events.filter((eventName) => eventName.endsWith("js"));
    if (!events.length) throw console.log(colors.red("Events not found"));

    events.forEach((eventName) =>
        client.on(eventName.split('.').shift(), require(process.cwd() + "/events/" + eventName).bind(null, client))
    )
}