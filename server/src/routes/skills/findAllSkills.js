const { Skill } = require('../../db/sequelize');
const { Op } = require('sequelize');
const auth = require('../../auth/auth');
  
module.exports = (app) => {
  app.get('/api/skills', auth, (req, res) => {
    if(req.query.subject) {
      const subject = req.query.subject;
      const limit = parseInt(req.query.limit) || 20;

      if(subject.length < 2) {
        const message = `Le terme de recherche doit contenir au moins 2 caractères.`
        return res.status(400).json( { message })
      }

      return Skill.findAndCountAll({ 
        where: { 
          subject: {
            [Op.like]: `%${subject}%`
          } 
        },
        order: [
          ['mastery', 'DESC']
        ],
        limit: limit
      })
      .then(({ count, rows }) => {
        const message = `Il y a ${count} compétences qui correspondent au terme de recherche ${subject}.`;
        res.json({ message, data: rows})
      })
    } else {
    Skill.findAll()
      .then(skills => {
        const message = 'La liste des compétences a bien été récupérée.';
        res.json({ message, data: skills });
      })
      .catch(error => {
        const message = 'La liste des compétences n\'a pas pu être récupérée. Réessayez dans quelques instants.';
        res.status(500).json({ message, data: error });
      })
    }
  })
}