var express = require('express');
var app = express();


require('./config/middleware.js')(app, express);

var PORT = process.env.PORT || 8080;

app.listen(PORT, function(){
  console.log('Listening on port:', PORT);
});

module.exports = app;


// es6: 
// import express from 'express';

// const app = express();
// const PORT = process.env.PORT || 8080;


// app.listen(PORT, () => {
//   console.log('Listening on port:', PORT);
// });

// export default app;
