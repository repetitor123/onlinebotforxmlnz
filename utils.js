module.exports = class Utils {
    static convertSecTime(seconds, pad = false, needDays = true) {
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);
        let days = Math.floor(hours / 24);

        seconds = Math.floor((seconds % 3600) % 60);
        minutes = Math.floor(minutes % 60);
        if (pad && needDays) hours = Math.floor(hours % 24);

        return pad ?
            {
                days: `**${days}** д.`,
                hours: `**${hours}** ч.`,
                minutes: `**${minutes}** м.`,
                seconds: `**${seconds}** с.`
            } :
            (hours  ? `**${hours}**ч. `    : "") +
            (minutes ? `**${minutes}**м. ` : "") +
            (seconds ? `**${seconds}**с.`  : "");
    }

    static usersInVoice(guild) {
        return _.flatten(guild.channels.cache
            .filter(ch => ch.type === "GUILD_VOICE")
            .map(ch => ch.members.map(m => m)));
    }

    static randomHex() {
        return '#' + Math.random().toString(16).slice(2, 8);
    }
}