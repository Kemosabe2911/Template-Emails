const express= require('express');
const ejs= require('ejs');
const bodyparser= require('body-parser');
const nodemailer= require('nodemailer');
let userEmail='itsmestevin29@gmail.com';
let userPassword= 'stevin@2911';

//Init Express
const app= express();

//EJS
app.set('view engine','ejs');

// Body-parser middleware 
app.use(bodyparser.urlencoded({extended:false})) 
app.use(bodyparser.json()) 

const PORT= process.env.PORT || 5000;

app.get('/',(req,res) =>{
    res.render('index');
});


app.post('/send',(req,res) =>{
    //console.log(req.body);
    const output= `
    <h2> Email Content</h2>
    <ul>
        <li>Email: ${req.body.email}</li>
        <li>Phno: ${req.body.phno}</li>
    </ul>
    <p>
        ${req.body.message}
    </p>
    `;

            // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.googlemail.com',
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
            user: 'itsmestevin29@gmail.com', // generated ethereal user
            pass: 'stevin@2911', // generated ethereal password
            },
            tls:{
                rejectUnauthorized: false
            }
        });

        // send mail with defined transport object
        let info = transporter.sendMail({
            from: '"Template Email" <itsmestevin29@gmail.com>', // sender address
            to: `${req.body.email}`, // list of receivers
            subject: "Test Email", // Subject line
            text: "Hello world?", // plain text body
            html: output, // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

        //main().catch(console.error);

        res.render("index", {
            msg: "Email Sent Succefull"
        })

});

app.listen(PORT, () =>{
    console.log(`Server Running on port ${PORT}`);
});

