const { Formation } = require('../../db/sequelize');
const { Op } = require('sequelize');
const auth = require('../../auth/auth');

module.exports = (app) => {
  app.get('/api/formations', auth, (req, res) => {
    if(req.query.name) {
      const name = req.query.name;
      const limit = parseInt(req.query.limit) || 20;

      if(name.length < 2) {
        const message = `Le terme de recherche doit contenir au moins 2 caractères.`
        return res.status(400).json( { message })
      }

      return Formation.findAndCountAll({ 
        where: { 
          name: {
            [Op.like]: `%${name}%`
          } 
        },
        order: [
          ['lastyear']
        ],
        limit: limit
      })
      .then(({ count, rows }) => {
        const message = `Il y a ${count} formations qui correspondent au terme de recherche ${name}.`;
        res.json({ message, data: rows})
      })
    } else {
    Formation.findAll()
      .then(formations => {
        const message = 'La liste des formations a bien été récupérée.';
        res.json({ message, data: formations });
      })
      .catch(error => {
        const message = 'La liste des formations n\'a pas pu être récupérée. Réessayez dans quelques instants.';
        res.status(500).json({ message, data: error });
      })
    }
  })
}