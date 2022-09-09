const UserController = require('../controllers/user.controller');

module.exports = (app) => {
    app.post('/api/register', UserController.registerUser);
    app.post('/api/login', UserController.login);
    app.get('/api/getUser', UserController.getUser);
    app.get('/api/logout', UserController.logout);
}