module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Formation', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: "Cette formation existe déjà." },
        validate: {
          notEmpty: { msg: "Le nom ne peut pas être vide." },
          notNull: { msg: "Le nom est une propriété requise."}
        }
      },
      option: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      place: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Le lieu de la formation ne peut pas être vide." },
          notNull: { msg: "Le lieu de la formation est une propriété requise."}
        }
      },
      logo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Le logo ne peut pas être vide." },
          notNull: { msg: "Le logo est une propriété requise."}
        }
      },
      degree: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Le niveau d'étude ne peut pas être vide." },
          notNull: { msg: "Le niveau d'étude est une propriété requise."}
        }
      },
      firstyear: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: "Utilisez uniquement des nombres entiers pour l'année d'entrée." },
          notNull: { msg: "L'année d'entrée est une propriété requise."},
          min: {
            args: [1996],
            msg: "L'année d'entrée ne peut pas être inférieure à 1996. Je n'étais pas né !"
          }
        }
      },
      lastyear: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: "Utilisez uniquement des nombres entiers pour l'année de sortie." },
          notNull: { msg: "L'année de sortie est une propriété requise."},
          min: {
            args: [1996],
            msg: "L'année de sortie ne peut pas être inférieure à 1996. Je n'étais pas né !"
          }
        }
        
      },
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    })
}