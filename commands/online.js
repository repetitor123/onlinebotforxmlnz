module.exports.execute = async (message, args) => {
    const {client, channel, guild, member, mentions, author } = message;

    const target = mentions.members.first() || guild.members.cache.get(args[0]);
    const selected = target || member;

    const session = client.voiceSessions.get(selected.id);
    if (session) {
        const online = Math.floor((Date.now() - session.date) / 1000);
        session.date = Date.now();
        if (online) {
            const [data] = await client.models.users.findOrCreate({ where: { userId: selected.id }});
            await client.models.users.update({ online: online + data.online }, { where: { userId: selected.id } });
        }
    }

    const [data] = await client.models.users.findOrCreate({ where: { userId: selected.id }});

    const time = data.online ? client.utils.convertSecTime(data.online) : 0;

    channel.send({
        embeds: [
            {
                color: client.utils.randomHex(),
                title: target ? `Голосовой онлайн | ${selected.user.tag}` : `Ваш голосовой онлайн`,
                thumbnail: author.displayAvatarURL({ dynamic: true }),
                description: time,
                footer: {
                    iconURL: author.displayAvatarURL({ dynamic: true }),
                    text: `Выполнил(а) ${author.tag}`
                }
            }
        ]
    })
}

module.exports.options = {
    name: "online",
    aliases: ["онлайн"]
}