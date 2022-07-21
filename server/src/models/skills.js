module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Skill', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: "Cette compétence existe déjà." },
        validate: {
          notEmpty: { msg: "Le nom ne peut pas être vide." },
          notNull: { msg: "Le nom est une propriété requise."}
        }
      },
      subject: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "La catégorie ne peut pas être vide." },
          notNull: { msg: "La catégorie est une propriété requise."}
        }
      },
      mastery: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: "Utilisez uniquement des nombres entiers pour la maîtrise de la compétence." },
          notNull: { msg: "La maîtrise est une propriété requise."},
          min: {
            args: [0],
            msg: "La maîtrise ne peut pas être négative."
          }
        }
      }
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    })
}