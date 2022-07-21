const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const sequelize = require('./src/db/sequelize');
const nodemailer = require('nodemailer');

require("dotenv").config();

const app = express();
const port = 3001;

app
    .use(morgan('dev'))
    .use(bodyParser.json());

// Import de la base de données initialisée dans le fichier db/sequelise.js
sequelize.initDb();

// Routes
require('./src/routes/experiences/findAllExperiences')(app);
require('./src/routes/formations/findAllFormations')(app);
require('./src/routes/skills/findAllSkills')(app);
require('./src/routes/users/findAllUsers')(app);

require('./src/routes/experiences/findExperienceByPk')(app);
require('./src/routes/formations/findFormationByPk')(app);
require('./src/routes/skills/findSkillByPk')(app);

require('./src/routes/experiences/createExperience')(app);
require('./src/routes/formations/createFormation')(app);
require('./src/routes/skills/createSkill')(app);
require('./src/routes/users/register')(app);

require('./src/routes/experiences/updateExperience')(app);
require('./src/routes/formations/updateFormation')(app);
require('./src/routes/skills/updateSkill')(app);

require('./src/routes/experiences/deleteExperience')(app);
require('./src/routes/formations/deleteFormation')(app);
require('./src/routes/skills/deleteSkill')(app);

require('./src/routes/users/login')(app);

// Intégration de mailtrap
const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "0acb0c7836d005",
    pass: "7c4fe3e3f1be9b"
  }
});

// Vérification de la connexion
transporter.verify(function(error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Le serveur est prêt à recevoir des messages.");
  }
});

// Requête POST envoyant un mail quand le formulaire est soumis côté front
app.post('/send', (req, res, next) => {
  let name = req.body.name
  let email = req.body.email
  let subject = req.body.subject
  let message = req.body.message

  let mail = {
    from: email,
    to: 'test@test.com',
    subject: subject,
    text: message
  }

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        status: 'fail'
      })
    } else {
      res.json({
       status: 'success'
      })
    }
  })
})

// Première requête du projet, affichée sur la page d'accueil
app.get("/api", (req, res) => {
    res.json({ message: "Bienvenue sur le CV de Gauthier Delhaye !" });
  });

// Erreur 404
app.use(({res}) => {
  const message = "Impossible de trouver la ressource demandée, veuillez essayer une autre URL.";
  res.status(404).json({message});
})

app.listen(port, () => console.log(`The server is running on: http://localhost:${port}`));