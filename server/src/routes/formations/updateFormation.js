const { Formation } = require('../../db/sequelize');
const { ValidationError } = require('sequelize');
const auth = require('../../auth/auth');
  
module.exports = (app) => {
  app.put('/api/formations/:id', auth, (req, res) => {
    const id = req.params.id
    Formation.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
      return Formation.findByPk(id).then(formation => {
        if(formation === null) {
          const message = 'La formation demandée n\'existe pas. Réessayez avec un autre identifiant.';
          return res.status(404).json({message})
        }
        const message = `La formation de ${formation.name} a bien été modifiée.`
        res.json({message, data: formation })
      })
    })
    .catch(error => {
        if(error instanceof ValidationError) {
          return res.status(400).json({ message: error.message, data: error});
        }
        if(error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: error.message, data: error})
        }
      const message = 'La formation n\'a pas pu être modifiée. Réessayez dans quelques instants.'
      res.status(500).json({message, data: error})
    })
  })
}