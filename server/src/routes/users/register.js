const { User } = require('../../db/sequelize');
const { ValidationError } = require('sequelize');
  
module.exports = (app) => {
  app.post('/api/users', (req, res) => {
    User.create(req.body)
      .then(user => {
        if(!user) {
          const message = "Le nom est invalide";
          return res.status(401).json({ message, data: error })
        }

        const message = `L'utilisateur ${req.body.username} a bien été créé.`
        res.json({ message, data: user })
      })
      .catch(error => {
        if(error instanceof ValidationError) {
            return res.status(400).json({ message: error.message, data: error});
        }
        if(error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: error.message, data: error})
        }
        const message = 'L\'utilisateur n\'a pas pu être créé. Réessayez dans quelques instants.'
        res.status(500).json({message, data: error})
      })
  })
}