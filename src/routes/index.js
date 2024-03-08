const menuRoute = require('./menuRoute');
const siteRoute = require('./siteRoute');
function route(app)
{
    app.use('/menu', menuRoute);
    app.use('/', siteRoute);
}

module.exports = route;