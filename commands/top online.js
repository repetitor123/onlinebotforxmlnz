const Op = require("sequelize").Op;

module.exports.execute = async (message, args) => {
    const {client, channel, guild, author } = message;

    const data = await client.models.users.findAll({
        where: {
          online: {
              [Op.gt]: 0
          }
        },
        order: [
            ['online', 'DESC']
        ],
        limit: 10
    });

    channel.send({
        embeds: [
            {
                color: client.utils.randomHex(),
                title: 'ТОП-10 голосового онлайна',
                description: data.map((item, index) => {
                   const user = guild.members.cache.get(item.userId);
                   const time = item.online ? client.utils.convertSecTime(item.online) : 0;
                   return `**#${index+1}** ${user || item.userId} - ${time}`
                }).join('\n'),
                footer: {
                    iconURL: author.displayAvatarURL({ dynamic: true }),
                    text: `Выполнил(а) ${author.tag}`
                }
            }
        ]
    })
}

module.exports.options = {
    name: "top online",
    aliases: ["топ онлайн","vtop","voicetop"]
}