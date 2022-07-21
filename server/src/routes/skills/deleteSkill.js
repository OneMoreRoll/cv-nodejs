const { Skill } = require('../../db/sequelize');
const auth = require('../../auth/auth');
  
module.exports = (app) => {
  app.delete('/api/skills/:id', auth, (req, res) => {
    Skill.findByPk(req.params.id).then(skill => {
     if(skill === null) {
      const message = 'La compétence n\'existe pas. Réessayez avec un autre identifiant.';
      return res.status(404).json({message})
     }

      const skillDeleted = skill;
      return Skill.destroy({
        where: { id: skill.id }
      })
      .then(_ => {
        const message = `La compétence avec l'identifiant n°${skillDeleted.id} a bien été supprimée.`
        res.json({message, data: skillDeleted })
        })
      })
      .catch(error => {
        const message = 'La compétence n\'a pas pu être supprimée. Réessayez dans quelques instants.'
        res.status(500).json({message, data: error})
      })
    })
}