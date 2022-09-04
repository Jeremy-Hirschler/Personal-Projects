const DayController = require('../controllers/day.controller');

module.exports = (app) => {
    app.get('/api/days', DayController.findAll);
    app.post('/api/days', DayController.createDay);
    app.get('/api/days/:id', DayController.findDay);
    app.put('/api/days/update/:id', DayController.updateDay);
    app.delete('/api/days/:id', DayController.deleteDay);
}