const menuRoute = require('./menuRoute');
const siteRoute = require('./siteRoute');
const employeeRoute = require('./employeeRoute');
function route(app)
{
    app.use('/employee', employeeRoute);
    app.use('/menu', menuRoute);
    app.use('/', siteRoute);
}

module.exports = route;