const { Skill } = require('../../db/sequelize');
const auth = require('../../auth/auth');
  
module.exports = (app) => {
  app.get('/api/skills/:id', auth, (req, res) => {
    Skill.findByPk(req.params.id)
      .then(skill => {
        if(Skill === null) {
          const message = 'La compétence demandée n\'existe pas. Réessayez avec un autre identifiant.';
          return res.status(404).json({message});
        }
        const message = 'Une compétence a bien été trouvée.'
        res.json({ message, data: skill });
      })
      .catch(error => {
        const message = 'La compétence n\'a pas pu être récupérée. Réessayez dans quelques instants.';
        res.status(500).json({message, data: error});
      })
  })
}