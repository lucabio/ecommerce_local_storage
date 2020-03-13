//const http = require('http');
const express = require('express');

const path = require('path');

const bodyParser = require('body-parser');

const errorsController = require('./controllers/errors');

const app = express();

// app.engine('hbs', expressHbs(
//     {
//         layoutsDir : 'views/layouts/',
//         defaultLayout : 'main',
//         extname: 'hbs'
//     }
// ));
app.set('view engine','ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');

const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: true}));

//registering public directory
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminRoutes);
app.use(shopRoutes);
//any other route NOT mapped will land here...
app.use(errorsController.pageNotFound);

app.listen(8080); // this does createServer and server.listen both