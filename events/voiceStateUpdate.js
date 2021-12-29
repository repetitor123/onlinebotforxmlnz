module.exports = async (client, oldState, newState) => {
    const { member: newMember, channel: newChannel } = newState;
    const { member: oldMember, channel: oldChannel } = oldState;

    const member = newMember || oldMember;
    const guild = newState.guild || oldState.guild;

    if (member?.user?.bot || guild.id !== client.config.guildId) return;

    const session = client.voiceSessions.get(member.id);

    if (newChannel && !oldChannel) {
        if (!session) client.voiceSessions.set(member.id, { date: Date.now() });
    } else if (oldChannel && !newChannel) {
        if (session) {
            const online = Math.floor((Date.now() - session.date) / 1000);
            client.voiceSessions.delete(member.id);
            if (online) {
                const [data] = await client.models.users.findOrCreate({ where: { userId: member.id }});
                await client.models.users.update({ online: online + data.online }, { where: { userId: member.id } });
            }
        }
    }
}