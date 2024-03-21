const express = require('express');
const app = express();
const port = 4090;
const morgan = require('morgan');
const path  = require('path');
const {engine} = require('express-handlebars');
const route = require('./routes');
require('./config/db');


app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('combined'));
app.use('/css', express.static('./node_modules/bootstrap/dist/css'));
app.use('/js', express.static('./node_modules/bootstrap/dist/js'));
app.use('/jquery', express.static('./node_modules/jquery/dist'));
app.use('/bootstrap-select', express.static('./node_modules/bootstrap-select/dist'));
app.use('/popper.js', express.static('./node_modules/popper.js/dist/umd'));
app.use('/chart.js',   express.static('./node_modules/chart.js/dist/chart.js'))
app.engine('hbs', engine({
    extname:'.hbs'
}));

app.set('view engine', 'hbs');
app.set('views',path.join(__dirname, "resources/views"));

route(app);

app.listen(port, ()=> console.log(`server is running on port:${port}`));