/**
 * @instance
 * @param dbId
 * @param dbVal
 * @param {import("sequelize")} sequelize
 * @param {any} models
 * @param {Object.<string, import("sequelize").Model>} appModels
 */
function dbAdapter(dbId, dbVal, sequelize, models, appModels) {
  const guild = models[dbId]['guild'];

  models[dbId].guild_member.removeAttribute('id');

  guild.associate = () => {
    models[dbId].guild_member.belongsTo(models[dbId].characters, {
      foreignKey: 'guid',
      sourceKey: 'guid',
    });
    guild.hasMany(models[dbId].guild_member, {
      targetKey: 'guid',
      foreignKey: 'guildid',
    });

    guild.hasMany(models[dbId].guild_rank, {
      targetKey: 'guildid',
      foreignKey: 'guildid',
    });
    models[dbId].guild_rank.belongsTo(models[dbId].guild_rank, {
      sourceKey: 'guildid',
      foreignKey: 'guildid',
    });

    models[dbId].characters.hasOne(models[dbId].guild_member, {
      foreignKey: 'guid',
      targetKey: 'guid',
    });
    models[dbId].guild_member.belongsTo(models[dbId].characters, {
      foreignKey: 'guid',
      sourceKey: 'guid',
    });
  };
}

/**
 * @param model
 */
function schemaAdapter(model) {
  return null;
}

export {dbAdapter, schemaAdapter};
