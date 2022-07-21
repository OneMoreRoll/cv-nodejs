const { Experience } = require('../../db/sequelize');
const auth = require('../../auth/auth');
  
module.exports = (app) => {
  app.get('/api/experiences/:id', auth, (req, res) => {
    Experience.findByPk(req.params.id)
      .then(experience => {
        if(experience === null) {
          const message = 'L\'expérience demandée n\'existe pas. Réessayez avec un autre identifiant.';
          return res.status(404).json({message});
        }
        const message = 'Une expérience a bien été trouvée.'
        res.json({ message, data: experience });
      })
      .catch(error => {
        const message = 'L\'expérience n\'a pas pu être récupérée. Réessayez dans quelques instants.';
        res.status(500).json({message, data: error});
      })
  })
}