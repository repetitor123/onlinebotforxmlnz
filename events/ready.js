module.exports = (client) => {
    console.log(client.user.tag, "authorized");

    const guild = client.guilds.cache.get(client.config.guildId);
    if (!guild) return;

    const usersInVoice = client.utils.usersInVoice(guild);

    usersInVoice.forEach(member =>
        client.voiceSessions.set(member.id, { date: Date.now() })
    );

    setInterval(async () => {
        for (const memberId of client.voiceSessions.keys()) {
            const session = client.voiceSessions.get(memberId);
            if (session) {
                const online = Math.floor((Date.now() - session.date) / 1000);
                session.date = Date.now();
                if (online) {
                    const [data] = await client.models.users.findOrCreate({ where: { userId: memberId }});
                    await client.models.users.update({ online: online + data.online }, { where: { userId: memberId } });
                }
            }
        }
    }, 60000);
}