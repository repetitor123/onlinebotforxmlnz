module.exports = async (message) => {
    const { content, client } = message;

    const prefix = client.config.prefix;
    if (!content.startsWith(prefix)) return;

    let args = content.slice(prefix.length).split(' ');

    for (let i = 3; i >= 1; i--) {
        const commandName = args.slice(0, i).join(' ');
        const command = client.commands.find(command => command.options.name === commandName || command.options?.aliases?.includes(commandName));
        if (!command) continue;

        args = args.slice(i);
        if (!message.deleted) await message.delete()
            .catch(e => e);

        await command.execute(message, args);
    }
}