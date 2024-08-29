const express = require('express');
const app = express();
const db = require('./db.js');
const passport = require('./auth.js');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.PORT || 3002;


// Middleware Function 
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
    next();
};
app.use(logRequest);


app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local',{session:false});

app.get('/',function (req,res){
    res.send('welcome to our hotel')
})

// Import routes file
const personRoutes = require('./routes/personRoutes');
const menuItemsRoutes = require('./routes/menuItemsRoutes.js');


// Use routes
app.use('/person',personRoutes);
app.use('/menu',menuItemsRoutes);

app.listen(3000,()=>{
        console.log('server is running on port 3000');}
);