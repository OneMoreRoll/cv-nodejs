module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Experience', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      job: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Le travail ne peut pas être vide." },
          notNull: { msg: "Le travail est une propriété requise."}
        }
      },
      company: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Le nom de l'entreprise ne peut pas être vide." },
          notNull: { msg: "Le nom de l'entreprise est une propriété requise."}
        }
      },
      environment: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "L'environnement ne peut pas être vide." },
          notNull: { msg: "L'environnement est une propriété requise."}
        }
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "L'année est une propriété requise."}
        }
      },
      duration: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          isDecimal: {msg: "Utilisez uniquement des nombres, entiers ou non pour la durée de l'expérience."},
          notNull: { msg: "La maîtrise est une propriété requise."},
          min: {
            args: [0],
            msg: "La maîtrise ne peut pas être négative."
          }
        }
      },
      tasks: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
            return this.getDataValue('tasks').split(',')
          },
          set(tasks) {
            this.setDataValue('tasks', tasks.join())
          },
        validate: {
          isTasksValid(value) {
            if(!value) {
              throw new Error('Une expérience doit être décrite par au moins une mission.')
            }
            if(value.split(',').length > 5) {
              throw new Error('Une expérience ne peut pas avoir plus de cinq missions.')
            }
          }
        }
      },
      softwares: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          return this.getDataValue('softwares').split(',')
        },
        set(softwares) {
          this.setDataValue('softwares', softwares.join())
        },
        validate: {
          isSoftwaresValid(value) {
            if(!value) {
              throw new Error('Une expérience doit être définie par au moins une technique ou logiciel.')
            }
            if(value.split(',').length > 10) {
              throw new Error('Une expérience ne peut pas avoir plus de dix techniques ou logiciels.')
            }
          }
        }
      }
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    })
}