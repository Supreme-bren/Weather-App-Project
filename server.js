const express = require('express');
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.static('./public'))
app.use('/api', require('./route.js'))

app.use(cors);

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`)
})
