// dependencies 
const bodyParser = require('body-parser');
const express = require("express");
const cors = require('cors');
require('dotenv/config');
// end dependencies 

// references 
const routes = require('./routes');
// end references 

// global variables
const app = express();
// end global variables 

// call functions 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use(routes);
// end call functions

// server configuration
app.listen(process.env.PORT || 3333 ,()=>{
    console.log('running on port : '+ process.env.PORT || 3333)
})
// end server configuration