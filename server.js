const express= require('express');
const ejs= require('ejs');
const bodyparser= require('body-parser');
const nodemailer= require('nodemailer');

//Init Express
const app= express();

//EJS
app.set('view engine','ejs');

const PORT= process.env.PORT || 5000;

app.get('/',(req,res) =>{
    res.send('Hello');
});

app.listen(PORT, () =>{
    console.log(`Server Running on port ${PORT}`);
});

