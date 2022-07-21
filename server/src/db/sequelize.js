const { Sequelize, DataTypes } = require('sequelize');

const ExperienceModel = require('../models/experiences');
const FormationModel = require('../models/formations');
const SkillModel = require('../models/skills');
const UserModel = require('../models/user');

const experiences = require('./experiences');
const formations = require('./formations');
const skills = require('./skills');
const bcrypt = require('bcrypt');
  
const sequelize = new Sequelize('cv', 'root', '', {
  host: 'localhost',
  dialect: 'mariadb',
  dialectOptions: {
    timezone: 'Etc/GMT-2',
  },
  logging: false
});
  
const Experience = ExperienceModel(sequelize, DataTypes);
const Formation = FormationModel(sequelize, DataTypes);
const Skill = SkillModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);
  
const initDb = () => {
  return sequelize.sync({force: true}).then(_ => {
    experiences.map(experience => {
      Experience.create({
        job: experience.job,
        company: experience.company,
        environment: experience.environment,
        duration: experience.duration,
        year: experience.year,
        tasks: experience.tasks,
        softwares: experience.softwares
      }).then(experience => console.log(experience.toJSON()));
    });

    formations.map(formation => {
        Formation.create({
            name: formation.name,
            option: formation.option,
            place: formation.place,
            logo: formation.logo,
            degree: formation.degree,
            firstyear: formation.firstyear,
            lastyear: formation.lastyear
        }).then(formation => console.log(formation.toJSON()));
    });

    skills.map(skill => {
      Skill.create({
          name: skill.name,
          subject: skill.subject,
          mastery: skill.mastery
      }).then(skill => console.log(skill.toJSON()));
    });

    // Test temporaire d'initialisation d'un utilisateur
    bcrypt.hash('test1234', 10)
    .then(hash => User.create({ username: 'Gauthier', password: hash }))
    .then(user => console.log(user.toJSON()));

    console.log('La base de données a bien été initialisée !');
  })
}
  
module.exports = { 
  initDb, Experience, Formation, Skill, User
}