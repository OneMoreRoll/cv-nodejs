const { Experience } = require('../../db/sequelize');
const { Op } = require('sequelize');
const auth = require('../../auth/auth');

module.exports = (app) => {
  app.get('/api/experiences', auth, (req, res) => {
    if(req.query.job) {
      const job = req.query.job;
      const limit = parseInt(req.query.limit) || 20;

      if(job.length < 2) {
        const message = `Le terme de recherche doit contenir au moins 2 caractères.`
        return res.status(400).json( { message })
      }

      return Experience.findAndCountAll({ 
        where: { 
          job: {
            [Op.like]: `%${job}%`
          } 
        },
        order: [
          ['year']
        ],
        limit: limit
      })
      .then(({ count, rows }) => {
        const message = `Il y a ${count} expériences qui correspondent au terme de recherche ${job}.`;
        res.json({ message, data: rows})
      })
    } else {
    Experience.findAll()
      .then(experiences => {
        const message = 'La liste des expériences a bien été récupérée.';
        res.json({ message, data: experiences });
      })
      .catch(error => {
        const message = 'La liste des expériences n\'a pas pu être récupérée. Réessayez dans quelques instants.';
        res.status(500).json({ message, data: error });
      })
    }
  })
}