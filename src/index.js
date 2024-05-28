const express = require('express');
const app = express();
const http = require('http');
const port = 4049;
const morgan = require('morgan');
const path  = require('path');
const {engine} = require('express-handlebars');
const route = require('./routes');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { Server } = require('socket.io');
const server  = http.createServer(app);
const {insertBooking} = require('./app/models/api');
require('./config/db');

dotenv.config({ path: './src/.env' });
app.use(cookieParser());
app.use(cors({
    origin:['http://localhost:3001', 'http://localhost:4001'], 
    credentials:true
}));
const io = new Server(server, {
    cors:{
        origin:['http://localhost:3001', 'http://localhost:4001'], 
        methods:["GET", 'POST']
    }
});
io.on('connection',  (socket)=>{
    socket.on('notification', async (data)=>{
        const newBooking = {...data, booking_status: 0};
        socket.broadcast.emit('notification', data);
    })
   
    socket.on('disconnect', ()=>{
        console.log('Client disconnected');
    })
})
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
    extname:'.hbs', 
    helpers: {
        formatMoney:(money)=> new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(money), 
        growthSpeed:(totalYesterday, totalToday)=> {
            console.log(typeof totalYesterday)
            console.log((((totalToday - totalYesterday)/totalYesterday) *100))
            if(totalYesterday == 0)
                return 100;
            else 
                return (((totalToday - totalYesterday)/totalYesterday) *100).toFixed(1)
        }, 
        isHasRevenue: (numOfOrderCompleted) => numOfOrderCompleted > 0 ? true : false, 
        isHasClient: (totalClientToday)=>totalClientToday > 0 ? true : false, 
        isHasData: (data)=>data.length > 0 ? true : false, 
        convertJsonString: (array)=>
        {
            return array.map((data)=>{
                const ingredientConvert = JSON.parse(data.ingredient);
                return {...data, ingredient:ingredientConvert};
            })
        }, 
        imgRepresent:(imgArr)=>imgArr[0], 
        imgQuantity:(imgArr)=> imgArr.length, 
        pageQuantityRendering:(pageQuantity)=>{
            var pageArr = [];
            for(var i=1; i<=pageQuantity; i++)
            {
                pageArr.push(i);
            }
            console.log(pageArr);
            return pageArr;
        }, 
        isMultiplePage: (pageQuantity)=>pageQuantity >1  ? true : false, 
        isRoomTableActive:(status) => status == 0 ? false :true, 
        jsonFormatter:(obj)=>JSON.stringify(obj),
        genderConvert:(gender)=>gender === 0 ? 'Nữ' : 'Nam'
    }
}));

app.set('view engine', 'hbs');
app.set('views',path.join(__dirname, "resources/views"));

route(app);
server.listen(port, ()=> console.log(`server is running on port:${port}`));