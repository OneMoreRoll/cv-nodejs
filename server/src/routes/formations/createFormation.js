const { Formation } = require('../../db/sequelize');
const { ValidationError } = require('sequelize');
const auth = require('../../auth/auth');
  
module.exports = (app) => {
  app.post('/api/formations', auth, (req, res) => {
    Formation.create(req.body)
      .then(formation => {
        const message = `La formation de ${req.body.name} a bien été créée.`
        res.json({ message, data: formation })
      })
      .catch(error => {
        if(error instanceof ValidationError) {
            return res.status(400).json({ message: error.message, data: error});
        }
        if(error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: error.message, data: error})
        }
        const message = 'La formation n\'a pas pu être ajoutée. Réessayez dans quelques instants.'
        res.status(500).json({message, data: error})
      })
  })
}