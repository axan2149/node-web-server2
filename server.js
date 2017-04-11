/**
 * Created by mrozycki on 4/10/2017.
 */

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine','hbs');



app.use( (req, res, next) => {
    "use strict";
    var now = new Date().toString();
    var log = `${now} ${req.method} ${req.url}`
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err){
            console.log('Unable to append to server.log');
        }
    });
    next();
});

// app.use( (req, res, next) => {
//     "use strict";
//     res.render('maintenance');
// });

app.use(express.static(__dirname + '/public' ));

hbs.registerHelper('getCurrentYear', () =>{
    "use strict";
    return new Date().getFullYear();
});

app.get('/', (req, res) =>{
    "use strict";
   // res.send('<h1>hello Express!</h1>');
    res.render('home',{
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my Home Page',
    });
});


app.get('/about', (req, res) =>{
    "use strict";
   res.render('about',{
       pageTitle: 'About Page',
   });
});

app.get('/bad', (req, res) => {
    "use strict";
   res.send({
       errorMessage: 'Error Handling Response',
    });
});

app.listen(3000, () => {
    "use strict";
    console.log('Server is up on port 3000');
});