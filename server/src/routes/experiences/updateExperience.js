const { Experience } = require('../../db/sequelize');
const { ValidationError } = require('sequelize');
const auth = require('../../auth/auth');

module.exports = (app) => {
  app.put('/api/experiences/:id', auth, (req, res) => {
    const id = req.params.id
    Experience.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
      return Experience.findByPk(id).then(experience => {
        if(experience === null) {
          const message = 'L\'expérience demandée n\'existe pas. Réessayez avec un autre identifiant.';
          return res.status(404).json({message})
        }
        const message = `L'expérience chez ${experience.company} a bien été modifiée.`
        res.json({message, data: experience })
      })
    })
    .catch(error => {
      if(error instanceof ValidationError) {
        return res.status(400).json({ message: error.message, data: error});
      }
      if(error instanceof UniqueConstraintError) {
        return res.status(400).json({ message: error.message, data: error})
      }
      const message = 'L\'expérience n\'a pas pu être modifiée. Réessayez dans quelques instants.'
      res.status(500).json({message, data: error})
    })
  })
}