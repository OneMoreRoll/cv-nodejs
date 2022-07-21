const { Formation } = require('../../db/sequelize');
const auth = require('../../auth/auth');
  
module.exports = (app) => {
  app.get('/api/formations/:id', auth, (req, res) => {
    Formation.findByPk(req.params.id)
      .then(formation => {
        if(formation === null) {
          const message = 'La formation demandée n\'existe pas. Réessayez avec un autre identifiant.';
          return res.status(404).json({message});
        }
        const message = 'Une formation a bien été trouvée.'
        res.json({ message, data: formation });
      })
      .catch(error => {
        const message = 'La formation n\'a pas pu être récupérée. Réessayez dans quelques instants.';
        res.status(500).json({message, data: error});
      })
  })
}