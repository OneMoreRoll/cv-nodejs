const { Formation } = require('../../db/sequelize');
const auth = require('../../auth/auth');
  
module.exports = (app) => {
  app.delete('/api/formations/:id', auth, (req, res) => {
    Formation.findByPk(req.params.id).then(formation => {
     if(formation === null) {
      const message = 'La formation n\'existe pas. Réessayez avec un autre identifiant.';
      return res.status(404).json({message})
     }

      const formationDeleted = formation;
      return Formation.destroy({
        where: { id: formation.id }
      })
      .then(_ => {
        const message = `La formation avec l'identifiant n°${formationDeleted.id} a bien été supprimée.`
        res.json({message, data: formationDeleted })
        })
      })
      .catch(error => {
        const message = 'La formation n\'a pas pu être supprimée. Réessayez dans quelques instants.'
        res.status(500).json({message, data: error})
      })
    })
}