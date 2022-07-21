const { Skill } = require('../../db/sequelize');
const { ValidationError } = require('sequelize');
const auth = require('../../auth/auth');
  
module.exports = (app) => {
  app.put('/api/skills/:id', auth, (req, res) => {
    const id = req.params.id
    Skill.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
      return Skill.findByPk(id).then(skill => {
        if(skill === null) {
          const message = 'La compétence demandée n\'existe pas. Réessayez avec un autre identifiant.';
          return res.status(404).json({message})
        }
        const message = `La compétence de ${skill.name} a bien été modifiée.`
        res.json({message, data: skill })
      })
    })
    .catch(error => {
        if(error instanceof ValidationError) {
          return res.status(400).json({ message: error.message, data: error});
        }
        if(error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: error.message, data: error})
        }
      const message = 'La compétence n\'a pas pu être modifiée. Réessayez dans quelques instants.'
      res.status(500).json({message, data: error})
    })
  })
}