const { User } = require('../../db/sequelize');
const auth = require('../../auth/auth');
  
module.exports = (app) => {
  app.get('/api/users', auth, (req, res) => {
    User.findAll()
      .then(users => {
        const message = 'La liste des utilisateurs a bien été récupérée.';
        res.json({ message, data: users })
      })
      .catch(error => {
        const message = 'La liste des utilisateurs n\'a pas pu être récupérée. Réessayez dans quelques instants.';
        res.status(500).json({ message, data: error });
      })
  })
}