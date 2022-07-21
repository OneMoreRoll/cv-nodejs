const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            msg: 'Ce nom est déjà pris.'
        },
        validate: {
          notEmpty: { msg: "Le nom ne peut pas être vide." },
          notNull: { msg: "Le nom est une propriété requise."}
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Le mot de passe ne peut pas être vide." },
          notNull: { msg: "Le mot de passe est une propriété requise."},
          len: { 
            args: [8, 60],
            msg: "Le mot de passe doit faire entre 8 et 60 caractères."
         }
        }
      }
    }, {
      hooks: {
        beforeCreate: async (user, options) => {
          let salt = await bcrypt.genSalt(10)
          let hash = await bcrypt.hash(user.password, salt)
          user.password = hash;
        }
      }
    })
  }