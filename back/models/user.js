module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      userId: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
      },
      nickname: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false
      }
    },
    {
      charset: 'utf8',
      collate: 'utf8-general-ci'
    }
  )

  User.associate = db => {
    db.User.hasMany(db.Post)
    db.User.hasMany(db.Comment)
  }

  return User
}
