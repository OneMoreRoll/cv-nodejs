const { Experience } = require('../../db/sequelize');
const { ValidationError } = require('sequelize');
const auth = require('../../auth/auth');
  
module.exports = (app) => {
  app.post('/api/experiences', auth, (req, res) => {
    Experience.create(req.body)
      .then(experience => {
        const message = `L'expérience chez ${req.body.company} a bien été créée.`
        res.json({ message, data: experience })
      })
      .catch(error => {
        if(error instanceof ValidationError) {
            return res.status(400).json({ message: error.message, data: error});
        }
        if(error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: error.message, data: error})
        }
        const message = 'L\'expérience n\'a pas pu être ajoutée. Réessayez dans quelques instants.'
        res.status(500).json({message, data: error})
      })
  })
}