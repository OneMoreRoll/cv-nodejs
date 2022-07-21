const { Experience } = require('../../db/sequelize');
const auth = require('../../auth/auth');
  
module.exports = (app) => {
  app.delete('/api/experiences/:id', auth, (req, res) => {
    Experience.findByPk(req.params.id).then(experience => {
     if(experience === null) {
      const message = 'L\'expérience n\'existe pas. Réessayez avec un autre identifiant.';
      return res.status(404).json({message})
     }

      const experienceDeleted = experience;
      return Experience.destroy({
        where: { id: experience.id }
      })
      .then(_ => {
        const message = `L\'expérience avec l'identifiant n°${experienceDeleted.id} a bien été supprimée.`
        res.json({message, data: experienceDeleted })
        })
      })
      .catch(error => {
        const message = 'L\'expérience n\'a pas pu être supprimée. Réessayez dans quelques instants.'
        res.status(500).json({message, data: error})
      })
    })
}