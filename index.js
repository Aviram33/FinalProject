require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const port = process.env.PORT || 3000;

//creating server
let server = express();
server.use(express.json({ limit: '100mb'}));
server.use(cors());
//creating routes
//1.users

server.use('/api/users', require('./routes/users.route'));
/*
server.use('/api/upload', require('./routes/upload.route'));
//2.reports
server.use('/api/reports', require('./routes/reports.route'));
//3.info
server.use('/api/info', require('./routes/info.route'));
*/
//turn server
server.listen(port, () => {
  console.log(`http://localhost:${port}`)
})


