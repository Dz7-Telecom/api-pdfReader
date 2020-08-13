const express = require('express');
const routes = express.Router();

const pdfReaderController = require('./Controllers/pdfReaderController');


routes.get('/',(req,res)=> {
    res.send('server ON ✅️')
});

routes.get('/reader',pdfReaderController.index);


module.exports=routes;