const DayController = require('../controllers/day.controller');
const jwtAuthenticate = require('../jwtAuthenticate');

module.exports = (app) => {
    app.get('/api/days', DayController.findAll);
    app.post('/api/days', jwtAuthenticate.authenticate, DayController.createDay);
    app.get('/api/days/:id', DayController.findDay);
    app.put('/api/days/update/:id', DayController.updateDay);
    app.delete('/api/days/:id', DayController.deleteDay);
}