const { Skill } = require('../../db/sequelize');
const { ValidationError, UniqueConstraintError } = require('sequelize');
const auth = require('../../auth/auth');
  
module.exports = (app) => {
  app.post('/api/skills', auth, (req, res) => {
    Skill.create(req.body)
      .then(skill => {
        const message = `La compétence ${req.body.name} a bien été créée.`
        res.json({ message, data: skill })
      })
      .catch(error => {
        if(error instanceof ValidationError) {
            return res.status(400).json({ message: error.message, data: error});
        }
        if(error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: error.message, data: error})
        }
        const message = 'La compétence n\'a pas pu être ajoutée. Réessayez dans quelques instants.'
        res.status(500).json({message, data: error})
      })
  })
}