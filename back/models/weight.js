module.exports = (sequelize, DataTypes) => {
  const Weight = sequelize.define(
    'Weight',
    {
      weight: {
        type: DataTypes.STRING(20),
        allowNull: false
      }
    },
    {
      charset: 'utf8',
      collate: 'utf8_general_ci'
    }
  )

  Weight.associate = db => {
    db.Weight.belongsTo(db.User)
  }

  return Weight
}
